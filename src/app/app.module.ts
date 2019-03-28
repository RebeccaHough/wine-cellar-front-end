import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MaterialModule } from './material.module';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TestsComponent } from './components/tests/tests.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';

import { HttpService } from './services/http.service';
import { MessageService } from './services/message.service';

const routes: Routes = [
  { path: 'view-data', component: ViewDataComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'tests', component: TestsComponent },
  { path: '', redirectTo: 'view-data', pathMatch: 'full' },
  { path: '**', redirectTo: 'view-data', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogComponent,
    ViewDataComponent,
    SettingsComponent,
    TestsComponent,
    FooterComponent,
    MessageComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [
    HttpService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
