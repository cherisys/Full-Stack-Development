import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserData = {};
  LoginErr = "";
  constructor(private auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  LoginUser(){
    this.LoginErr = "";
    this.auth.loginUser(this.UserData).subscribe(
      res => {
        localStorage.setItem('token',res.token)
        this._router.navigate(['/specials'])
      },
      err => this.LoginErr = err.error
    )
  }
}
