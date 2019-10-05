import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {User} from "./../models/user";

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private httpClient: HttpClient) { }

  // Base url
  baseurl = 'https://localhost:5001';

  
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getActiveLogins() {
    return  this.httpClient.get(this.baseurl + '/api/Logins');
  }

 //POST
  CreateLogins(data): Observable<User> {
    return this.httpClient.post<User>(this.baseurl + '/api/Logins', JSON.stringify(data), this.httpOptions)
   .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}  

//POST
ValidateLogin(data): Observable<User> {
  return this.httpClient.post<User>(this.baseurl + '/api/Logins/validate', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}  

//DELETE
DeleteLogin(data): Observable<User> {
  return this.httpClient.delete<User>(this.baseurl + '/api/Logins/'+data,  this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  )
}  

// Error handling
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       //client-side error
       errorMessage = error.error.message;
     } else {
       //server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}
