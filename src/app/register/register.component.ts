import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/login.service';
import { signUpUser } from 'src/app/Interfaces/signUpUserInterface';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = new signUpUser("", "", "", "");
  passwordMatch: boolean;
  public serverResponse: string;

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.serverResponse = "";
    console.log(this.model);
  }

  onKey() {

    // Check if password and password2 matches.
    console.log(this.model.name);
    if (this.model.password && this.model.password2 != " ") {
      if (this.model.password === this.model.password2) {
        console.log("SAME");
        this.passwordMatch = true;
        console.log()
      }
      else {
        this.passwordMatch = false;
      }
    }

  }
  submitUser() {
    this.serverResponse = "Loading Please Wait";
    console.log(this.model);

    this._loginService.signUpService(this.model.name, this.model.userEmail, this.model.password).subscribe(res =>
      this.setText(res)
    );
  }
  setText(response) {
    // console.log(Message);
    if (response.Message === "signedup") {
      this._loginService.postLoginService(this.model.userEmail, this.model.password)
        .subscribe(res =>
          this.registeredUserSignIn(res)
        );

      // this._loginService.getProfile().subscribe(res => console.log(res));
      console.log(this._loginService.isLoggedIn());
      // this.router.navigate(['/myProfile']);
    }
    else {
      this.serverResponse = response.Message;
    }
    console.log(response.Message);
  }
  registeredUserSignIn(response) {
    this.serverResponse = response.Message;
    localStorage.setItem("userName", response.Message);
    console.log(response);
    localStorage.setItem("token", "Bearer " + response.token);
    console.log(response.token);
    console.log(this._loginService.isLoggedIn());

    this.router.navigate(['/myProfile']);

  }
}
