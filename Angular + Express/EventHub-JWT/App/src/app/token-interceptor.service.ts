import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  //constructor(private _Injector: Injector) { } //older versions of Angular requires Injector
  constructor(private _authService: AuthService) { }

  intercept(req,next){
    //let authService = this._Injector.get(AuthService);

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getToken()}`
      }
    });

    return next.handle(tokenizedReq);
  }
}
