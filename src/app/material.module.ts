import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDialogModule, MatDividerModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDialogModule, MatDividerModule, MatFormFieldModule],
})
export class MaterialModule { }