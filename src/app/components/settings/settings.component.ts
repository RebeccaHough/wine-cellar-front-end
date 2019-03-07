import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private http: HttpService) { }

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
}
