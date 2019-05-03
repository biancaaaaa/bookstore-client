import { Injectable } from '@angular/core';
import {Order} from "../class/order";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";
import {Status} from "../class/status";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private api = 'http://bookstore19.s1610456011.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Order>> {
    return this.http.get(`${this.api}/orders`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getUserOrders(): Observable<Array<Order>> {
    const uid = localStorage.getItem('userId');
    return this.http.get(`${this.api}/orders/${uid}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(order: Order): Observable<any> {
    return this.http.post(`${this.api}/order`, order)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  addStatus(orderId, status: Status) {
    return this.http.put(`${this.api}/statusUpdate/${orderId}`, status)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
