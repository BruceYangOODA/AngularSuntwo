import { ProductDetail } from 'src/app/shared/data-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product:ProductDetail;
  src:string;
  constructor() { 
    
  }

  ngOnInit(): void {    
    this.src = 'assets/images/thumbs/' +this.product.name + '.jpg';
  }
  ngAfterViewInit(): void {
    
  }

}
