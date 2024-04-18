import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {GlobalService} from "../services/global.service";

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit{

  constructor(
      private http:HttpService,
      protected globalService:GlobalService,
  ) {
    this.globalService.currentActiveNav = 'performance';
  }

  bestSellingProduct:any;
  mostActiveUser:any;
  totalUsers:any;
  totalProducts:any;
  totalOrders:any;

  ngOnInit() {
    this.getBestSellingProduct();
    this.getMostActiveUser();
    this.getTotalUsers();
    this.getTotalProducts();
    this.getTotalOrders();
  }

  getBestSellingProduct(){
    this.http.getBestSellingProduct().subscribe((res:any) => {
      this.bestSellingProduct = res;
      console.log(this.bestSellingProduct);
    })
  }

  getMostActiveUser(){
    this.http.getMostActiveUser().subscribe((res:any) => {
      this.mostActiveUser = res;
      console.log(this.mostActiveUser);
    })
  }

  getTotalUsers(){
    this.http.getTotalUsers().subscribe((res:any) => {
      this.totalUsers = res;
      console.log(this.totalUsers);
    })
  }

  getTotalProducts(){
    this.http.getTotalProducts().subscribe((res:any) => {
      this.totalProducts = res;
      console.log(this.totalProducts);
    })
  }

  getTotalOrders(){
    this.http.getTotalOrders().subscribe((res:any) => {
      this.totalOrders = res;
      console.log(this.totalOrders);
    })
  }

}
