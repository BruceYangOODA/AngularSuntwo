import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService,ProductDetail } from 'src/app/shared/data-service.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
//import * as fs from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList:ProductDetail[];
  categorys:string="1";
  id:string='1';
  src:string;
  constructor(private dataService:DataServiceService,
      private http:HttpClient,
      private route:ActivatedRoute) {

    
   }
  ngOnInit(): void {    
    }  

    etcClick(){
      this.categorys="3";
    }
    meatClick(){
      this.categorys="1";
    }
    vgeClick(){
      this.categorys="2";
    }
    windowidth(){
      alert(window.innerWidth)
    }


}
