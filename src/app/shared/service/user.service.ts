import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../class/user";
import {Address} from "../class/address";
import {catchError, retry} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://bookstore19.s1610456011.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getShopUsers() : Observable<Array<User>> {
    return this.http.get(`${this.api}/shopUsers`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  setAddress(address: Address) : Observable<User> {
    const uid = localStorage.getItem('userId');
    return this.http.put(`${this.api}/userInfo/${uid}`, address)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
