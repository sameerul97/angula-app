import { Component, OnInit } from '@angular/core';
import { loginUser } from '../Interfaces/loginUserInterface';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new loginUser('', '');

  public serverResponse: string;
  constructor(private _loginService: LoginService, private router: Router,
    private ngxSpinner: NgxSpinnerService) {

  }

  ngOnInit() {
    // this._loginService.getLoginService()
    // .subscribe(sucesss2 => console.log(this.setText(sucesss2.Message)))
    // this._loginService.getProfile().subscribe(res => console.log(res));

    // this._loginService.postLoginService()
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     }
    //   );
  }
  onSubmit(name, password) {
    
    this._loginService.setUserCredential(name, password)

    // console.log(this._loginService.getUserNameCredential());
    // console.log(this._loginService.getUserPasswordCredential());
    this.ngxSpinner.show();
    this._loginService.postLoginService(
      this._loginService.getUserNameCredential(),
      this._loginService.getUserPasswordCredential())
      .subscribe(res =>
        this.setText(res)
      );

    // this._loginService.getLoginService()
    //   .subscribe(sucesss2 =>  (this.setText(sucesss2.Message)));

    // .subscribe(sucesss2 => console.log(this.setText(sucesss2.Message)));
    // this._loginService.postLoginService()
    // .subscribe(
    //   res => {
    //     console.log(res);
    //     console.log(res.Message);
    //     // localStorage.setItem("userName",res.Message);
    //     console.log(res.token);
    //     // localStorage.setItem("token",res.token);
    //   }
    // );
  }


  setText(response) {
    // console.log(Message);
    this.ngxSpinner.hide();
    if (response.Message != "Okay") {
      // Unsuccessful Return
      console.log(response.Message);
      this.serverResponse = response.Message;
    } else {
      // Successful user accomplised
      // Get the token and store it 
      this.serverResponse = response.Message;
      localStorage.setItem("userName", response.Message);
      console.log(response);
      localStorage.setItem("token", "Bearer " + response.token);
      console.log(response.token);
      // this._loginService.getProfile().subscribe(res => console.log(res));
      console.log(this._loginService.isLoggedIn());
      this.router.navigate(['/myProfile']);
      // this.runProfile();
      // this.router.navigateByUrl('/home');
    }
  }


  // runProfile() {
  //   this._loginService.getProfile().subscribe(res => console.log(res));
  // }


}

