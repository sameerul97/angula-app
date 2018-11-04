import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/login.service';
import { signUpUser } from 'src/app/Interfaces/signUpUserInterface';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = new signUpUser("", "", "", "");
  passwordMatch: boolean;
  public serverResponse: string;

  constructor(private _loginService: LoginService, private router: Router,
    private ngxSpinner: NgxSpinnerService) { }

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
    // this.serverResponse = "Loading Please Wait";
    this.ngxSpinner.show();
    console.log(this.model);

    this._loginService.signUpService(this.model.name, this.model.userEmail, this.model.password).subscribe(res =>
      this.setText(res)
    );
  }
  setText(response) {
    // console.log(Message);
    // Check wat response message contains (Last bug)
    if (response.Message === "Signed Up") {
      this._loginService.postLoginService(this.model.userEmail, this.model.password)
        .subscribe(res =>
          this.registeredUserSignIn(res)
        );

      // this._loginService.getProfile().subscribe(res => console.log(res));
      console.log(this._loginService.isLoggedIn());
      // this.router.navigate(['/myProfile']);
    }
    else {
      this.ngxSpinner.hide();

      this.serverResponse = response.Message;
    }
    console.log(response.Message);
  }
  registeredUserSignIn(response) {
    // console.log("Im here");
    this.ngxSpinner.hide();
    this.serverResponse = response.Message;
    localStorage.setItem("userName", response.Message);
    console.log(response);
    localStorage.setItem("token", "Bearer " + response.token);
    console.log(response.token);
    console.log(this._loginService.isLoggedIn());
    this.router.navigate(['/myProfile']);
  }
}
