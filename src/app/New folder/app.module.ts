import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { DataServiceService } from './shared/data-service.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { TestComponent } from './components/test/test.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { AccountComponent } from './components/account/account.component';
import { ConfirmEqualValidatorDirective } from './shared/input-validator.directive';
import { OrderCanActiveGuardService } from './shared/order-can-active-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupModule } from "ng2-opd-popup";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductDetailComponent,
    OrderComponent,
    OrderDetailComponent,
    CartComponent,
    ProductComponent,
    TestComponent,
    CartDetailComponent,
    AccountComponent,
    ConfirmEqualValidatorDirective,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,    
    FormsModule,        
    ReactiveFormsModule,

 
    
    //,HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers:[ OrderCanActiveGuardService ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
