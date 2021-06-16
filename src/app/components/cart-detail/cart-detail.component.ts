import { ProductDetail } from 'src/app/shared/data-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  @Input() product:ProductDetail;
  @Output() productChange = new EventEmitter();
  sum:string;
  desc:string;  
  constructor() { }

  ngOnInit(): void {
  }
  checkSpicy(spicy:string){
    
    if (spicy==this.product.spicy){       
      return true}
    else { return false}
  }

  changeAmount(token:string){
    if (this.product.status=="0"){
      return;
    }
    if (token == '-' && !(this.product.amount ==0)){
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
    
  }

  changeDesc(desc:string){
    this.product.desc = desc;
    this.productChange.emit(this.product);
  }
  editClick(){}

}
