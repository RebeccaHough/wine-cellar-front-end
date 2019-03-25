import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ErrorMessageService } from '../../services/error-message.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent {

  constructor(private http: HttpService, private errorMessageService: ErrorMessageService) { }
    
  /**
   * Get entire database
   */
  public getDatabase() {
    this.http.getDatabase()
    .subscribe(data => {});
    //TODO .catch(err => {this.errorMessageService.setMessage(err.err.message)});
  }
}
