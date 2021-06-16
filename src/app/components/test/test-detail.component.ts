import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {

  @Input() fromParent:boolean;
  @Output() childNotify : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  childClick() {
    console.log("CHILD CLICK");
    this.childNotify.emit(this.fromParent);    
  }

}
