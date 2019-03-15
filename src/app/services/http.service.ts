import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url:string = "localhost:1337"; //Express server's IP
  private jsonHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //#region Endpoint-specific methods

  /**
   * Send GET to 'database' endpoint to request a entire database from back-end
   */
  public getDatabase() {
    return this.get('database');
  }

  /**
   * Send GET to user-settings endpoint
   */
  public getUserSettings() {
    return this.get('user-settings');
  }

  /**
   * POST body to 'user' endpoint to update user preferences
   * @param body 
   */
  public updateUserSettings(body: any) {
    body = JSON.stringify(body);
    return this.put(body, 'user-settings');
  }

  /**
   * Send GET to 'email-me' endpoint to request a test email from back-end 
   */
  public sendTestEmail() {
    return this.get('email-me');
  }

  /**
   * Send GET to 'send-report' endpoint to force the back-end to generate a report now and send it to 
   * the email address saved in settings
   */
  public sendReport() {
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

    return this.http.get(`${this.url}/${endpoint}`, httpOptions).subscribe(
      (response: any) => {
        console.log("Got: ", response);
        return; //TODO
      },
      (err: HttpErrorResponse) => {
        this.handle(err);
      }
    )
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

    return this.http.put(`${this.url}/${endpoint}`, body, httpOptions).subscribe(
      (response: any) => {
        console.log("Got: ", response);
        return; //TODO
      },
      (err: HttpErrorResponse) => {
        this.handle(err);
      }
    )
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

    return this.http.post(`${this.url}/${endpoint}`, body, httpOptions).subscribe(
      (response: any) => {
        console.log("Got: ", response);
        return; //TODO
      },
      (err: HttpErrorResponse) => {
        this.handle(err);
      }
    )
  }

  /**
   * Handle HTTP errors
   * @param err 
   */
  private handle(err: HttpErrorResponse) {
    console.error(err);
    //TODO return error to caller
  }

  //#endregion
}
