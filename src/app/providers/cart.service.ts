import { Injectable } from '@angular/core';
import { Product } from '../product';
//import { CartLine } from '../cartline';

@Injectable()
export class CartService {
  public lines: CartLine[] = [];
  public itemCount = 0;
  public total = 0;
  constructor() { }
  checkProduct(product){
    let ids = this.lines.map( l => {return l.product.id});
    return ids.indexOf(product.id) < 0? true: false;
  }
  addLine(product){
    if(this.checkProduct(product)){
      //only pushing new products.
      //update quantity happens in cart component
      this.lines.push(new CartLine(product,1));
      this.recalculate();
    }
    //console.log(this.lines);
  }
  updateQuantity(item, quantity:number){
    let lines = this.lines,
    len = lines.length,
    id = item.product.id;
    for(let i = 0; i < len; i++){
      let line = lines[i];
      if(line.product.id == id){
        line.quantity = quantity;
      }
    }
    //console.log('lines: '+JSON.stringify(this.lines));
    this.recalculate();
  }
  recalculate(){
    this.itemCount = 0;
    this.total = 0;
    let len = this.lines.length;
    for(let i=0; i<len; i++){
      let line = this.lines[i];
      this.itemCount += line.quantity;
      this.total += (line.quantity*line.product.price);
    }
    //console.log(this.total);
  }
  empty(){
    //this.lines = [];
    this.lines.length = 0;
    this.itemCount = 0;
    this.total = 0;
  }
  removeLine(item){
    console.log(item);
    let lines = this.lines,
    index = null,
    len = lines.length,
    id = item.product.id;
    for(let i = 0; i < len; i++){
      if(lines[i].product.id === id){
        index = i;
      }
    }
    lines.splice(index,1);
    this.recalculate();
  }
  getLines(){
    return this.lines;
  }
  getTotal(){
    return this.total;
  }
}
export class CartLine{
  constructor(public product, public quantity){}
}
