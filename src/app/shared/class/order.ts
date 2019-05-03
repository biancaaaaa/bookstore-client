import {Book} from "./book";
import {Status} from "./status";
import {Address} from "./address";
import {Item} from "../../shopping-basket/item";

export class Order {
  constructor(public id: number,
              public orderedAt: Date,
              public shop_user_id: number,
              public books: Item[],
              public status: Status[],
              public shipping_address: Address,
              public totalNet: number,
              public totalPreTax: number
              ) {}
}
