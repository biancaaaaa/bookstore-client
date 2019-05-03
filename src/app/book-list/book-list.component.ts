import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/class/book";
import {BookStoreService} from "../shared/service/book-store.service";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.books = res);
  }
}
