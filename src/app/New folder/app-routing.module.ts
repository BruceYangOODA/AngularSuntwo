import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { TestComponent } from './components/test/test.component';
import { AccountComponent } from './components/account/account.component';
import { OrderCanActiveGuardService } from './shared/order-can-active-guard.service';


const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"product", component:ProductComponent},
  {path:"order", component:OrderComponent,
    canActivate:[OrderCanActiveGuardService]},
  {path:"cart", component:CartComponent},
  {path:"account", component:AccountComponent},
  {path:"admin",component:AdminComponent},
  {path:"test", component:TestComponent},  
  {path:"**",redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
