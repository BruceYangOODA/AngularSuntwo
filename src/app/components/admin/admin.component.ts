
import { DataServiceService, OrderDetail, ProductDetail } from 'src/app/shared/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isShowReceive = false;
  isShowProduce = false;
  isShowUpdate = false;
  orderList: OrderDetail[];
  userID: string="";
  payupOrderData : OrderDetail;
  adminForm: FormGroup;

  formErrors = {
    "userID": "",
    "password": ""
  }
  validationMessages = {
    "userID": {
      "required": "請輸入手機門號",
      "partten": "不是手機號碼"
    },
    "password": {
      "required": "請輸入密碼",
      "minlength": "最少4個字",
      "maxlength": "最多10個字"
    }
  }

  constructor(private _dataService: DataServiceService,
    private _router:Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this._dataService.getAdminOrderList().subscribe((data)=>{
      this.orderList = data;
      console.log(typeof(this.orderList));
      this.orderList.forEach(ele => {
         //console.log(ele);         
         //console.log(typeof(ele));
          //console.log(ele.orderID);
      }); 
    });
    if(this._route.snapshot.queryParamMap.has("userID")) {
      this.userID = this._route.snapshot.queryParamMap.get("userID");
      this.isShowReceive = true;
      this.isShowProduce = false;
      this.isShowUpdate = false;
    }
    this.adminForm = this.fb.group({
      userID: ["",[Validators.required, accountCheck]],
      password: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      admin: [false]      
    });
    this.adminForm.valueChanges.subscribe((data) => {
      this.logValidationErrors();
    });
    
  }
  userOrderClick(order:OrderDetail){    
    this._router.navigate(["admin","order"],{queryParams:{"userID":order.userID,"orderID":order.orderID}}); 
  }
  checkHasOrder() : boolean{
    let result = false;
    this.orderList.forEach(ele =>{
      if(ele.status === "送單") { result = true; }
    });
    return result;
  }
  payupLanch(item:OrderDetail){
    this.payupOrderData = item;    
    }
  payupClick(){
    let updateData = { 
      queryParams: { userID:this.payupOrderData.userID,
         orderID:this.payupOrderData.orderID}, 
      updateParams:{ status:"結帳"}}
    this._dataService.putUserOrder(updateData).subscribe(response=>{
      if (response!="200"){ alert("資料庫連結失效"); }
      else {
        this.orderList.forEach(ele =>{
          if(ele.userID == this.payupOrderData.userID)
          {ele.status="結帳"}
        });    
        this.payupOrderData = null;
      }
    });      
  }
  formatTime(time:string) : string{    
    if (time == undefined){ return "待處理" }
    let result = "" + time;
    let day = result.substr(5,2) + "/" + result.substr(8,2) + " ";
    let hour = result.substr(11,5);     
    return day + hour;
  }
  getTotal() : number{
    let result = 0;
    this.payupOrderData.order.forEach(ele => {
      if(ele.amount) { result += ele.amount*ele.price; } })
    return result;
  }
  editUserData(){
    let userID = this.adminForm.get("userID").value;
    let password = this.adminForm.get("password").value;
    let isAdmin = this.adminForm.get("admin").value;
    let updateData = { 
      queryParams: { userID:userID}, 
      updateParams:{ password:password}};
    if (isAdmin) { updateData.updateParams["isAdmin"]=isAdmin}      
    this._dataService.putUserData(updateData).subscribe(response =>{
      if (response == "200"){ alert("已更新會員資料");}
      else { alert("修改資料失敗"); }
    });
  }
  logValidationErrors(group: FormGroup = this.adminForm) {
    Object.keys(group.controls).forEach((key) => {
      const abControl = group.get(key);
      this.formErrors[key] = "";
      if (abControl && !abControl.valid) {
        const messages = this.validationMessages[key];
        for (const errorKey in abControl.errors) {

          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + " ";
          }
        }
      }
    });
  }
}


function accountCheck(control: AbstractControl): { [key: string]: any } | null {
  const account: string = control.value;
  const numstr = "0123456789";
  var result = false;
  if (account == "") { return null; }
  for (var i = 0; i < account.length; i++) {
    if (numstr.indexOf(account[i]) == -1) {
      result = true;
    }
  }
  const prefix = account.substr(0, 2);
  if (prefix != "09") { result = true; }
  if (account.length != 10) { result = true; }
  if (result) { return { "partten": result }; }
  else { return null; }
}