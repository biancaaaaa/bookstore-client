import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/class/book";
import {BookStoreService} from "../shared/service/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shared/factory/book-factory";
import {AuthService} from "../shared/service/authentication.service";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {
  book: Book = BookFactory.empty();

  constructor(private bs: BookStoreService,
              private route: ActivatedRoute,
              private router: Router,
              protected authService: AuthService) { }

  ngOnInit() {
    // param of the active route
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn'])
      .subscribe(b => this.book = b );
  }

  /**
   * Returns array for stars.
   *
   * @param num
   * @returns {any[]}
   */
  getRating(num: number) {
    return new Array(num);
  }

  /**
   * Removes book from database.
   */
  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(this.book.isbn)
        .subscribe(res => this.router.navigate(['..'], {relativeTo: this.route}));
    }
  }
}
