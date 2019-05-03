import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../shared/class/book";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'bs-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styles: []
})
export class AddToCartComponent implements OnInit {
  @Input() book: Book;
  cartForm: FormGroup;
  success: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cartForm = this.fb.group({
      amount: 1
    });
  }

  /**
   * Adds current book to cart.
   */
  addToCart() {
    const amount = this.cartForm.value.amount;
    const item = {...this.book, amount, price: this.book.price};
    const storage = JSON.parse(localStorage.getItem('cart')) || {};
    let items = {...storage, [item.isbn]: item};
    localStorage.setItem('cart', JSON.stringify(items));
    this.success = true;
  }
}
