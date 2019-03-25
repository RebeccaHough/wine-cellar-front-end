import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SettingsServerResponse } from 'src/app/interfaces/settings-server-response.interface';
import { Alarm } from 'src/app/interfaces/settings-interfaces/alarm.interface';
import { UserSettings } from 'src/app/interfaces/settings-interfaces/user-settings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public settings: UserSettings;

  constructor(private fb: FormBuilder, private http: HttpService, private dialog: MatDialog) { }

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
  public getSettings(): Promise<UserSettings> {
    if(this.settings)
      return Promise.resolve(this.settings);
    else {
      return new Promise(function() {
        this.http.getUserSettings()
        .subscribe(
          (res: SettingsServerResponse) => {
            console.log(res.message)
            if(res.data) {
              this.settings = res.data;
              Promise.resolve(this.settings);
            } else {
              Promise.reject(res.message);
            }
          },
          err => {
            Promise.reject(err);
          }
        );
      });
    }
  }

  /**
   * Initialise and manage email dialog
   */
  public openEmailDialog() {
    //get email address
    this.http.getUserSettings()
    .subscribe(
      (res: SettingsServerResponse) => {
        let email = "Not found";
        if(res && res.data && res.data.userEmailAddress)
          email = res.data.userEmailAddress;

        //build reactive form
        let form = this.fb.group({
          emailDescription: `The email address currently used to send alarms and reports to is shown below.
          To use a different email address, edit the address below and hit 'Save changes'.`,
          email: [email, [
            Validators.required,
            Validators.email
          ]]
        });
    
        let dialogRef = this.dialog.open(DialogComponent, {
          data: { 
            title: "Email address",
            type: "email",
            form: form
          }
        });

        //if email address was changed, update it
        dialogRef.afterClosed().subscribe((form: FormGroup) => {
          console.log(form);
          if(form && form.value && form.value.email) {
            //update email address to settings
            let settings = res.data
            settings.userEmailAddress = form.value.email;

            //send settings to back-end subscribe and inform user if update was succesful
            this.http.updateUserSettings(settings)
            .subscribe(res => {
              console.log("Succesfully updated settings. TODO inform user (rewrite message service).");
            });
            //TODO .catch((err) => {this.errorMessageService.setMessage(err)});
          }
        },
        (err) => {
          console.log("TODO an error occured.", err);
        }
      );
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
