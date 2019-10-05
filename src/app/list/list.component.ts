import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  mySubscription: any;
  constructor(private _httpService: HttpService, private _router: Router) { 
    //technique to refresh component while staying on same navigation
    //dont forget to unsubscribe on destroy
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Let the Router know that the last link wasn't previously loaded
        this._router.navigated = false;
      }
    });
  }
    
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  activeLogins = new Array<User>();
  Error:string='';

  ngOnInit() {
    this.Error='';
    this._httpService.getActiveLogins().subscribe(response =>
      {
        //the reponse is a json string. we need to convert it to an array.
        //cast response to <any>
        this.activeLogins = <any>response;
      });
  }

  OnDelete(userid:string){
    this._httpService.DeleteLogin(userid).subscribe(data=>
                                                    {
                                                      this._router.navigate(['list']);
                                                    }
                                                   ),
                                                   err =>
                                                   {
                                                      console.error('oops, an error!', err);
                                                      this.Error="Invalid userid/password";
                                                      return;
                                                   };
                                          
  }

}
