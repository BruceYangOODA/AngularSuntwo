import { ProductDetail } from 'src/app/shared/data-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() product:ProductDetail;
  @Output() productChange = new EventEmitter();
  @Input() comments:boolean;
  desc:string;  
  constructor() {
   }

  ngOnInit(): void { 

  }
  checkSpicy(spicy:string){    
    if (spicy==this.product.spicy){       
      return true}
    else { return false}
  }

  changeAmount(token:string){    
 
    if (token == '-' && !(this.product.amount ==0)){
      if (this.product.amount==0){
        return;
      }
      this.product.amount -= 1;
      this.productChange.emit(this.product);

    }
    if (token == '+'){
      this.product.amount += 1;
      this.productChange.emit(this.product);

    }
  }

  radioClick(spicy:string){      
      this.product.spicy = spicy;
      this.productChange.emit(this.product);    
  }
  commentsClick(){    
    this.comments = !this.comments;
    if(!this.comments) { this.product.desc="";}
  }
  checkBoxClick(){
    if (this.product.status == '0'){
      this.product.status = '1';      
      this.product.amount = 1;  
      this.productChange.emit(this.product);
    }
    else if (this.product.status == '1'){
      this.product.status = '0';      
      this.product.amount = 0;
      this.product.desc = "";
      this.product.spicy="原味";      
      this.productChange.emit(this.product);
    }
    else{}
    
  }

  changeDesc(desc:string){
    this.product.desc = desc;
    this.productChange.emit(this.product);
  }

}
