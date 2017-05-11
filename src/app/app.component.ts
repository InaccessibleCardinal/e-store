import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template:`<app-nav></app-nav>
  <app-search></app-search>
  <router-outlet></router-outlet>`,
  styleUrls: ['./reset.css','./bootstrap.css','./app.component.css']
})
export class AppComponent {

}
