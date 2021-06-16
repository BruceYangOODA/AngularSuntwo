import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  manageForm: FormGroup;

  formErrors = {
    "account": "",
    "password": "",
    "confirmPassword": "",
    "newPassword": ""
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
    },
    "newPassword": {
      "required": "請輸入密碼",
      "minlength": "最少4個字",
      "maxlength": "最多10個字"
    }
  }

  constructor(private _dataService: DataServiceService, private _router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    let userID = localStorage.getItem("userID") || "";
    if (userID == "") { this._router.navigate["/home"]; }
    this.manageForm = this.fb.group({
      account: [{ value: userID, disabled: true }],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ["", confirmCheck],
      newPassword: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    });
    this.manageForm.valueChanges.subscribe((data) => {
      this.logValidationErrors();
    });
  }
  editPassword(){
    let userID = this.manageForm.get("account").value;
    let password = this.manageForm.get("password").value;
    let newPassword = this.manageForm.get("newPassword").value;
    let params = new HttpParams().set("userID",userID).set("password",password);
    this._dataService.getUserValidation(params).subscribe(response => {
      let reply = JSON.parse(JSON.stringify(response));  
      if (reply.account){        
        let updateData = { 
          queryParams: { userID:userID}, 
          updateParams:{ password:newPassword}};
          this._dataService.putUserPassword(updateData).subscribe(response => { 
            if (response=="200") { alert("密碼已更新"); }
            else { alert("密碼更新失敗"); }
           });
      }
      else { alert(reply.reply); } 
    });
  }

  logValidationErrors(group: FormGroup = this.manageForm) {
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
}


function confirmCheck(control: AbstractControl): { [key: string]: any } | null {
  const theForm = control.parent;
  if (theForm) {
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

