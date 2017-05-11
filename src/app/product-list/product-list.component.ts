import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FeatureFilter } from './filter.interface';
import { StoreService } from '../providers/store.service';
import { CartService } from '../providers/cart.service';
import { ComparisonService } from '../providers/comparison.service';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import {Ng2PaginationModule} from 'ng2-pagination';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['../bootstrap.css','./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  totalProducts:Product[];
  productsInCart: Product[]=[];
  featureFilter:FeatureFilter;
  filterMode:string;
  filterTooNarrow:boolean;
  categories: any[];
  perPage:number = 6;
  lowHigh:boolean;
  priceSortVar:string;
  productsDisplayed: string;
  sizeDisplayed: number;
  activateToolTip:boolean;

  constructor(private _router:Router,private _storeService:StoreService, private _comparison: ComparisonService, private _cartService: CartService) {}
  //init
  ngOnInit() {
    this._storeService.getProducts()
    .subscribe(products =>{
      this.products = products;
      this.totalProducts = this.products;
      this.getProductsInCart(this.products);
    });
    this.priceSortVar ='Low to High';
    this._storeService.getCategories()
    .subscribe(categories =>{
      let len = categories.length, arr = [];
      for(let i = 0; i< len; i++){
        arr.push(categories[i].$value);
      }
      this.categories = arr;
    });
    this.lowHigh = true;
    this.productsDisplayed ="ALL PRODUCTS";
    this.sizeDisplayed = null;
    this.featureFilter = {
      'eco-friendly':false,
      'multi-device':false,
      'weather-resistant':false,
      protection:false
    }
    this.activateToolTip = false;
    this.filterMode ='AND';
    this.filterTooNarrow = false;
  }
  //end ngOnInit
  getProductsInCart(products){
    for(let i = 0, len = products.length; i <len; i++){
      let p = products[i];
      if( !this._cartService.checkProduct(p) ){
        this.productsInCart.push(p);
      }
    }
  }
  isProductInCart(product){
    return this.productsInCart.indexOf(product) >-1? true:false;
  }
  selectProd(product){
    this._router.navigate(['product/',product.id]);
  }
  filterByCat(cat){
    this.sizeDisplayed = null;
    this._storeService.getProducts()
    .subscribe( (products) => {
      this.products = products.filter((p)=>{
        return p.category === cat
      });
    });
    this.headerChange(cat);
    this.featureFilter['eco-friendly'] === false;
    this.featureFilter['multi-device'] === false;
    this.featureFilter['weather-resistant'] === false;
    this.featureFilter.protection === false;
    this.resetFeatureFilters();
  }
  headerChange(cat){
    this.productsDisplayed = cat.toUpperCase();
  }
  resetFeatureFilters(){
    let features = document.getElementsByClassName('feature-filters');
    for(let i = 0, len = features.length; i<len;i++){
      (<HTMLInputElement>features[i]).checked = false;
    }
  }
  sortPrice(){
      this.products = this.products.sort((pA,pB) =>{
        let priceA = pA.price, priceB = pB.price;
        if(priceA < priceB){return this.lowHigh?-1:1}
        if(priceB < priceA){return this.lowHigh? 1:-1}
        return 0;
      });
      if(this.priceSortVar === 'Low to High'){
        this.priceSortVar = 'High to Low';
      }else{
        this.priceSortVar ='Low to High';
      }
      this.lowHigh = !this.lowHigh;
  }
  setFilterMode($event){
    this.filterMode = $event.target.value;
  }
  updateFeatureFilter($event){
    if(this.filterMode === 'OR'){
      this.unionFilter();
    }
    if(this.filterMode === 'AND'){
      this.intersectionFilter($event);
    }
  }
  featuresAllFalse(){
    if(this.featureFilter['eco-friendly'] === false &&
    this.featureFilter['multi-device'] === false &&
    this.featureFilter['weather-resistant'] === false &&
    this.featureFilter.protection === false){return true}else{return false}
  }
  unionFilter(){
    console.log('union');
    }
  //intersection
  intersectionFilter(e){
      let selectedProp = e.target.value,
      selectedCategory = this.productsDisplayed.toLowerCase(),
      totalProducts = this.totalProducts,
      arrF = [];
      if (e.target.checked){
        this.products = this.products.filter( (product) => {
          return product.comparison[selectedProp] === 'best'
        })
      }
      if(!e.target.checked){
        //add p back to products that satisfy other checked AND category if category is selected
        for(let x = 0, l = totalProducts.length; x<l;x++){
          let prod = totalProducts[x];
          for(let property in this.featureFilter){
            if(this.featureFilter[property] === true &&
              prod.comparison[property] ==='best' &&
               prod.comparison[selectedProp] !== 'best'){
                  arrF.push(totalProducts[x]);
                }
            }
          }
          if(selectedCategory !== 'all products'){ //is product category selected?
            arrF = arrF.filter( (p) => { return p.category === selectedCategory })
          }
          if(selectedCategory !== 'all products' && this.featuresAllFalse()){
            arrF = [];
            this.filterByCat(selectedCategory);
          }
          if(selectedCategory ==='all products' && this.featuresAllFalse()){
            arrF = [];
            this.ngOnInit();
          }
          this.products = this.products.concat(arrF);
        }
          this.narrowAlert();
      }
      //end intersection
      narrowAlert(){
        if(!this.products.length){
          this.filterTooNarrow = true;
        } else {
          this.filterTooNarrow = false;
        }
      }
      laptopSizeFilter(value){
        if (this.productsDisplayed ==='ALL PRODUCTS'){
          this._storeService.getProducts()
          .subscribe( (products) => {
          this.products = products.filter( (p) =>{
            return p.comparison['fits'] ==='up to '+value+' inch laptops';
          });
        });
      } else{
        let selectedCat = this.productsDisplayed,
        prods = this.products;
        this.filterByCat(selectedCat.toLowerCase());
        this.products = this.products.filter((p) =>{
          return p.comparison['fits'] ==='up to '+value+' inch laptops';
        });
      }
        this.sizeDisplayed = value;
        this.narrowAlert();
      }
      clearFilters(){
        this.ngOnInit();
      }
      compare(product){
        this._comparison.addProduct(product);
      }
  }
