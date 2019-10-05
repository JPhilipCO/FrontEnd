import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "./../../models/user";
import { HttpService } from '../http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inp_userid:string='';
  inp_password:string='';
  new_userid:string='';
  Error:string='';
  loginUser:User;
  
 
  constructor(private _router: Router, private _loginService: HttpService) { }
  

  ngOnInit() {
    this.Error='';
  }
  
  OnSubmit() {
     this.Error="";
     this.loginUser = new User();
     this.loginUser.Name=this.inp_userid,
     this.loginUser.password=this.inp_password;
     
     
     this._loginService.ValidateLogin(this.loginUser).subscribe(res => {
           console.log('Login validated... '+ res);
           this._router.navigate(['list']);
          },
          err => {
            console.error('oops, an error!', err);
            this.Error="Invalid userid/password";
            return;
          }
      );


     //This code will execute before the Observable is returned by the loginService
     //console.log("End of method");
   }
}
