import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `<div class="container">
    <h2>Thank you for your order!</h2>
    <a routerLink="/dashboard">Manage Info / Orders</a>
  </div>`,
  styleUrls: ['../bootstrap.css','./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
