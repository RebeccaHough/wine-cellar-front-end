import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent {

  constructor(private http: HttpService) { }
    
  /**
   * Get entire database
   */
  public getDatabase() {
    this.http.getDatabase();
  }

}
