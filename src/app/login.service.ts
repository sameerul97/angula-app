import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { url } from 'inspector';
import { LoginMessage } from './Interfaces/loginInterface';
// import { UserCredential } from './userCredentialInterface';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private username: string;
  private userPassword: string;
  private isLoggedin: boolean;

  // private url: string = "http://localhost:3000/userLogin";
  constructor(private http_Var: HttpClient, private authService: AuthService) { }

  getUserNameCredential(): string {
    return this.username;
  }
  getUserPasswordCredential(): string {
    return this.userPassword;
  }
  setUserCredential(uName: string, passW: string) {
    this.username = uName;
    this.userPassword = passW;
  }

  // Signing up 
  signUpService(username,email, password): Observable<LoginMessage> {
    const body = new HttpParams()
      .set('name', username)
      .set('email',email)
      .set('password', password);

    //     console.log(this.http_Var.post <UserCredential> ("http://localhost:3000/login",
    //     body.toString(),
    //     {
    //       headers: new HttpHeaders()
    //         .set('Content-Type', 'application/x-www-form-urlencoded')
    //     }
    //   )
    // );
    // Register 
    return this.http_Var.post<LoginMessage>("http://api.sameerul.com:3000/register",
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  getLoginService(): Observable<LoginMessage> {
    // this.data = this.http.get<LoginMessage[]>(this._url);
    // console.log(this.data.Message)
    // console.log(this.http.get<LoginMessage>(this._url));    
    return this.http_Var.get<LoginMessage>("http://api.sameerul.com:3000/userLogin");
  }

  // Logging in
  postLoginService(name, password): Observable<LoginMessage> {
    const body = new HttpParams()
      .set('email', name)
      .set('password', password);

    //     console.log(this.http_Var.post <UserCredential> ("http://localhost:3000/login",
    //     body.toString(),
    //     {
    //       headers: new HttpHeaders()
    //         .set('Content-Type', 'application/x-www-form-urlencoded')
    //     }
    //   )
    // );
    return this.http_Var.post<LoginMessage>("http://api.sameerul.com:3000/login",
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  
  profile() {

  }

  // Returns true if logged in else false
  isLoggedIn(): boolean {
    // Checking if the token exists or checking the expiration of the token
    if (localStorage.getItem("token") == null || this.authService.isAuthenticated()) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }

  // THis is responsible to remove the token once the user signs out
  signMeOut() {
    console.log("Signing out");
    localStorage.removeItem('token');
    console.log("Signed Out");
    // redirect to HOME PAGE
  }
}  