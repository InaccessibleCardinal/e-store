import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {Ng2PaginationModule} from 'ng2-pagination';
import { AngularFireModule } from 'angularfire2';
import { StoreService } from './providers/store.service';
import { CartService } from './providers/cart.service';
import { ComparisonService } from './providers/comparison.service';
import { AuthService } from './providers/auth.service';
import { OrdersService } from './providers/orders.service';
import { UserService } from './providers/users.service';

//component modules
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CartComponent } from './cart/cart.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './dialog/dialog.component';

const firebaseConfig = {
  apiKey: "AIzaSyA1V4vsqhT_QmrSREDFs1-YfIceYdxqLt0",
    authDomain: "e-store-e3191.firebaseapp.com",
    databaseURL: "https://e-store-e3191.firebaseio.com",
    projectId: "e-store-e3191",
    storageBucket: "e-store-e3191.appspot.com",
    messagingSenderId: "414593902288"
};
const appRoutes:Routes =[
  {path:'', component:ProductListComponent},
  {path:'product-list', component: ProductListComponent},
  {path:'product/:id', component: ProductDetailComponent},
  {path:'cart', component: CartComponent},
  {path:'compare', component: ComparisonComponent},
  {path:'login', component: LoginComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'success', component: SuccessComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'**', redirectTo:''}
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    NavComponent,
    SearchComponent,
    ProductFilterComponent,
    GalleryComponent,
    CartComponent,
    ComparisonComponent,
    LoginComponent,
    CheckoutComponent,
    SuccessComponent,
    DashboardComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [StoreService, CartService, ComparisonService, AuthService, OrdersService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
