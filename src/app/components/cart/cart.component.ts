import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DataServiceService, ProductDetail, OrderDetail, Memory } from 'src/app/shared/data-service.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  navTag: string = "1";
  addTag: number = 0;
  orderList : OrderDetail[];
  orderDetail : OrderDetail;
  checkedOrder : OrderDetail;
  orderID = "";
  //orderDetail: any;
  userID = "";
  shop = "";
  status = "";
  test:any;
  //orderStatus :OrderStatus;
  constructor(private _dataService: DataServiceService,
    private _router: Router,
    private memory:Memory) { /*this.orderStatus=_orderStatus;
    console.log("STATUS"); console.log(this.orderStatus.sending)*/ }  
  ngOnInit(): void {
    let userID = localStorage.getItem("userID") || ""; 
    if (userID != "") {    
      this.userID = userID;
      let params = new HttpParams().set('userID',userID); 
      this._dataService.getUserOrderList(params).subscribe(data => {
        this.orderList = data;        
        this.orderList.forEach(ele => {
          if (ele.status !== "結帳") {            
            this.orderDetail = ele;    
            console.log(this.orderDetail);                    
          }
        });
      });
      
    }
    else { alert("請先登入帳號");  this._router.navigate(["/home"]);}
  }
  navAddClick(tag:number) {
    if(this.addTag == tag){ return;}
    this.addTag = tag;
  }
  navTagClick(value:string) {
    if (this.navTag==value) { return; }
    this.navTag = value;
  }
  editOrder(){
    let updateData = { 
      queryParams: { 
        userID : this.orderDetail.userID,
        orderID : this.orderDetail.orderID}, 
      updateParams:{ 
        order : this.orderDetail.order}
      }
    this._dataService.putUserOrder(updateData).subscribe(response=>{
      if (response!="200") {alert("資料庫連結失效");}
      else { alert("已完成修改訂單");}      
    });
  }
  checkOrderClick(target:OrderDetail) { 
    this.checkedOrder = target;
  }
  backClick(){ this.checkedOrder=null; }
  formatTime(time:string) : string{    
    if (time == undefined){ return "待處理" }
    let result = "" + time;
    let day = result.substr(5,2) + "/" + result.substr(8,2) + " ";
    let hour = result.substr(11,5);     
    return day + hour;
  }
  getTotal(order:ProductDetail[]){
    let result = 0;
    order.forEach(ele =>{ result += ele.amount*ele.price});
    return result;
  }
  recordClick(value: any) {
    this.orderID = value;
    this.getList(2);
  }
  getDetail() {
    return this.orderDetail.order;
  }
  getList(navTag) {
    this.orderList.forEach(element => {
      if (element.orderID == this.orderID) {
        /* var jsonObj = JSON.parse(JSON.stringify(element.order));
         var arr = [];
         for (var i=1;i<jsonObj.length;i++){
           arr.push(jsonObj[i]);
         }
         element.order = arr;*/

        this.orderDetail = element;
        //console.log("TYPE",typeof(this.orderDetail.order));
        //console.log(this.orderDetail.order);
        this.navTag = navTag;
      }
    });
  }

}
