import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
     MatToolbarModule, 
     MatDialogModule, 
     MatDividerModule, 
     MatFormFieldModule,
     MatCardModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatToolbarModule, 
    MatDialogModule, 
    MatDividerModule, 
    MatFormFieldModule,
    MatCardModule
  ]
})
export class MaterialModule { }