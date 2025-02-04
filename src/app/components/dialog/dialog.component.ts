import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Alarm } from 'src/app/interfaces/settings-interfaces/alarm.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public type: string;
  public title: string;
  public description: string;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { 
    this.type = data.type;
    this.title = data.title;
    this.description = data.description;
    this.form = data.form;
    //disable clicking outside box to close dialog, to prevent save from triggering when the user does this
    //could reenable this if there is a way to ensure that close() is called instead of save() if the dialog is closed in this way
    dialogRef.disableClose = true;
  }

  save() {
    console.log("Saving changes made in dialog.");
    //emit form
    this.dialogRef.close(this.form);
  }

  close() {
    console.log("Closing dialog without saving.");
    this.dialogRef.close();
  }

  //#region Alarms table

  get alarms(): FormArray {
    return this.form.get('alarms') as FormArray;
  }

  updateTable() {
    this.changeDetectorRef.detectChanges();
  }

  addAlarm() {
    let subForm: FormGroup = this.fb.group({
        variable: ["", [Validators.required]],
        condition: ["", [Validators.required]],
        value: ["", [Validators.required]],
    });

    let alarmsForm: FormGroup = this.fb.group({
      name: ["", [Validators.required]],
      condition: subForm,
      isSubscribedTo: ["", [Validators.required]],
      checkFrequency: ["", [Validators.required]]
    });

    (<FormArray> this.form.controls.alarms).push(alarmsForm);
  }

  deleteAlarm(alarm: Alarm, index) {
    console.log(alarm);
    (<FormArray> this.form.controls.alarms).removeAt(index);
    this.updateTable();
  }

  //#endregion

}
