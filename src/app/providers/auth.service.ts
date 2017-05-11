import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService  {
  loggedIn:boolean = false;
  user;
  email;
  constructor(public af: AngularFire, private router: Router) { }
  //login
  checkAuth(){
    return this.af.auth;
  }
  getUser(){
    return this.af.auth.getAuth();
  }
  isLoggedIn(obj){
    if(obj){this.loggedIn = true} else {this.loggedIn = false};
    this.user = obj;
    this.email = this.user.email;
    this.broadcast();
  }
  broadcast(){return [this.loggedIn, this.email]}
  onSubmitLogin(loginForm) {
    if(loginForm.valid) {
      // this.loggedIn = true;
      return this.af.auth.login({
        email: loginForm.value.email,
        password: loginForm.value.password },
        {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      });
    }
  }
  //logout
  logout(){
    this.loggedIn = false;
    return this.af.auth.logout();
  }
  //sign up
  onSubmitSignup(signupForm) {
   if(signupForm.valid) {
       this.loggedIn = true;
       return this.af.auth.createUser({
       email: signupForm.value.email,
       password: signupForm.value.password
     });
   }
  }
}
