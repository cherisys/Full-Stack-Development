import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserData = {};
  constructor(private _auth: AuthService, private _router:Router) { }

  ngOnInit() {
  }

  RegisterUser(){
    this._auth.registerUser(this.UserData).subscribe(
      res => {
        localStorage.setItem('token',res.token)
        this._router.navigate(['/specials'])
      },
      err => console.log(err)
    );
  }
}
