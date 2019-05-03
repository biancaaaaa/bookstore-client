import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/internal/operators";
import {BookStoreService} from "../shared/service/book-store.service";
import {Book} from "../shared/class/book";
import {Observable} from "rxjs";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(private bs: BookStoreService) {
  }

  keyup = new EventEmitter<string>();
  foundBooks: Book[] = [];
  isLoading: boolean = false;
  @Output() bookSelected = new EventEmitter<Book>();
  showBooks: boolean = false;

  ngOnInit() {
    this.keyup
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(searchTerm => {
        if (searchTerm && searchTerm !== "") {
          return this.bs.getAllSearch(searchTerm);
        }
        return new Observable();
      }))
      .pipe(tap(() => this.isLoading = true))
      .subscribe(books => {
        this.foundBooks = books;
        this.isLoading = false;
        this.showBooks = true;
      });
  }

  /**
   * Navigate to book.
   *
   * @param book
   * @returns {boolean}
   */
  goToBook(book) {
    this.bookSelected.emit(book);
    this.showBooks = false;
    return false;
  }
}
