import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from 'TODO';

@Component({
  selector: 'app-userprefsdialog',
  templateUrl: './user-prefs-dialog.component.html',
  styleUrls: ['./user-prefs-dialog.component.sass']
})
export class UserPrefsDialogComponent {
  title = "User Prefs";

  constructor(public dialogRef: MatDialogRef<UserPrefsDialogComponent>) { }

  //TODO https://material.angular.io/components/dialog/overview

  closeDialog() {
    this.dialogRef.close('TODO Optional on close result val');
  }
}
