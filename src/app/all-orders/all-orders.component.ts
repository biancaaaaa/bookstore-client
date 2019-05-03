import { Component, OnInit } from '@angular/core';
import {OrderService} from "../shared/service/order.service";
import {Order} from "../shared/class/order";
import {User} from "../shared/class/user";
import {UserService} from "../shared/service/user.service";
import {Status} from "../shared/class/status";

@Component({
  selector: 'bs-all-orders',
  templateUrl: './all-orders.component.html',
  styles: []
})
export class AllOrdersComponent implements OnInit {
  orders: Order[] = [];
  shopUsers: User[] = [];
  selectedUser: User = null;

  constructor(private os: OrderService,
              private us: UserService) { }

  ngOnInit() {
    this.os.getAll().subscribe(res => {
      this.orders = res;
      console.log(this.orders);
    });
    this.us.getShopUsers().subscribe(res => {
      this.shopUsers = res;
      console.log(this.shopUsers);
    })
  }

  /**
   * Filters all orders by user.
   *
   * @param id
   */
  getUserOrders(id) : Array<Order> {
    return this.orders.filter(
      order => order.shop_user_id === id
    ).sort((a: Order, b: Order) =>
      +new Date(b.orderedAt).getTime() - +new Date(a.orderedAt).getTime()
    );
  }

  /**
   * Sets selected user.
   *
   * @param index
   */
  setSelectedUser(index) {
    this.selectedUser = this.shopUsers[index];
  }

  /**
   * Unsets user.
   */
  unsetUser() {
    this.selectedUser = null;
  }
}
