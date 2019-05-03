export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const BookFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
  new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angegeben werden'),
  new ErrorMessage('isbn', 'minlength', 'Die ISBN muss mindestens 10 Zeichen enthalten'),
  new ErrorMessage('isbn', 'maxlength', 'Eine ISBN darf höchstens 13 Zeichen haben'),
  new ErrorMessage('isbn', 'isbnFormat', 'ISBN muss aus 10 oder 13 Zeichen bestehen'),
  new ErrorMessage('price', 'required', 'Es muss ein Preis angegeben werden'),
  new ErrorMessage('price', 'isGreaterZero', 'Preis muss größer 0 sein.'),
  new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
  new ErrorMessage('authors', 'atLeastOneAuthor', 'Es muss mindestens ein Autor mit Vor- und Nachnamen angegeben werden'),
  new ErrorMessage('rating', 'min', 'Bewertung kann nur positive Werte annehmen'),
  new ErrorMessage('rating', 'max', 'Maximal 10 Sterne erlaubt'),
  new ErrorMessage('images', 'atLeastOneImage', 'Es muss mindestens ein Bild mit URL und Titel angegeben werden')
];