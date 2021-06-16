import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import * as data from '../assets/menu.json';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {  



  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  txtData:string;
  tempObj:any;
  constructor(private http:HttpClient) {  }

  

 
 
  getProductList():Observable<ProductDetail[]>{          
    let _url  = "assets/menu.json";
    return this.http.get<ProductDetail[]>(_url);
  }
  getUserValidation(params:HttpParams){
    let dataUrl = "/data/user";
    return this.http.get<OrderDetail[]>(dataUrl,{params});   
  }
  getUserOrderList(params:HttpParams):Observable<OrderDetail[]>{    
    let dataUrl = "/data/user/order";
    return this.http.get<OrderDetail[]>(dataUrl,{params});   
  }
  getUserOrder(params:HttpParams): Observable<OrderDetail>{
    //let params = new HttpParams().set('userID',userID);  
    let dataUrl = "/data/user/order";
    return this.http.get<any>(dataUrl,{params});
  }  
  getAdminOrderList():Observable<OrderDetail[]>{    
    let dataUrl = "/data/admin/order";
    return this.http.get<OrderDetail[]>(dataUrl);    
  }    
  postUserAccount(account:any) :Observable<string>{
    let dataUrl = "/data/user"; 
    return this.http.post<string>(dataUrl,account,this.httpOptions).pipe();
  }
  postUserOrder(userOrder:any):Observable<string>{
    let dataUrl = "/data/user/order"; 
    return this.http.post<string>(dataUrl,userOrder,this.httpOptions).pipe();
  }
  putUserPassword(updateData:any):Observable<string>{
    var dataUrl = "/data/user";
    return this.http.put<string>(dataUrl,updateData,this.httpOptions).pipe();
  }
  putUserData(updateData:any):Observable<string>{
    var dataUrl = "/data/admin/user";
    return this.http.put<string>(dataUrl,updateData,this.httpOptions).pipe();
  }
  putUserOrder(updateData:any):Observable<string> {
    let dataUrl = "/data/user/order"; 
    return this.http.put<string>(dataUrl,updateData,this.httpOptions).pipe();
  } 
  deleteUserOrder(params:HttpParams):Observable<any>{
    let dataUrl = "/data/user/order?"+ params; 
    return this.http.delete<any>(dataUrl,this.httpOptions).pipe();
  } 
  getTest():Observable<any>{
    return this.http.get<any>("/data");
  }
  postTest(userOrder:any):Observable<any>{
    return this.http.post<any>("/data/add",userOrder,this.httpOptions).pipe();
  }

}



export class CartDetail{
  constructor(
    public id:number,
    public user:string,
    public date:Date,
    public cart:ProductDetail[],
    public status:string
  ) {}
}
export interface OrderDetail {
  _id : string,
  userID : string,
  orderID : string,  
  shop : string,
  status : string,  
  order : ProductDetail[],
  reciveTime? : string,
  produceTime? : string,
  payupTime? : string,
}
export interface ProductDetail {
    id:string,
    category:string,
    name:string,
    price:number,
    status:string,
    amount:number,
    spicy:string,
    desc:string  
}

@Injectable({providedIn: 'root'})
export class Memory {
  sent : string = "送單";
  received : string = "收單";
  payup : string = "結帳";
  noAccount : string="無此帳號";
}