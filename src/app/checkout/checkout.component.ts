import { Component, OnInit } from '@angular/core';
import { CartService, CartLine } from '../providers/cart.service';
import { AuthService } from '../providers/auth.service';
import { OrdersService } from '../providers/orders.service';
import { UserService } from '../providers/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['../bootstrap.css','./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  lines:CartLine[]=[];
  total;
  user;
  constructor(private _cartService: CartService, private _router:Router, private _authService: AuthService, private _ordersService: OrdersService, private _userService: UserService) { }

  ngOnInit() {
    this._authService.checkAuth()
    .subscribe( (auth) =>{
      if(auth){
        this.user = auth;
        let userDbKey = this._userService.getUserDbKey(this.user.uid),
        dbUser = this._userService.getUserByKey(userDbKey);
        dbUser.subscribe( (user) =>{
          this.user.firstName = user.firstName || '';
          this.user.lastName = user.lastName || '';
          this.user.address = user.address || {};
        });
      }
    });
    this.lines = this._cartService.getLines();
    this.total = this._cartService.getTotal();

  }
  submitOrder(){
    let date = new Date(),
    uid = this.user.uid,
    total = this.total,
    firstName = this.user.firstName,
    lastName = this.user.lastName,
    address = this.user.address;
    this._ordersService.submitOrder({
      lines:this.lines,
      total:total,
      userId:uid,
      firstName:firstName,
      lastName:lastName,
      address:address,
      date:date,
      status:'submitted'
    });
    this._userService.updateUserData(uid,
      firstName,
      lastName,
      address);
    this._cartService.empty();
    this._router.navigate(['success']);
  }

}
