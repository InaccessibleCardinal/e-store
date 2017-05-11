import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../providers/store.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  host:{'(document:click)': 'onClick($event)'},
  templateUrl: './search.component.html',
  styleUrls: ['../reset.css','../bootstrap.css','./search.component.css']
})
export class SearchComponent implements OnInit {
  products;
  searchTerm:string;
  searching:boolean;
  constructor(private _router:Router,private _storeService:StoreService, private _el:ElementRef) { }

  ngOnInit() {
    this._storeService.getProducts()
    .subscribe( (products) =>{ this.products = products });
    this.searching = false;
  }
  searchFn(){
    this.searching = true;
    this._storeService.getProducts()
    .subscribe( (products) =>{
      this.products = products.filter( (product) => {
        let name = product.name.toLowerCase(),
        term = this.searchTerm.toLowerCase();
        return name.indexOf(term) >-1
      })
    })
  }
  onClick(event){
    if(event.target !== document.getElementById('search-field') ||
       event.target !== document.getElementById('search-dropdown')){
         this.endSearch();
    }
  }
  endSearch(){
    setTimeout(()=>{
      this.searchTerm = '';
      this.searching = false;
    }, 500);
  }
  selectProduct(p){
    this._router.navigate(['/product',p.id]);
  }
}
