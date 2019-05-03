import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Order} from "../shared/class/order";
import {OrderFactory} from "../shared/factory/order-factory";
import {BookFactory} from "../shared/factory/book-factory";
import {Item} from "../shopping-basket/item";
import {OrderService} from "../shared/service/order.service";

@Component({
  selector: 'bs-order-overview',
  templateUrl: './order-overview.component.html',
  styles: []
})
export class OrderOverviewComponent implements OnInit {
  @Output() stepCompleted = new EventEmitter<any>();
  @Output() navigateBack = new EventEmitter<any>();
  order: Order;
  total: number = 0;
  orderCompleted: boolean = false;

  constructor(private os: OrderService) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const books = Object.values(cart).map(item =>
      new Item(BookFactory.fromObject(item), item['amount'])
    );
    books.forEach(item => this.total += item.amount * item.book.price);
    this.order = OrderFactory.fromObject({
      books,
      shipping_address: userInfo.address,
      shop_user_id: userInfo.id,
      orderedAt: new Date(),
      total: this.total
    });
  }

  /**
   * Stores order into db.
   */
  placeOrder() {
    this.os.create(this.order).subscribe(res => {
      this.orderCompleted = true;
      localStorage.removeItem('cart');
      this.stepCompleted.emit();
    });
  }
}
