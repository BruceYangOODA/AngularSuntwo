import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService, Memory } from 'src/app/shared/data-service.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userID = "Guest";
  isAdmin = false;
  account: string = "";
  password: string = "";
  @ViewChild("login") cbxLogin: any;
  @ViewChild("regist") cbxRegist: any;
  @ViewChild("account") txtAccount: any;
  @ViewChild("password") txtPassword: any;
  @ViewChild("confirmPassword") txtConfirmPassword: any;
  loginForm: FormGroup;  
  loginTag: string = "login";
  closeResult = '';
  navTag:string;

  formErrors = {
    "account": "",
    "password": "",
    "confirmPassword": "",
    "logTag": ""
  }
  validationMessages = {
    "account": {
      "required": "請輸入手機門號",
      "partten": "不是手機號碼"

    },
    "password": {
      "required": "請輸入密碼",
      "minlength": "最少4個字",
      "maxlength": "最多10個字"
    },
    "confirmPassword": {
      "match": "跟密碼不符"
    }
  }

  constructor(private dataService: DataServiceService,
    private router: Router,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private memory: Memory) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      account: ["", [Validators.required, accountCheck]],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ["", confirmCheck],
      logTag : ["login",[]]
    });
    this.loginForm.valueChanges.subscribe((data) => {
      this.logValidationErrors();
    });
    var userID = localStorage.getItem("userID") || "";
    var isAdmin = localStorage.getItem("isAdmin") || "";
    if (userID != "") {
      this.userID = userID;
      this.isAdmin = (isAdmin==="true")? true:false;
      this.loginForm.get("account").setValue(this.userID);
      this.loginForm.get("logTag").disable();      
    }
    let s = window.location.href.lastIndexOf('/')+1;
    let e = window.location.href.length;
    this.navTag = window.location.href.substr(s,e);
  }
  loginClick() {
    var userID = this.loginForm.get("account").value;
    var password = this.loginForm.get("password").value;
    if (this.loginTag=="login") {  
      //var queryString = "userID=" + userID + "&" + "password=" + password;
      let params = new HttpParams().set("userID",userID).set("password",password);
      this.dataService.getUserValidation(params).subscribe(response => {
        var reply = JSON.parse(JSON.stringify(response));        
        if (reply.account){
          this.userID = reply.account.userID;
          this.isAdmin = reply.account.isAdmin;
          localStorage.setItem("userID", this.userID); 
          localStorage.setItem("isAdmin", this.isAdmin?"true":"false"); 
          this.loginForm.get("logTag").disable();
        }
        else { alert(reply.reply); }      
      });
    }
    else if (this.loginTag=="regist") {
      //var queryString = "userID=" + userID + "&" + "password=" + password;   
      let params = new HttpParams().set("userID",userID).set("password",password);   
      this.dataService.getUserValidation(params).subscribe(response => {
        let reply = JSON.parse(JSON.stringify(response));
        if (reply.reply==this.memory.noAccount) {
          let account = {userID:userID,password:password}
          this.dataService.postUserAccount(account).subscribe(re=>{
            if (re=="200"){ alert("帳號創建成功,請重新登入");}});
        }
        else { alert(reply.reply); }
      });
    }
    else { console.log("NAVBAR 登入錯誤");}
  }
  logoutClick() {
    this.userID = "Guest";
    this.isAdmin = false;
    localStorage.setItem("userID", "");
    localStorage.setItem("isAdmin", "false");
    this.loginForm.get("logTag").enable();
  }
  logValidationErrors(group: FormGroup = this.loginForm) {
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
  test() {
    // var tt = localStorage.getItem("userID") || "";
    // console.log("帳號");
    // console.log(tt);
    //this.testTag = !this.testTag;
    //var tt = this.loginForm.get("account")
    
    console.log(this.formErrors);
    console.log(this.loginForm.valid);

  }


}

function confirmCheck(control: AbstractControl) : { [key: string]: any } | null {          
      const theForm = control.parent;   
      if(theForm) {   
      var tag = theForm.get("logTag");   
      if (tag.value == "login") { return null; }
      var PW = theForm.get("password");
      var confirmPW = theForm.get("confirmPassword");      
      if (PW.value && confirmPW.value && PW.value == confirmPW.value) { return null }
      }
      return { "match": true };    
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

