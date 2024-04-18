import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../services/global.service";
import {CartService} from "../services/cart.service";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartProductIds:any[]=[
    // 1
  ];
  cartItems:any[]=[
    // {
    //   product: {
    //     product_id: 1, product_name: 'Fridge', product_price: '5555', product_image: 'assets/images/formal-shoes.jpg'
    //   },
    //   quantity: 5
    // }
  ];

  checkouting=false;
  totalAmount=0;

  receiverName = '';
  receiverAddress = '';

  constructor(
    protected globalService:GlobalService,
    private cart:CartService,
    private http:HttpService,
    private router:Router
  ) {
    this.globalService.currentActiveNav = 'cart';
  }

  ngOnInit() {
    this.cartItems = this.cart.getCartProducts()[0];
    this.cartProductIds = this.cart.getCartProducts()[1];
    this.onChangeCart();
  }

  onDecrement(product:any){
    const productIndex = this.cartProductIds.indexOf(product?.product_id);
    if(this.cartItems[productIndex].quantity == 1){
      if(this.cartItems.length > 1){
        this.cartItems = this.cartItems.splice(productIndex-1, 1);
        this.cartProductIds = this.cartProductIds.splice(productIndex-1, 1);
      } else {
        this.cartItems = [];
        this.cartProductIds = [];
      }
      this.cart.cartProductIds = this.cartProductIds;
      this.cart.cartItems = this.cartItems;
      this.onChangeCart();
      return;
    }
    this.cartItems[productIndex].quantity = this.cartItems[productIndex].quantity-1;
    this.onChangeCart();
    // this.cartProductIds[productIndex].quantity = this.cartItems[productIndex].quantity-1;
  }

  onIncrement(product:any){
    const productIndex = this.cartProductIds.indexOf(product?.product_id);
    if(this.cartItems[productIndex].quantity >= 10){
      window.alert("Maximum limit is 10 for each item!");
      this.onChangeCart();
      return;
    }
    this.cartItems[productIndex].quantity = this.cartItems[productIndex].quantity+1;
    this.cart.cartProductIds = this.cartProductIds;
    this.cart.cartItems = this.cartItems;
    this.onChangeCart();
  }

  onChangeCart(){
    let sum = 0;
    this.totalAmount = 0;
    this.cartItems.forEach(item => {
      sum = +item.product.product_price * +item.quantity;
      this.totalAmount +=sum;
    });
  }

  onPlaceOrder(){
    this.cartItems.forEach(item => {
      // console.log(item);
      const data: any = {};
      data['product_id']=item.product.product_id;
      data['product_name']=item.product.product_name;
      data['product_image']=item.product.product_image;
      data['user_id']=this.globalService.userInfo.user_id;
      data['order_amount']=+item.product.product_price * +item.quantity;
      data['order_quantity']=item.quantity;
      data['receiver_name']=this.receiverName;
      data['order_address']=this.receiverAddress;
      this.http.postPlaceOrder(data).subscribe((res:any) => {
        // this.cartItems.splice()
      },(error)=>{
        console.log(error);
        return;
      });
    });
    this.cart.cartItems = [];
    this.cart.cartProductIds = [];
    window.alert("Order Placed Successfully! Thanks for Shopping!");
    this.router.navigate(['/home']);
  }

  removeItem(index:number){
    this.cartItems.splice(index,1);
    this.cartProductIds.splice(index,1);
    this.cart.cartItems = this.cartItems;
    this.cart.cartProductIds = this.cartProductIds;
  }

  protected readonly window = window;
}
