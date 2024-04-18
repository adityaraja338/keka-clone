import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "http://localhost/api/crud/"

  constructor(
    private http:HttpClient
  ) { }

  // Admin APIs
  postAdminLogin(data:any){
    return this.http.post(`${this.url}admin_login.php`, JSON.stringify(data));
  }

  createProduct(data:any){
    return this.http.post(`${this.url}create_product.php`, JSON.stringify(data));
  }

  getBestSellingProduct(data?:any){
    return this.http.get(`${this.url}get_bestselling_product.php`, {params:data});
  }

  getMostActiveUser(data?:any){
    return this.http.get(`${this.url}get_most_active_user.php`, {params:data});
  }

  getTotalUsers(data?:any){
    return this.http.get(`${this.url}get_no_of_users.php`, {params:data});
  }

  getTotalProducts(data?:any){
    return this.http.get(`${this.url}get_no_of_products.php`, {params:data});
  }

  getTotalOrders(data?:any){
    return this.http.get(`${this.url}get_no_of_orders.php.`, {params:data});
  }


  // Login
  postUserLogin(data:any){
    return this.http.post(`${this.url}user_login.php`, JSON.stringify(data));
  }

  // Sign Up
  postCreateUser(data:any){
    return this.http.post(`${this.url}create_user.php`, JSON.stringify(data));
  }

  getProductDetails(data:any){
    return this.http.get(`${this.url}get_product_info.php`, {params:data});
  }

  getAllProducts(data?:any){
    return this.http.get(`${this.url}get_all_products.php`, {params:data});
  }

  getAllOrders(data?:any){
    return this.http.get(`${this.url}get_all_orders.php`, {params:data});
  }

  postPlaceOrder(data:any){
    return this.http.post(`${this.url}create_order.php`, JSON.stringify(data));
  }


}
