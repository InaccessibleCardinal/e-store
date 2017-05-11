import { Component, OnInit } from '@angular/core';
import { CartService, CartLine } from '../providers/cart.service';
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/users.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../bootstrap.css','./login.component.css']
})
export class LoginComponent implements OnInit {
    state: string = '';
    toggleForm:boolean = true;
    user;
    loggedIn:boolean;
    cartExists:boolean;
    loginError:String;
    signupError:String;
  constructor(private router:Router, private _cartService: CartService, private _authService: AuthService, private _userService: UserService) {

  }
  ngOnInit() {
    this.loggedIn = this._authService.broadcast()[0];
    this._cartService.getLines().length > 0? this.cartExists = true: this.cartExists = false;
      if(this._authService.broadcast()[0] && this.cartExists) {
        this.router.navigate(['checkout']);
      }
    if(this._cartService.getLines().length > 0){
      this.cartExists = true;
    } else {
      this.cartExists = false;
    }
    console.log(this.loggedIn);
  }
  toggleT(){
    this.toggleForm = true;
  }
  toggleF(){
    this.toggleForm = false;
  }
  //login
  login(loginForm){
    this._authService.onSubmitLogin(loginForm)
    .then((success) => {
      this.user = success.auth;
      this.loggedIn = true;
      this.cartExists?this.router.navigate(['checkout']):this.router.navigate(['']);
      this._authService.isLoggedIn(this.user);
    }).catch( (err) => {
      this.loginError = err.message;
      console.log(this.loginError);
    });
  }
  //signup creates user
  signup(signupForm){
    this._authService.onSubmitSignup(signupForm)
    .then( (success) => {
       this.user = success.auth;
       this.loggedIn = true;
       this._userService.addUser(signupForm, this.user);
       this.cartExists?this.router.navigate(['checkout']):this.router.navigate(['']);
       this._authService.isLoggedIn(this.user);
     }).catch( (err) => {
        this.signupError = err.message
        console.log(this.signupError);
     });
  }
  //logout
  logout(){
    this._authService.logout();
    this.loggedIn = false;
    this.router.navigate(['']);
    this._cartService.empty();
  }
}
