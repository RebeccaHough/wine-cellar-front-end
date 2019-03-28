import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from 'src/app/interfaces/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  public msg: Message;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessage()
    .subscribe((msg: Message) => {
      this.msg = msg;
    });
  }

  close() {
    this.msg = null;
  }
}
