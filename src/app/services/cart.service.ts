import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:any[] = [];
  cartProductIds:any[] = [];

  constructor() { }

  getCartProducts(){
    return [this.cartItems, this.cartProductIds];
  }
}
