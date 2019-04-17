import { Component, Inject } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
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
    //renderRows();
  }

  addAlarm() {}

  deleteAlarm() {}

  //#endregion

}
