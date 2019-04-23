import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Message } from 'src/app/interfaces/message.interface';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent {

  constructor(private http: HttpService, private messageService: MessageService) { }

  /**
   * Force back-end to generate a report and send it to the email address saved
   */
  public sendReport() {
    this.http.sendReport().subscribe((res: Message) => {
      res.message = 'Successfuly generated report.\n' + res.message;
      this.messageService.setMessage(res);
    },
    (err: Message) => {
      err.message = 'Failed to generate report.\n' + err.message;
      this.messageService.setMessage(err);
    });;
  }

  /**
   * Send a test email to the email address saved
   */
  public sendTestEmail() {
    this.http.sendTestEmail().subscribe((res: Message) => {
      res.message = 'Successfuly sent email.\n' + res.message;
      this.messageService.setMessage(res);
    },
    (err: Message) => {
      err.message = 'Failed to send email.\n' + err.message;
      this.messageService.setMessage(err);
    });;
  }
}
