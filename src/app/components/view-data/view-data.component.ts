import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent {

  constructor(private http: HttpService, private messageService: MessageService) { }
    
  /**
   * Get entire database
   */
  public getDatabase() {
    this.http.getDatabase()
    .subscribe(data => {
      //TODO
    },
    (err) => {
      console.log(err);
      this.messageService.setMessage({
        type: "error",
        message: "Failed to get database from back-end.\n" + (
          (err && err.error && err.error.message) ? err.error.message : (err.message ? err.message : err.error)
        )
      });
    });
  }
}
