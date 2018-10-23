import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.css']
})
export class JumboComponent implements OnInit {
  title2 = 'Note IT';
  constructor( public _loginService: LoginService) { }

  ngOnInit() {
    console.log(this._loginService.isLoggedIn());

  }

}
