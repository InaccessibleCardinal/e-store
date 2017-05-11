import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ComparisonService } from '../providers/comparison.service';

@Component({
  templateUrl: './comparison.component.html',
  styleUrls: ['../bootstrap.css','./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  products: Product[] =[];
  constructor(private _comparison: ComparisonService) { }

  ngOnInit() {
    this.products = this._comparison.getProducts();
  }
  remove(p){
    this._comparison.removeProduct(p);
  }
}
