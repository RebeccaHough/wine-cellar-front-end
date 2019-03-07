import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url:string = "localhost:1337"; //Express server's IP
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //TODO error handling for bad responses, to say request not received/processed

  //#region Endpoint-specific methods
  //direct request to appropriate endpoint name and handle request type etc., to take load off calling component

  /**
   * Send GET to 'get-db' endpoint to request a entire database from back-end
   */
  public getDb() {
    console.warn('TODO endpoint not extant');
    //this.get('get-db');
    //TODO return db;
  }

  /**
   * POST body to 'time' endpoint to update time intervals
   * @param body 
   */
  public setTimeIntervals(body: any) {
    body = JSON.stringify(body);
    this.put(body, 'time');
  }

  /**
   * POST body to 'user' endpoint to update user preferences
   * @param body 
   */
  public updateUserPrefs(body: any) {
    body = JSON.stringify(body);
    this.put(body, 'user');
  }

  /**
   * Send GET to 'email-me' endpoint to request a test email from back-end 
   */
  public sendTestEmail(){
    this.get('email-me');
  }

  /**
   * Force back-end to generate a report now and send it to the email address saved
   */
  public generateReportNow() {
    console.warn('TODO endpoint not extant');
    //this.get('gen-report-now');
    //TODO return "report sent | report not sent";
  }

  //#endregion

  //#region Generic methods e.g. GET, POST, error handling etc.

  /**
   * Do GET request for this.url/endpoint
   * @param endpoint 
   * @param httpOptions
   */
  private get(endpoint: string, httpOptions?: any) {
    if(!httpOptions) httpOptions = {}

    this.http.get(`${this.url}/${endpoint}`, httpOptions).subscribe(
      (response: any) => {
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
   */
  private put(body: string, endpoint: string, httpOptions?: any) {
    if(!httpOptions) httpOptions = {}
    body = JSON.stringify(body);

    this.http.put(`${this.url}/${endpoint}`, body, httpOptions).subscribe(
      (response: any) => {
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
