import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { BookFormErrorMessages } from './book-form-error-messages';
import {BookFactory} from "../shared/factory/book-factory";
import {BookStoreService} from "../shared/service/book-store.service";
import {Author, Book, Image} from "../shared/class/book";
import {BookValidators} from "../shared/book-validators";

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  book = BookFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingBook = false;
  images: FormArray;
  authors: FormArray;

  constructor(private fb: FormBuilder, private bs: BookStoreService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    if (isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        this.initBook();
      });
    }
    this.initBook();
  }

  /**
   * Initializes book.
   */
  initBook() {
    this.buildThumbnailsArray();
    this.buildAuthorArray();

    this.bookForm = this.fb.group({
      id: this.book.id,
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [this.book.isbn, [
        Validators.required,
        BookValidators.isbnFormat
      ]],
      price: [this.book.price, [
        Validators.required,
        BookValidators.isGreaterZero
      ]],
      description: this.book.description,
      rating: [this.book.rating,[
        Validators.min(0),
        Validators.max(10)
      ]],
      images: this.images,
      published: new Date(this.book.published),
      authors: this.authors
    });
    this.bookForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  /**
   * Builds form array for input.
   */
  buildAuthorArray() {
    if(this.book.authors.length == 0){ //if new book had no authors -> but no in edit mode
      this.book.authors.push(new Author(0,'',''));
    }
    this.authors = this.fb.array(
      this.book.authors.map(
        author => this.fb.group({
          firstName: this.fb.control(author.firstName),
          lastName: this.fb.control(author.lastName)
        })
      ),
      BookValidators.atLeastOneAuthor
    )
  }

  /**
   * Adds control of author input.
   */
  addAuthorControl() {
    this.authors.push(this.fb.group({firstName: null, lastName: null}));
  }

  /**
   * Removes control for author input.
   *
   * @param index
   */
  removeAuthorControl(index) {
    this.authors.removeAt(index);
  }

  /**
   * Creates form array for images.
   */
  buildThumbnailsArray() {
    console.log(this.book.images);
    //if(this.book.images.length == 0){ //if new book had no images -> but no in edit mode
    //this.book.images.push(new Image(0,'',''))
    //}
    this.images = this.fb.array(
      this.book.images.map(
        t => this.fb.group({
          id: this.fb.control(t.id),
          url: this.fb.control(t.url),
          title: this.fb.control(t.title)
        })
      ),
      BookValidators.atLeastOneImage
    );
    console.log(this.images);
  }

  /**
   * Adds control of image input.
   */
  addThumbnailControl() {
    this.images.push(this.fb.group({ url: null, title: null }));
  }

  /**
   * Removes control of image input.
   *
   * @param index
   */
  removeThumbnailControl(index) {
    this.images.removeAt(index);
  }

  /**
   * Submits form and saves new book.
   */
  submitForm() {
    // filter empty values
    this.bookForm.value.images = this.bookForm.value.images.filter(thumbnail => thumbnail.url);
    this.bookForm.value.authors = this.bookForm.value.authors.filter(author => author.firstName);

    const book: Book = BookFactory.fromObject(this.bookForm.value);
    //deep copy  - did not work without??
    book.images = this.bookForm.value.images;
    console.log(book);

    book.authors = this.bookForm.value.authors;

    if (this.isUpdatingBook) {
      this.bs.update(book).subscribe(res => {
        this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
      });
    } else {
      book.user_id = Number.parseInt(localStorage.getItem('userId'));
      console.log(book);
      this.bs.create(book).subscribe(res => {
        this.book = BookFactory.empty();
        this.bookForm.reset(BookFactory.empty());
        this.router.navigate(['../books'], { relativeTo: this.route });
      });
    }
  }

  /**
   * Updates error messages of form.
   */
  updateErrorMessages() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
