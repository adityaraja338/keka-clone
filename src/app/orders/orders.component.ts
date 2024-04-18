import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../services/global.service";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders:any =[];

  constructor(
    protected globalService:GlobalService,
    private http:HttpService
  ) {
    this.globalService.currentActiveNav = 'orders';
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders(){
    const data:any={};
    data['user_id'] =this.globalService.userInfo.user_id;
    this.http.getAllOrders(data).subscribe((res:any)=>{
      this.orders = res?.data;
      // console.log(this.orders);
    })
  }

  convertDate(inputDate:any){
    const date = new Date(inputDate);

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    // @ts-ignore
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return(formattedDate);

  }

}
