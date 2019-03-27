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
  public type: string;
  public title: string;
  public description: string;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.type = data.type;
    this.title = data.title;
    this.description = data.description;
    this.form = data.form;
  }

  //TODO don't call save when clicking outside box or disable clicking outside box to close

  save() {
    console.log("Saving changes made in dialog.");
    //emit form
    this.dialogRef.close(this.form);
  }

  close() {
    console.log("Closing dialog without saving.");
    this.dialogRef.close();
  }
}
