import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class StoreService {
  private productDb: FirebaseListObservable<any[]>;
  private categoryDb: FirebaseListObservable<any[]>;
  private pdt;
  constructor(private af: AngularFire){
      this.productDb = af.database.list('/products');
      this.categoryDb = af.database.list('/categories');
    }
  getProducts(){
    return this.productDb;
  }
  getCategories(){
    return this.categoryDb;
  }
}
