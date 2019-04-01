import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import  {MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
     MatToolbarModule, 
     MatDialogModule, 
     MatDividerModule, 
     MatFormFieldModule,
     MatCardModule,
     MatInputModule,
     MatRadioModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatToolbarModule, 
    MatDialogModule, 
    MatDividerModule, 
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class MaterialModule { }