import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../shared/class/order";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrderService} from "../shared/service/order.service";
import {Status} from "../shared/class/status";
import {AuthService} from "../shared/service/authentication.service";

@Component({
  selector: 'bs-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  @Input() order: Order;
  statusForm: FormGroup;
  changed: boolean = false;
  showDetails: boolean = false;

  constructor(private fb: FormBuilder,
              private os: OrderService,
              private as: AuthService) { }

  ngOnInit() {
    this.statusForm = this.fb.group({
      status: this.getCurrentOrderStatus(this.order.status, 'number'),
      comment: ''
    });
    this.statusForm.statusChanges.subscribe(() => this.changed = true);
  }

  /**
   * checks, if current user is an admin.
   */
  isAdmin() {
    return this.as.isAdmin();
  }

  /**
   * Returns total amount of books.
   */
  getTotalAmount() {
    let amount = 0;
    this.order.books
      .forEach(book => amount += book['pivot']['amount']);
    return amount;
  }

  /**
   * Return id of newest status.
   *
   * @param status
   * @param type
   */
  getCurrentOrderStatus(status: Status[], type) {
    // sort by changed date and take the latest one
    const currStatus = status.sort((a: Status, b: Status) =>
      +new Date(b.changedAt).getTime() - +new Date(a.changedAt).getTime()
    )[0];
    return type === 'string' ?
      currStatus['status']['description'] :
      currStatus['status_id'];
  }

  /**
   * Updates status in db and in order.
   */
  updateStatus() {
    const status = new Status(0,
      this.statusForm.value.status,
      new Date(),
      '',
      this.statusForm.value.comment
    );
    this.os.addStatus(this.order.id, status)
      .subscribe(res => {
      console.log(res);
      this.changed = false;
      this.order.status = [...this.order.status, res];
    });
  }

  /**
   * Shows detail box of an order.
   *
   * @param show
   */
  showDetailsOrder(show) {
    this.showDetails = show;
  }
}
