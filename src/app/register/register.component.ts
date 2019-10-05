import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { HttpService } from '../http.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  constructor(private _router: Router, private _loginService: HttpService) {
    }

  ngOnInit() {
  }
  
  passpattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){5,12}$";
  new_userid:string='';
  new_password1:string='';
  new_password2:string='';
  Error:string='';
  loginUser:User;

  keyup(any) {
    this.Error=" ";
    const regex = new RegExp('(\\w{1,6})\\1');
    if (regex.test(this.new_password1)) {
       this.Error=" Password cannot have any sequence of characters immediately followed by the same sequence";
       return;
    }
   }
  
  OnSubmit() {
    this.Error="";
       
    const regex = new RegExp('(\\w{1,6})\\1');
    if (regex.test(this.new_password1)) {
      this.Error=" Password cannot have any sequence of characters immediately followed by the same sequence";
      return;
    }
    
    if (this.new_password1 != this.new_password2) {
      this.Error=" Reentered Password should match the initial one";
      return;
    }

    this.loginUser = new User();
    this.loginUser.Name=this.new_userid,
    this.loginUser.password=this.new_password1;
 
    this._loginService.CreateLogins(this.loginUser).subscribe(res => {
          console.log('Login created!');
          //return user  to login page
         this._router.navigate(['/']);
     },
     err => {
               console.error('oops, an error!', err);
               this.Error="Error while registering account";
               return;
            }
     );
  }

 

}
