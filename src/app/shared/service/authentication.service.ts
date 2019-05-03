import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/internal/operators";
import {User} from "../class/user";
import {isNull} from "@angular/compiler/src/output/output_ast";
import {ActivatedRoute, Router} from "@angular/router";


@Injectable()
export class AuthService {

  private api:string = 'http://bookstore19.s1610456011.student.kwmhgb.at/api';//'http://localhost:8080/api/auth';

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
  }

  login(email: string, password: string ) {
    return this.http.post(`${this.api}/auth/login`, {'email': email, 'password': password});
  }

  public getUserInfo(): Observable<User> {
    const uid = localStorage.getItem('userId');
    return this.http.get(`${this.api}/userInfo/${uid}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  public setLocalStorage(token: string) {
    const decodedToken = decode(token);
    // user.isAdmin
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    this.getUserInfo().subscribe(res => {
      localStorage.setItem('userInfo', JSON.stringify(res));
    });
  }

  logout() {
    this.http.post(`${this.api}/auth/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userInfo");
    console.log("logged out");
  }

  public isLoggedIn() {
    if(!isNullOrUndefined(localStorage.getItem("token"))){
      let token : string  = localStorage.getItem("token");
      const decodedToken = decode(token);
      let expirationDate:Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        console.log("token expired");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
        this.router.navigate(['../home'], { relativeTo: this.route });
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isAdmin() {
    const token = localStorage.getItem('token');
    if (isNullOrUndefined(token)) return false;
    const decodedToken = decode(token);
    return decodedToken.user.isAdmin;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
