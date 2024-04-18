import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../services/global.service";
import {HttpService} from "../services/http.service";
import {CartService} from "../services/cart.service";
import {AuthService} from "../services/auth.service";
import {AdminAuthService} from "../services/admin-auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(
    protected globalService:GlobalService,
    private http:HttpService,
    protected auth:AuthService,
    protected adminAuth:AdminAuthService,
    private cart:CartService
  ) {
    this.globalService.currentActiveNav = 'products';
  }

  productName='';
  productPrice: string | number = 0;
  productDesc='';
  productImage='';

  addingProduct=false;


  products:any[]=[
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'},
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'},
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'},
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'},
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'},
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'},
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'},
    // {product_id:8, product_name:'Broom', product_price:'499', product_desc:'very good', product_img:'assets/images/formal-shoes.jpg'}
  ];

  cartItems:any[]=[];
  cartProductIds:any[]=[];

  ngOnInit() {
    this.getAllProducts();
    this.cartItems = this.cart.getCartProducts()[0];
    this.cartProductIds = this.cart.getCartProducts()[1];
  }

  getAllProducts(){
    this.http.getAllProducts()?.subscribe((res:any)=>{
      this.products = res?.data;
    },(error) => {
      console.log(error);
    })
  }

  onAddToCart(product:any){
    // this.cartItems = this.cart.getCartProducts();
    // this.cartItems.find(prod)
    if(this.auth.isUserLoggedIn()){
      this.cartItems.push({product:product, quantity:1});
      this.cartProductIds.push(product.product_id);
      this.cart.cartItems = this.cartItems;
      this.cart.cartProductIds = this.cartProductIds;
    }else{
      window.alert('Please Login!');
    }
    // console.log(this.cartItems)
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
      return;
    }
    this.cartItems[productIndex].quantity = this.cartItems[productIndex].quantity-1;
    // this.cartProductIds[productIndex].quantity = this.cartItems[productIndex].quantity-1;
  }

  onIncrement(product:any){
    const productIndex = this.cartProductIds.indexOf(product?.product_id);
    if(this.cartItems[productIndex].quantity >= 10){
      window.alert("Maximum limit is 10 for each item!")
      return;
    }
    this.cartItems[productIndex].quantity = this.cartItems[productIndex].quantity+1;
    this.cart.cartProductIds = this.cartProductIds;
    this.cart.cartItems = this.cartItems;
  }

  createProduct(){
    const data:any={};
    data['product_name']=this.productName;
    data['product_price']=this.productPrice;
    data['product_desc']=this.productDesc;
    data['product_image']=this.productImage;

    this.http.createProduct(data).subscribe((res:any)=>{
      window.alert("Product Added Successfully!");
      this.addingProduct = false;
      this.productName='';
      this.productPrice=0;
      this.productDesc='';
      this.productImage='';
      this.getAllProducts();
    }, (error) => {
      console.log(error);
    });
  }

}
