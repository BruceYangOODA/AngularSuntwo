import { Injectable } from '@angular/core';
import { OrderComponent } from "../components/order/order.component";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable()
export class OrderCanActiveGuardService implements CanActivate {    
    constructor(private _router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        var userID = localStorage.getItem("userID") || "";
        if (userID===""){            
            alert("請先登入帳號");
            this._router.navigate(['home']);
             return false;}
        else {
             return true;}        
        }


}