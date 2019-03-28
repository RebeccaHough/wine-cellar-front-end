import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private msg:Subject<Message> = new Subject<Message>();

  constructor() { }

  /**
   * Create Observable that components (ErrorMessageComponent) may subscribe to to be notified of errorsof error
   */
  public getMessage(): Observable<Message> {
    //return Subject
    return this.msg.asObservable(); 
  }

  /**
   * Clear message
   */
  clearMessage() {
    this.msg.next();
  }

  /**
   * Publish message
   * @param {Message} msg 
   */
  public setMessage(msg: Message) {
    //publish this value to all the subscribers that have already subscribed to this message
    this.msg.next(msg);
  }
}
