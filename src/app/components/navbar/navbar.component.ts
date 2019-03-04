import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit() {
  }

  /**
   * Add active class if route matches current route
   * @param {string} route to match to current route
   */
  isActive(route: string) {
    console.log(this.router.url);
    return this.router.url == route ? "active" : "";
  }
}
