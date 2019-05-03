import { Component, OnInit } from '@angular/core';
import {Item} from "./item";
import {BookFactory} from "../shared/factory/book-factory";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'bs-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styles: []
})
export class ShoppingBasketComponent implements OnInit {
  items: Item[];
  itemForms: FormGroup[];
  changed: boolean[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // get from local storage and convert from object to array
    this.items = ShoppingBasketComponent.convertToItems(
      ShoppingBasketComponent.getCartData() || {}
      ) || [];
    this.itemForms = [];
    for (let i = 0; i < this.items.length; i++) {
      this.itemForms[i] = this.fb.group({ amount: this.items[i].amount });
      this.changed[i] = false;
      this.itemForms[i].statusChanges.subscribe(() => this.changed[i] = true);
    }

  }

  /**
   * Returns total price of all items.
   *
   * @returns {number}
   */
  getTotalAmount() : number {
    let amount = 0;
    this.items.forEach(item => amount += (item.book.price * 1.1) * item.amount);
    return amount;
  }

  /**
   * Deletes item from cart.
   *
   * @param isbn
   */
  deleteItem(isbn: string) {
    if (confirm('Wollen Sie dieses Buch wirklich aus dem Warenkorb löschen?')) {
      // remove from array
      const index = this.items.findIndex(item => item.book.isbn === isbn);
      this.items.splice(index, 1);
      const cart = ShoppingBasketComponent.getCartData();
      // remove from local storage
      delete cart[isbn];
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  /**
   * Sets amount of certain item.
   *
   * @param isbn
   * @param index
   */
  setAmount(isbn: string, index: number) {
    // get amount of current item
    const amount = this.itemForms[index].value.amount;
    const cart = ShoppingBasketComponent.getCartData();
    cart[isbn].amount = amount;
    // saves ajs
    localStorage.setItem('cart', JSON.stringify(cart));
    const itemIndex = this.items.findIndex(item => item.book.isbn === isbn);
    this.items[itemIndex].amount = amount;
    this.changed[index] = false;

  }

  /**
   * Returns parsed data of cart.
   *
   * @returns {any}
   */
  static getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  /**
   * Converts objects into array of items.
   *
   * @param items
   * @returns {Array}
   */
  static convertToItems(items: any) : Item[] {
    items = Object.values(items);
    let newItems = [];
    for (let i = 0; i < items.length; i++) {
      let book = BookFactory.fromObject(items[i]);
      let item = new Item(book, items[i].amount);
      newItems = [...newItems, item];
    }
    return newItems;
  }
}
