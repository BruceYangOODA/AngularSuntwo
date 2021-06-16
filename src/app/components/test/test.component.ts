import { DataServiceService } from 'src/app/shared/data-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  parent = true;
  temp:any;
  temp2:any;
  constructor(private http: HttpClient,
            private dataService:DataServiceService) { }

  ngOnInit(): void {
      var url = "/opendata/datalist/apiAccess?scope=resourceAquire&rid=0b544701-fb47-4fa9-90f1-15b1987da0f5";
      //this.getData();
      //this.http.get<any>("/data").subscribe((data)=>{
     //   this.temp = data;
     // });
      //return this.http.get<ProductDetail[]>(this._url);      

  }

  getData(){
    this.dataService.getTest().subscribe((res:any)=>{
      this.temp = res;
      console.log("RES",res);
    })
  }
  test(){
    this.dataService.postTest(this.temp).subscribe(data =>this.temp2=data);
    console.log("data",this.temp2);
  }

}



