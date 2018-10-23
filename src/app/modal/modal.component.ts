import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { loginUser } from '../Interfaces/loginUserInterface';
import { LoginService } from '../login.service';
import { Router } from '@angular/router'
import { UserDataService } from '../user-data.service';

declare var jQuery: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  user = new loginUser("", "");
  public serverResponse: string;

  constructor(private loginService: LoginService, private router: Router, private userDataService: UserDataService) { }

  ngOnInit() {

    // TO use this modal service in other component
    // First provide it in metadata In the using component
    // then in html import  <app-modal></app-modal>
  }

  signOut() {
    console.log("Sign Out");

    this.router.navigate(['/home']);

    this.loginService.signMeOut();
  }

  show() {
    // console.log(myObj);
    jQuery("#myModal").modal('show');


    // jQuery(this.myModal.nativeElement).modal('show'); 

    // jQuery(this.myModal.nativeElement).modal('show'); 
  }
  reLogin(name, password) {
    // console.log(this.loginService.getUserNameCredential());
    // console.log(this.loginService.getUserPasswordCredential());
    //  Condition checks already logged in user is accessing 
    // again not someother user trying to log inbetween through 
    // Session finished modal
    console.log(this.loginService.getUserNameCredential());
    if (name === this.loginService.getUserNameCredential()) {
      if (password === this.loginService.getUserPasswordCredential()) {
        this.loginService.postLoginService(name, password)
          .subscribe(res => this.setupUser(res));
        console.log("Im here tho");
      }
      else {
        this.serverResponse = "Incorrect Credentials";
      }
    } else {
      this.serverResponse = "Incorrect Credentials";
    }


  }

  // Run this function once user enters correct credential 
  setupUser(response) {
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
      this.serverResponse = ""; 
      jQuery("#myModal").modal('hide');
      // jQuery("#myModal").modal('hide');

      // this._loginService.getProfile().subscribe(res => console.log(res));
      // console.log(this._loginService.isLoggedIn());
      // this.router.navigate(['/myProfile']);
      // this.runProfile();
      // this.router.navigateByUrl('/home');
    }
  }

  setText(response) {
    // console.log(Message);
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
      this.serverResponse = "";
      jQuery("#myModal").modal('hide');
      this.userDataService.getFunctionList();
      // this._loginService.getProfile().subscribe(res => console.log(res));
      // console.log(this._loginService.isLoggedIn());
      // this.router.navigate(['/myProfile']);
      // this.runProfile();
      // this.router.navigateByUrl('/home');
    }
  }

}
