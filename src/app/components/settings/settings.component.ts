import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SettingsServerResponse } from 'src/app/interfaces/settings-server-response.interface';
import { Alarm } from 'src/app/interfaces/settings-interfaces/alarm.interface';
import { UserSettings } from 'src/app/interfaces/settings-interfaces/user-settings.interface';

import { MessageService } from 'src/app/services/message.service';
import { ServerResponse } from '../../interfaces/server-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'src/app/interfaces/message.interface';
import { Report } from 'src/app/interfaces/settings-interfaces/report.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public settings: UserSettings;

  constructor(private fb: FormBuilder, 
              private http: HttpService, 
              private dialog: MatDialog,
              private messageService: MessageService) { }

  /**
   * Helper function to return settings from memory or fetch them from back-end
   */
  private getSettings(): Promise<UserSettings> {
    if(this.settings)
      return Promise.resolve(this.settings);
    else {
      return new Promise((resolve, reject) => {
        this.http.getUserSettings()
        .subscribe(
          res => {
            console.log("Got", res)
            if(res.data) { //type = SettingsServerResponse
              console.log("hi")
              this.settings = res.data;
              resolve(this.settings); //type = UserSettings
            } else { //type = Message
              reject(res);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    }
  }
  
  //TODO lots of repeated code follows, should refactor

  /**
   * Initialise and manage email dialog
   */
  public openEmailDialog() {
    this.getSettings().then((settings: UserSettings) => {
      let email = "";
      //get email address
      if(settings.userEmailAddress)
        email = settings.userEmailAddress;

      //build reactive form
      let form = this.fb.group({
        email: [email, [
          Validators.required,
          Validators.email
        ]]
      });
  
      //open dialog, with type, title, description and form
      let dialogRef = this.dialog.open(DialogComponent, {
        data: { 
          type: "email",
          title: "Email address",
          description: `
            <div> The email address currently used to send alarms and reports to is shown below. </div>
            <p> To use a different email address, edit the address below and hit 'Save changes'. </p>
          `,
          form: form
        }
      });

      //if email address was changed, update it
      dialogRef.afterClosed().subscribe((form: FormGroup) => {
        console.log("Received form", form);
        if(form && form.value && form.value.email) {
          console.log("Dialog closed with changes to save. Attempting save...");
          //store new settings in a variable, in case send fails
          let newSettings = settings;
          newSettings.userEmailAddress = form.value.email;

          //send settings to back-end subscribe and inform user if update was succesful
          this.http.updateUserSettings(settings)
          .subscribe((res: Message) => {
            console.log("Succesfully updated settings.");
            res.message = "Succesfully updated settings.\n" + res.message;
            this.messageService.setMessage(res);
            //update this.settings
            this.settings = newSettings;
          },
          (err: Message) => {
            //catch failure to update settings on back-end
            console.log("Failed to update user settings.");
            //add user-friendly explanation
            err.message = "Failed to update email address.\n" + err.message;
            this.messageService.setMessage(err);
          });
        } else {
          console.log("Dialog closed with no changes to save.");
        }
      }); //don't catch errors that occur when closing dialog 
    }).catch((err: Message) => {
      //catch failure to get settings
      console.log("Failed to get user settings.");
      err.message = "Failed to get user settings from back-end.\n" + err.message;
      this.messageService.setMessage(err);
    });
  }

  /**
   * Initialise and manage alarms dialog
   */
  public openAlarmsDialog() {
    this.getSettings().then((settings: UserSettings) => {
      let alarms: Alarm[];
      //get report params
      if(settings.alarms) //TODO error handling if this fails
        alarms = settings.alarms;
 
      //build reactive form array
      let alarmsForms: FormArray = this.fb.array([]);
      for(let alarm of alarms) {
        let alarmsForm: FormGroup = this.fb.group({});
        for(let prop in alarm) {
          //for every property in every alarm, add to form array
          alarmsForm.addControl(prop, new FormControl(alarm[prop], [Validators.required]));
        }
        alarmsForms.push(alarmsForm);
      }
     
      //wrap form array in form group to avoid rewriting dialog component to accept FormArray | FormGroup
      let form = this.fb.group({
        alarms: alarmsForms
      });
      console.log(form);
  
      //open dialog, with type, title, description and form
      let dialogRef = this.dialog.open(DialogComponent, {
        data: { 
          type: "alarms",
          title: "Alarms",
          description: `<p> The alarms currently used in the system are shown below. </p>`,
          form: form
        }
      });

      //if alarms array was changed, update it
      dialogRef.afterClosed().subscribe((form: FormGroup) => {
        console.log("Received form", form);
        if(form && form.value && form.value.alarms) {
          console.log("Dialog closed with changes to save. Attempting save...");
          //store new settings in a variable, in case send fails
          let newSettings = settings;
          newSettings.alarms = form.value.alarms;

          //send settings to back-end subscribe and inform user if update was succesful
          this.http.updateUserSettings(settings)
          .subscribe((res: Message) => {
            console.log("Succesfully updated alarms.");
            res.message = "Succesfully updated alarms.\n" + res.message;
            this.messageService.setMessage(res);
            //update this.settings
            this.settings = newSettings;
          },
          (err: Message) => {
            //catch failure to update settings on back-end
            console.log("Failed to update alarms.");
            //add user-friendly explanation
            err.message = "Failed to update alarms.\n" + err.message;
            this.messageService.setMessage(err);
          });
        } else {
          console.log("Dialog closed with no changes to save.");
        }
      }); //don't catch errors that occur when closing dialog 
    }).catch((err: Message) => {
      //TODO prevent this from catching errors that occur in then
      console.log(err);
      //catch failure to get settings
      console.log("Failed to get user settings.");
      if(err.message)
        err.message = "Failed to get user settings from back-end.\n" + err.message;
      else
        err.message = "Failed to get user settings from back-end.\n";
      this.messageService.setMessage(err);
    });
  }

  /**
   * Initialise and manage reports dialog
   */
  public openReportDialog() {
    this.getSettings().then((settings: UserSettings) => {
      let reportParams: Report;
      //get report params
      if(settings.reportParams) //TODO error handling if this fails
        reportParams = settings.reportParams;

      //build reactive form
      //TODO should write own validators, for booleans and numbers
      let form = this.fb.group({
        showTemperature: [reportParams.showTemperature, [
          Validators.required
        ]],
        showHumidity: [reportParams.showHumidity, [
          Validators.required
        ]],
        reportGenerationFrequency: [reportParams.reportGenerationFrequency, [
          Validators.required
        ]]
      });
  
      //open dialog, with type, title, description and form
      let dialogRef = this.dialog.open(DialogComponent, {
        data: { 
          type: "report",
          title: "Report Generation",
          description: `<p> Report generation settings are shown below. </p>`,
          form: form
        }
      });

      //if email address was changed, update it
      dialogRef.afterClosed().subscribe((form: FormGroup) => {
        console.log("Received form", form);
        if(form && form.value && form.value.reportParams) {
          console.log("Dialog closed with changes to save. Attempting save...");
          //store new settings in a variable, in case send fails
          let newSettings = settings;
          newSettings.reportParams = form.value.reportParams;

          //send settings to back-end subscribe and inform user if update was succesful
          this.http.updateUserSettings(settings)
          .subscribe((res: Message) => {
            console.log("Succesfully updated report generation settings.");
            res.message = "Succesfully updated report generation settings.\n" + res.message;
            this.messageService.setMessage(res);
            //update this.settings
            this.settings = newSettings;
          },
          (err: Message) => {
            //catch failure to update settings on back-end
            console.log("Failed to update report generation settings.");
            //add user-friendly explanation
            err.message = "Failed to update report generation settings.\n" + err.message;
            this.messageService.setMessage(err);
          });
        } else {
          console.log("Dialog closed with no changes to save.");
        }
      }); //don't catch errors that occur when closing dialog 
    }).catch((err: Message) => {
      //catch failure to get settings
      console.log("Failed to get user settings.");
      err.message = "Failed to get user settings from back-end.\n" + err.message;
      this.messageService.setMessage(err);
    });
  }

  /**
   * Initialise and manage data collection settings dialog
   */
  public openDataCollectionDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: "Data Collection",
        type: "data",
        form: null 
      }
    });
    this.getSettings().then((settings: UserSettings) => {
      let email = "";
      //get email address
      if(settings.userEmailAddress)
        email = settings.userEmailAddress;

      //build reactive form
      let form = this.fb.group({
        email: [email, [
          Validators.required,
          Validators.email
        ]]
      });
  
      //open dialog, with type, title, description and form
      let dialogRef = this.dialog.open(DialogComponent, {
        data: { 
          type: "email",
          title: "Email address",
          description: `
            <div> The email address currently used to send alarms and reports to is shown below. </div>
            <p> To use a different email address, edit the address below and hit 'Save changes'. </p>
          `,
          form: form
        }
      });

      //if email address was changed, update it
      dialogRef.afterClosed().subscribe((form: FormGroup) => {
        console.log("Received form", form);
        if(form && form.value && form.value.email) {
          console.log("Dialog closed with changes to save. Attempting save...");
          //store new settings in a variable, in case send fails
          let newSettings = settings;
          newSettings.userEmailAddress = form.value.email;

          //send settings to back-end subscribe and inform user if update was succesful
          this.http.updateUserSettings(settings)
          .subscribe((res: Message) => {
            console.log("Succesfully updated settings.");
            res.message = "Succesfully updated settings.\n" + res.message;
            this.messageService.setMessage(res);
            //update this.settings
            this.settings = newSettings;
          },
          (err: Message) => {
            //catch failure to update settings on back-end
            console.log("Failed to update user settings.");
            //add user-friendly explanation
            err.message = "Failed to update email address.\n" + err.message;
            this.messageService.setMessage(err);
          });
        } else {
          console.log("Dialog closed with no changes to save.");
        }
      }); //don't catch errors that occur when closing dialog 
    }).catch((err: Message) => {
      //catch failure to get settings
      console.log("Failed to get user settings.");
      err.message = "Failed to get user settings from back-end.\n" + err.message;
      this.messageService.setMessage(err);
    });
  }
}
