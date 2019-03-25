import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../services/error-message.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  public errmsg: string;

  constructor(public errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.errorMessageService.getMessage()
    .subscribe((msg: string) => {
      this.errmsg = msg;
    });
  }

  close() {
    this.errmsg = null;
  }
}
