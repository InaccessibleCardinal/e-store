import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { StoreService } from '../providers/store.service';
import { CartService } from '../providers/cart.service';
import { ComparisonService } from '../providers/comparison.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['../bootstrap.css','./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:Product;
  checkProductVal:Boolean;
  constructor(private _activeRoute: ActivatedRoute,
    private _storeService: StoreService,
    private _cartService: CartService, private _comparison: ComparisonService) { }

  ngOnInit() {
      const ID = this._activeRoute.snapshot.params['id'];
      this._storeService.getProducts()
      .subscribe( (products) => {
        this.product = products[ID];
      });
      this.checkProductVal = this._cartService.checkProduct(this.product);
  }
  add(product){
    this.checkProductVal =!this.checkProductVal;
    this._cartService.addLine(product);
  }
  compare(product){
    this._comparison.addProduct(product);
  }

}
