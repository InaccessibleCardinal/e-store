import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { FeatureFilter } from './filter.interface';
import { StoreService } from '../providers/store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['../bootstrap.css','../product-list/product-list.component.css','./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input() products;
  @Input() laptopSizeFilter;
  @Input() sizeDisplayed;
  @Input() featureFilter;
  @Input() filterByCat;
  @Input() headerChange;
  @Input() updateFeatureFilter;
  @Input() clearFilters;
  @Input() resetFeatureFilters;
  @Input() sortPrice;
  categories;
  constructor(private _storeService:StoreService) { }

  ngOnInit() {
    this._storeService.getCategories()
    .subscribe(categories =>{
      let len = categories.length, arr = [];
      for(let i = 0; i< len; i++){
        arr.push(categories[i].$value);
      }
      this.categories = arr;
    });
    }
    filter(value){
      this.laptopSizeFilter(value);
    }
  }
