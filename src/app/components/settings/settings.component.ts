import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SettingsServerResponse } from 'src/app/interfaces/settings-server-response.interface';
import { Alarm } from 'src/app/interfaces/settings-interfaces/alarm.interface';
import { UserSettings } from 'src/app/interfaces/settings-interfaces/user-settings.interface';

import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ServerResponse } from '../../interfaces/server-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

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
              private errorMessageService: ErrorMessageService) { }

  //TODO maybe store settings so dont need to get them each time
  //getSettings.
  //then()
  //function getSettings()
  //if(settings) Promise.resolve(settings)
  //else this.http.getUserSettings()

  //TODO test/use this
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
          (res: SettingsServerResponse) => {
            console.log(res)
            if(res.data) {
              this.settings = res.data;
              resolve(this.settings);
            } else {
              reject(res.message);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    }
  }

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
          .subscribe((res: ServerResponse) => {
            console.log(res.message);
            console.log("Succesfully updated settings. TODO inform user (rewrite message service).");
            //update this.settings
            this.settings = newSettings;
          },
          (err: HttpErrorResponse) => {
            //catch failure to update settings on back-end
            console.error(err);
            console.log("Failed to update settings.");
            //safe access chain to find error message to show
            this.errorMessageService.setMessage("Failed to update email address.\n" + (
              (err && err.error && err.error.message) ? err.error.message : (
                err.message ? err.message :  err.error
              )
            ));
          });
        } else {
          console.log("Dialog closed with no changes to save.");
        }
      }); //don't catch errors that occur when closing dialog 
    }).catch((err) => {
      //catch failure to get settings
      console.error(err);
      //safe access chain to find error message to show
      this.errorMessageService.setMessage("Failed to get user settings from back-end.\n" + (
        (err && err.error && err.error.message) ? err.error.message : (
          err.message ? err.message :  err.error
        )
      ));
    });
  }

  /**
   * Initialise and manage alarms dialog
   */
  public openAlarmsDialog() {
    //send all alarms to dialog
    //store settings in variable for later use in afterClosed()
    //TODO get alarms = getAlarms() with error handling
    let alarms = [
      {
        name: "Alarm 1",
        condtion: "hello",
        isSubscribedTo: false
      },
      {
        name: "Alarm 2",
        condtion: "goodbye",
        isSubscribedTo: true
      }
    ]

    //create form controls based on alarms received
    let alarmsForms: FormArray;
    for(let alarm of alarms) {
      let alarmsForm: FormGroup;
      for(let prop in alarm) {
        alarmsForm.addControl(prop, new FormControl(alarm[prop]));
      }
      alarmsForms.push(alarmsForm);
    }
    // alarmsForm = this.fb.group({
    //     description: [description, []],
    // });

    //the second argument is a MatDialogConfig object with properties such as autoFocus, disableClose and data
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: "Alarms",
        type: "alarms",
        form: alarmsForms 
      }
    });

    dialogRef.afterClosed().subscribe((alarms: Alarm[]) => {
      if(alarms) {
        //TODO append alarms to settings
        console.log("TODO");
        // this.http.updateUserPrefs(prefs);
      }
    });
  }

  /**
   * Initialise and manage reports dialog
   */
  public openReportDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: "Report Generation",
        type: "report",
        form: null 
      }
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
  }
}
