import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ModalComponent } from '../modal/modal.component';
import { UserDataService } from '../user-data.service';

@Component({
  providers: [ModalComponent],
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private _loginService: LoginService, private userDataService: UserDataService, private modalComponent: ModalComponent) { }
  public myUsername: string;
  myPassword: string;
  myEmail: string;
  accountCreated: number;

  ngOnInit() {
    this.userDataService.getProfile().subscribe(res =>
      this.bindData(res)
    );
  }

  update(myUsername){
    this.myUsername = myUsername;
  }
  checkLogin() {
    if (this._loginService.isLoggedIn()) {
      console.log("User Logged In");

    }
    else {
      // Only show modal when user makes a update request and session is expired.
      this.modalComponent.show();

    }
  }
  bindData(response) {
    // console.log(response);
    console.log(response);
    this.myUsername = response.name;
    this.myEmail = response.email;
  }

}
