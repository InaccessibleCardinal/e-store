import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
declare var Velocity:any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['../bootstrap.css','../product-detail/product-detail.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() product:Product;
  selectedImage:string;
  constructor() { }

  ngOnInit() {
    this.selectedImage = this.product.images[0];
  }
  selectImage(im){
    let image = document.getElementById('main');
    Velocity(image,{'opacity':0},250);
    setTimeout(()=>{this.selectedImage = im},250);
    Velocity(image,{'opacity':1},250);
  }
}
