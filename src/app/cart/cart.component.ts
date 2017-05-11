import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { StoreService } from '../providers/store.service';
import { CartService, CartLine } from '../providers/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['../bootstrap.css','./cart.component.css']
})
export class CartComponent implements OnInit {
  lines:CartLine[]=[];
  total;
  cartExists:boolean;
  constructor(private _storeService: StoreService,
    private _cartService: CartService, private _authService: AuthService, private _router:Router) { }

  ngOnInit() {
    this.lines = this._cartService.getLines();
    this.total = this._cartService.getTotal();
    this.cartExists = (this.lines.length? true:false);
  }
  update(item,value){
    let val = Number(value);
    this._cartService.updateQuantity(item, val);
    this.total = this._cartService.getTotal();
  }
  empty(){
    this._cartService.empty();
    this.ngOnInit();
  }
  remove(item){
    this._cartService.removeLine(item);
    this.ngOnInit();
  }
  goToLogin(){
    this._authService.broadcast()[0]?this._router.navigate(['checkout']):this._router.navigate(['login']);
  }
}
