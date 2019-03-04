import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDialogModule],
})
export class MaterialModule { }