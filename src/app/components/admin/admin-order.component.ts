import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataServiceService, ProductDetail, OrderDetail } from 'src/app/shared/data-service.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  addTag = 0;
  isShowAdd = false;
  isShowDelete = false;
  userID:string;
  orderID:string;
  constructor(private _router: Router,
            private _route: ActivatedRoute,
            private _dataService: DataServiceService) { }
  productList:ProductDetail[];
  userOrder: OrderDetail;
  ngOnInit(): void {
      this.userID = this._route.snapshot.queryParamMap.get("userID");
      this.orderID = this._route.snapshot.queryParamMap.get("orderID");
      var httpParams = new HttpParams().set("userID",this.userID).set("orderID",this.orderID);      
      this._dataService.getUserOrder(httpParams).subscribe(data =>{
        this.userOrder = data;
        this.productList = this.userOrder.order;       
      });
  }
  backClick() {
    this._router.navigate(["admin"],{queryParams:{"userID":this.userID,"orderID":this.orderID}});
  }
  tagClick(tag: number){
    if(this.addTag === tag) { return; }
    this.addTag = tag;
  }
  deleteClick(){
    //let queryParams = { userID:this.userID, orderID:this.orderID};
    let httpParams = new HttpParams().set("userID",this.userID).set("orderID",this.orderID);      
    this._dataService.deleteUserOrder(httpParams).subscribe();
  }
  addCheck(check: boolean){
    this.isShowAdd = check;
  }
  deleteCheck(check:boolean){
    this.isShowDelete = check;
  }
  produceClick(){
    let updateData = { 
      queryParams: { userID:this.userID, orderID:this.orderID}, 
      updateParams:{ status:"收單",order:this.productList}}
    this._dataService.putUserOrder(updateData).subscribe();    
    this._router.navigate(["admin"],{queryParams:{"userID":this.userID,"orderID":this.orderID}});
  }
  

}
