import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent {

  constructor(private http: HttpService) { }

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
