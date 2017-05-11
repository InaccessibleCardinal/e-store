import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable()
export class ComparisonService {
  public products: Product[] =[];
  constructor() { }
  addProduct(product){
    if(this.products.indexOf(product) === -1 && this.products.length < 4){
      this.products.push(product);
    }
  }
  removeProduct(product){
    let index = this.products.indexOf(product);
    this.products.splice(index,1);
  }
  empty(){
    this.products.length = 0;
  }
  getProducts(){
    return this.products;
  }

}
