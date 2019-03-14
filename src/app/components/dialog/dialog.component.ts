import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public title: string;
  public type: string;
  public form: any; //TODO FormGroup or FormArray;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.title = data.title;
    this.type = data.type;
    this.form = data.form;
  }

  save() {
    console.log("TODO save changes in dialog.");
    this.dialogRef.close('TODO save changes in dialog.')
    //emit form
    // this.dialogRef.close(this.form.value);
  }

  close() {
    console.log("Closed dialog.");
    this.dialogRef.close('Closed dialog.');
  }
}
