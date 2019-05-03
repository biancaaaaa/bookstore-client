import {Order} from "../class/order";
export class OrderFactory {
  /**
   * Turns json into Order
   * @param rawOrder
   * @returns {Order}
   */
  static fromObject(rawOrder: any): Order {
    return new Order(
      rawOrder.id,
      rawOrder.orderedAt,
      rawOrder.shop_user_id,
      rawOrder.books,
      null,
      rawOrder.shipping_address,
      rawOrder.total,
      rawOrder.total * 1.1
    );
  }
}
