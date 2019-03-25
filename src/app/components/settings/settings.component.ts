import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ServerResponse } from 'src/app/interfaces/server-response.interface';
import { Alarm } from 'src/app/interfaces/settings-interfaces/alarm.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private fb: FormBuilder, private http: HttpService, private dialog: MatDialog) { }

  //TODO maybe store settings so dont need to get them each time
  //getSettings.
  //then()
  //function getSettings()
  //if(settings) Promise.resolve(settings)
  //else this.http.getUserSettings()

  /**
   * Initialise and manage email dialog
   */
  public setEmail() {
    //get email address
    this.http.getUserSettings().subscribe((settings: ServerResponse) => {
      console.log(settings);
      let email = settings.data.userEmailAddress;

      //TODO use angular forms
  
      let dialogRef = this.dialog.open(DialogComponent, {
        data: { 
          title: "Email address",
          type: "email",
          form: {
            text: "The email address currently used to send alarms and reports to is shown below. To use a different email address, edit the address below and hit 'Save changes'.",
            email: email
          } 
        }
      });

      //if email address was changed, update it
      dialogRef.afterClosed().subscribe((email: string) => {
        if(email) {
          //TODO append alarms to settings
          console.log("TODO");
          // this.http.updateUserPrefs(prefs);
          //subscribe and inform user if update was succesful
        }
      });
    });
  }

  /**
   * Initialise and manage alarms dialog
   */
  public setAlarms() {
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
  public setReportPrefs() {
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
  public setDataCollectionPrefs() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: "Data Collection",
        type: "data",
        form: null 
      }
    });
  }
}
