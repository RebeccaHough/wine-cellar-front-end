import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errmsg:Subject<string> = new Subject<string>();

  constructor() { }

  /**
   * Create Observable that components (ErrorMessageComponent) may subscribe to to be notified of errorsof error
   */
  public getMessage(): Observable<string> {
    //return Subject
    return this.errmsg.asObservable(); 
  }

  /**
   * Clear message
   */
  clearMessage() {
    this.errmsg.next();
  }

  /**
   * Publish message
   * @param errmsg 
   */
  public setMessage(errmsg: string) {
    //publish this value to all the subscribers that have already subscribed to this message
    this.errmsg.next(errmsg);
  }
}
