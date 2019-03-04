import { Component } from '@angular/core';

import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpService) { }

  //TODO error handling for bad responses, to say request not received/processed

  //TODO  https://valor-software.com/ng2-charts/

  /**
   * Get entire database
   */
  public getDb() {
    this.http.getDb();
  }

  /**
   * Set alarms
   * @param time
   */
  public setAlarms(time?: any) {
    if(!time) {
      time = {
        test1: "1",
        test2: "2"
      }
    }
    this.http.setTimeIntervals(time);
  }

  /**
   * Set user preferences
   * @param prefs
   */
  public setPrefs(prefs?: any) {
    if(!prefs) {
      prefs = {
        test3: "3",
        test4: "4"
      }
    }
    this.http.updateUserPrefs(prefs)
  }

  /**
   * Force back-end to generate a report now and send it to the email address saved
   */
  public generateReportNow() {
    this.http.generateReportNow();
  }

  /**
   * Send a test email to the email address saved
   */
  public sendTestEmail() {
    this.http.sendTestEmail();
  }
}
