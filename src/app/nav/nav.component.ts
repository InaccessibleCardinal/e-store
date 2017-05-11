import { Component, OnInit } from '@angular/core';
import { CartService, CartLine } from '../providers/cart.service';
import { ComparisonService } from '../providers/comparison.service';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../reset.css','../bootstrap.css','./nav.component.css']
})
export class NavComponent implements OnInit {
  lines;
  loggedIn:boolean = false;
  email;
  comparisonQueue =[];
  constructor(private _cartService:CartService, private _comparison: ComparisonService, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.lines = this._cartService.getLines();
    this.comparisonQueue = this._comparison.getProducts();
    this.logIn();
    this.getEmail();
    console.log(this.getEmail());
   }
   logIn(){
     return this._authService.broadcast()[0];
   }
   getEmail(){
     return this._authService.broadcast()[1];
   }
   logout(){
     this._authService.logout();
     this._router.navigate(['']);
     this._cartService.empty();
   }
  }
