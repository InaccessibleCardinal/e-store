import { Injectable } from '@angular/core';
import { CartLine } from '../providers/cart.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class OrdersService {
  private orderDb: FirebaseListObservable<any[]>;
  constructor(private af: AngularFire) {
    this.orderDb = af.database.list('/orders');
   }
   submitOrder(order){
     this.orderDb.push(order);
   }
   getOrders(){
     return this.orderDb;
   }
   updateStatus(order){
     let key = order.$key;
     this.orderDb.update(key,{status:'cancelled'});
   }

}
