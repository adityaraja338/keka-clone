import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ProductsComponent} from "./products/products.component";
import {OrdersComponent} from "./orders/orders.component";
import {CartComponent} from "./cart/cart.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminAuthGuard} from "./guards/admin-auth.guard";
import {PerformanceComponent} from "./performance/performance.component";

const routes: Routes = [
  {
    path:'',
    pathMatch:"full",
    redirectTo:'home'
  },
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'orders',
    component:OrdersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[ AuthGuard ]
  },
  {
    path:'performance',
    component:PerformanceComponent,
    canActivate:[ AdminAuthGuard ]
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
