import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // THis service is responsible for checkin the token whether 
  //it is expired or not checks the token and return boolean
  constructor(public jwtHelper: JwtHelperService) { }
  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();

    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    const isExpired = helper.isTokenExpired(token);
    // console.log(isExpired);
    // Returns true true if expired else false if NOT expired
    return isExpired;
  }
}
