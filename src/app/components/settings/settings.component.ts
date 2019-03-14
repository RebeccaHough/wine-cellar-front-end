import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private fb: FormBuilder, private http: HttpService, private dialog: MatDialog) { }

  public setEmail() {
    //TODO get email
    // email = this.http.getSettings()

    let dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: "Email address",
        type: "email",
        form: {
          text: "The email address currently used to send alarms and reports to is shown below. To use a different email address, edit the address below and hit 'Save changes'.",
          email: "todo@todo.com"
        } 
      }
    });
  }

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
        alarmsForm.addControl(prop, new FormControl(alarm[prop]);
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

    dialogRef.afterClosed().subscribe((alarms: any) => {
      if(alarms) {
        //TODO append alarms to settings
        console.log("TODO");
        // this.http.updateUserPrefs(prefs);
      }
    });
  }

  public setReportPrefs() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: "Report Generation",
        type: "report",
        form: null 
      }
    });
  }

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
