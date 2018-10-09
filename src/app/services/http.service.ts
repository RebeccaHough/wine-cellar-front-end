import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url:string = ""; //Raspberry Pi's IP

  constructor(private http: HttpClient) { }

  get(body:string) {
    this.http.get(this.url).subscribe(
      (response: any) => {
        return;
      },
      (err: HttpErrorResponse) => {
        this.handle(err);
      }
    )
  }

  post(body:string) {
    body = JSON.stringify(body);
    this.http.post(this.url, body, httpOptions).subscribe(
      (response: any) => {
        return;
      },
      (err: HttpErrorResponse) => {
        this.handle(err);
      }
    )
  }

  handle(err: HttpErrorResponse) {

  }
}
