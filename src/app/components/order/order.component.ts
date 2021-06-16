import { DataServiceService,ProductDetail } from 'src/app/shared/data-service.service';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  categorys:string="1";
  productList:ProductDetail[]=[];
  tag_categorys:string[]=["雞肉"];
  tag:string="雞肉";
  shop:string="";
  userID:string="";
  constructor(private _dataService:DataServiceService,
              private _router:Router) { 
    
  }

  ngOnInit(): void {
    this._dataService.getProductList().subscribe(data => this.productList = data); 
    var userID = localStorage.getItem("userID") || "";    
    if (userID != "") {
      this.userID = userID;      
    }    
  }
  etcClick(){
    this.tag_categorys=["串燒"];
    this.tag = "串燒";
  }
  allClick(){
    this.tag_categorys=["豬肉","雞肉","蔬菜","串燒"];
    this.tag = "全部";
  }
  porkClick(){
    this.tag_categorys=["豬肉"];
    this.tag = "豬肉";
  }
  chickenClick(){
    this.tag_categorys=["雞肉"];
    this.tag = "雞肉";
  }
  vegetableClick(){
    this.tag_categorys=["蔬菜"];
    this.tag = "蔬菜";
  }

  inTheTag(tag:string){
    if (this.tag_categorys.includes(tag)){ return true}
    else {return false}
  }
  getTotal(){
    var result=0;
    this.productList.forEach(element => result += element.amount*element.price);
    return result;
  }
  clickShop(shop:string){
    this.shop=shop;
  }
  takeOrder(){    
    if (this.getTotal()==0){
      alert("尚未選購商品");
      return;
    }
    if (this.shop==""){
      alert("請選擇取貨地點");
      return;
    }
    var userOrder = {'userID':this.userID,'shop':this.shop,
        'order':this.productList}; 
    this._dataService.postUserOrder(userOrder).subscribe((response)=>{
      if (response=="200") {
        this._router.navigate(['cart']);        
      }
      else {
        alert("訂單傳送失敗");
      }      
    });          
  }

}
