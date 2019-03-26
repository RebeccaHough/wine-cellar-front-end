import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SettingsServerResponse } from '../interfaces/settings-server-response.interface';


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
  public getDatabase() {
    console.log("Sending GET request to endpoint '/database'.");
    return this.get('database');
  }

  /**
   * Send GET to user-settings endpoint
   */
  public getUserSettings() {
    console.log("Sending GET request to endpoint '/user-settings'.");
    return this.get('user-settings')
      .pipe(
        map((res: SettingsServerResponse) => {return res})
      );
  }

  /**
   * PUT body to 'user' endpoint to update user preferences
   * @param body 
   */
  public updateUserSettings(body: any) {
    body = JSON.stringify(body);
    console.log("Sending PUT request to endpoint '/user-settings'.");
    return this.put(body, 'user-settings');
  }

  /**
   * Send GET to 'email-me' endpoint to request a test email from back-end 
   */
  public sendTestEmail() {
    console.log("Sending GET request to endpoint '/email-me'.");
    return this.get('email-me');
  }

  /**
   * Send GET to 'send-report' endpoint to force the back-end to generate a report now and send it to 
   * the email address saved in settings
   */
  public sendReport() {
    console.log("Sending GET request to endpoint '/send-report'.");
    return this.get('send-report');
  }

  //#endregion

  //#region Generic HTTP methods

  /**
   * Do GET request for this.url/endpoint
   * @param endpoint 
   * @param httpOptions
   * @returns an Observable
   */
  private get(endpoint: string, httpOptions?: any) {
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
  private put(body: string, endpoint: string, httpOptions?: any) {
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
  private post(body: string, endpoint: string, httpOptions?: any) {
    if(!httpOptions) httpOptions = {}
    body = JSON.stringify(body);

    return this.http.post(`${this.url}/${endpoint}`, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   * @param err 
   */
  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }

  //#endregion
}
