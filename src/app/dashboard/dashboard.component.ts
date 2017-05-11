import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { OrdersService } from '../providers/orders.service';
import { UserService } from '../providers/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['../bootstrap.css','./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;
  dbUser;
  orders;
  editMode:Boolean = false;
  prompt:Boolean = false;
  selectedOrder;
  constructor(private _authService:AuthService,
  private _ordersService:OrdersService,
  private _userService:UserService,
  private _router:Router) { }

  ngOnInit() {
    this._authService.checkAuth()
    .subscribe( (auth) =>{
      if(auth){
        this.user = auth;
        let id = this.user.uid;
        //get users orders
        this._ordersService.getOrders()
        .subscribe( (orders) =>{
          this.orders = orders.filter( (o)=>{
              return o.userId === id;
            });
          });
        let key = this._userService.getUserDbKey(this.user.uid);
        this._userService.getUserByKey(key)
        .subscribe( (val) => {
          this.dbUser = val;
          this.dbUser.address = val.address || {};
         });
      }
    });
  }
  cancelOrder(order){
    this.selectedOrder = order;
    this.showPrompt();
  }
  edit(){
    this.editMode = true;
  }
  cancelEdit(){
    this.editMode = false;
  }
  updateUser(personalForm){
    let fn = personalForm.firstName.value,
    ln = personalForm.lastName.value,
    address = {
      street: personalForm.addressStreet.value,
      number: personalForm.addressNumber.value,
      city: personalForm.addressCity.value,
      state: personalForm.addressState.value,
      zip: personalForm.addressZip.value
    },
    uid = this.user.uid;
    this._userService.updateUserData(uid,fn,ln,address);
    this.cancelEdit();
  }
  showPrompt(){
    this.prompt = true;
  }
  getHidePrompt(evt){//gets 'false' from prompt
    this.prompt = evt;
  }

}
