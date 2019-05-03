import {Component} from '@angular/core';
import {Book} from "./shared/class/book";
import {AuthService} from "./shared/service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  book: Book;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  bookSelected(book: Book) {
    this.router.navigate(['../books', book.isbn], {relativeTo: this.route});
  }

  /**
   * checks, if there is a user logged in.
   */
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * checks, if current user is an admin.
   */
  isAdmin() {
    return this.authService.isAdmin();
  }

  /**
   * returns login label
   */
  getLoginLabel() {
    return this.isLoggedIn() ? 'Logout' : 'Login';
  }
}
