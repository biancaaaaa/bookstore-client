import { Component, OnInit } from '@angular/core';
import {OrderService} from "../shared/service/order.service";
import {Order} from "../shared/class/order";
import {Status} from "../shared/class/status";

@Component({
  selector: 'bs-user-orders',
  templateUrl: './user-orders.component.html',
  styles: []
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  showDetails: boolean[] = [];

  constructor(private os: OrderService) { }

  ngOnInit() {
    this.os.getUserOrders().subscribe(res => {
      this.orders = res;
      console.log(this.orders);
      for (let i = 0; i < this.orders.length; i++) {
        this.showDetails[i] = false;
      }
    });
  }

  /**
   * Sorts orders.
   */
  sortOrder() {
    return this.orders.sort((a: Order, b: Order) =>
      +new Date(b.orderedAt).getTime() - +new Date(a.orderedAt).getTime()
    );
  }
}
