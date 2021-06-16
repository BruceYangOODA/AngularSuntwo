import { Component, OnInit } from '@angular/core';
import { DataServiceService, ProductDetail } from 'src/app/shared/data-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  tag_categorys:string[]=["雞肉"];//["牛肉","豬肉","雞肉","蔬菜","其他"];
  tag:string = "雞肉";
  tagID:number=0;
  productList:ProductDetail[];  
  selectedItem:ProductDetail;  

  constructor(private _dataService:DataServiceService) { }

  ngOnInit(): void {
  this._dataService.getProductList().subscribe(data => {
    this.productList = data;  
    //console.log(data);
  });       
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
  isSelectedItem(index){
    if (index==this.tagID){ return true}
    else{ return false}
  }
  inTheTag(tag:string){
    if (this.tag_categorys.includes(tag)){ return true}
    else {return false}
  }
  imgClick(name){
    this.productList.forEach( ele => {
      if (ele.name===name) {
        this.selectedItem = ele;
      }            
    });    
  }
}
