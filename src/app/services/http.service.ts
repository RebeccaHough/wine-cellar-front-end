import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SettingsServerResponse } from '../interfaces/settings-server-response.interface';
import { ServerResponse } from '../interfaces/server-response.interface';
import { Message } from '../interfaces/message.interface';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url:string = "http://localhost:1337"; //Express server's IP
  private jsonHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //#region Endpoint-specific methods

  /**
   * Send GET to 'database' endpoint to request a entire database from back-end
   */
  public getDatabase(): Observable<any> {
    console.log("Sending GET request to endpoint '/database'.");
    return this.get('database')
    // .pipe(
    //   map((res: DatabaseServerResponse) => { return res })
    // );
  }

  /**
   * Send GET to user-settings endpoint
   */
  public getUserSettings(): Observable<any> {
    console.log("Sending GET request to endpoint '/user-settings'.");
    return this.get('user-settings').pipe(
      map((res: SettingsServerResponse) => { return res })
    );
  }

  /**
   * PUT body to 'user' endpoint to update user preferences
   * @param body
   * @returns an Observable that can be subcribed to for a Message about the success/failure of the update
   */
  public updateUserSettings(body: any): Observable<any> {
    body = JSON.stringify(body);
    console.log("Sending PUT request to endpoint '/user-settings'.");
    return this.put(body, 'user-settings').pipe(
      map((res: ServerResponse) => {
        let msg: Message = {
          type: "success",
          message: res.message
        };
        return msg;
      })
    );
  }

  /**
   * Send GET to 'email-me' endpoint to request a test email from back-end 
   * @returns an Observable that can be subcribed to for a Message about the success/failure of the send
   */
  public sendTestEmail(): Observable<any> {
    console.log("Sending GET request to endpoint '/email-me'.");
    return this.get('email-me').pipe(
      map((res: ServerResponse) => {
        let msg: Message = {
          type: "success",
          message: res.message
        };
        return msg;
      })
    );
  }

  /**
   * Send GET to 'send-report' endpoint to force the back-end to generate a report now and send it to 
   * the email address saved in settings
   * @returns an Observable that can be subcribed to for a Message about the success/failure of the send
   */
  public sendReport(): Observable<any> {
    console.log("Sending GET request to endpoint '/send-report'.");
    return this.get('send-report').pipe(
      map((res: ServerResponse) => {
        let msg: Message = {
          type: "success",
          message: res.message
        };
        return msg;
      })
    );
  }

  //#endregion

  //#region Generic HTTP methods

  /**
   * Do GET request for this.url/endpoint
   * @param endpoint 
   * @param httpOptions
   * @returns an Observable
   */
  private get(endpoint: string, httpOptions?: any): Observable<any> {
    if(!httpOptions) httpOptions = {}

    return this.http.get(`${this.url}/${endpoint}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Do PUT request for this.url/endpoint with payload=body
   * @param body 
   * @param endpoint 
   * @param httpOptions 
   * @returns an Observable
   */
  private put(body: string, endpoint: string, httpOptions?: any): Observable<any> {
    if(!httpOptions) httpOptions = {}
    body = JSON.stringify(body);

    return this.http.put(`${this.url}/${endpoint}`, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Do POST request for this.url/endpoint with payload=body
   * @param body 
   * @param endpoint 
   * @param httpOptions 
   * @returns an Observable
   */
  private post(body: string, endpoint: string, httpOptions?: any): Observable<any> {
    if(!httpOptions) httpOptions = {}
    body = JSON.stringify(body);

    return this.http.post(`${this.url}/${endpoint}`, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors, logging and returning an error message
   * @param err 
   */
  private handleError(err: HttpErrorResponse): Observable<any> {
    //log error
    console.error(err);
    //replace errored Observable with Observable containing error message
    let msg: Message = {
      type: "error",
      message: ((err && err.error && err.error.message) ? err.error.message : (err.message ? err.message : err.error))
    };
    return of(msg);
  }

  //#endregion
}
