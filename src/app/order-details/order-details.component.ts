import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../shared/class/order";
import {Status} from "../shared/class/status";

@Component({
  selector: 'bs-order-details',
  templateUrl: './order-details.component.html',
  styles: []
})
export class OrderDetailsComponent implements OnInit {
  @Input() order: Order;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Sorts status.
   *
   * @param status
   * @returns {Status[]}
   */
  sortStatus(status: Status[]) {
    return status.sort((a: Status, b: Status) =>
      +new Date(b['created_at']).getTime() - +new Date(a['created_at']).getTime()
    );
  }

}
