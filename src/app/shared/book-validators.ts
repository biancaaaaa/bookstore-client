import {FormArray, FormControl} from "@angular/forms";


export class BookValidators {
  static isbnFormat(control: FormControl): { [error: string]: any } {
    if (!control.value) return null;

    // regular expressions
    const isolatedNumbers = control.value.replace(/-/g, '');
    const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;
    return isbnPattern.test(isolatedNumbers) ? null : {isbnFormat: {valid: false}};
  }

  static atLeastOneImage(controlArray: FormArray): { [error: string]: any } {
    const check = controlArray.controls.some(el =>
      el.value && el.value.url !== "" && el.value.url !== null &&
      el.value.title !== "" && el.value.title !== null);
    return check ? null : {atLeastOneImage: { valid: false }};
  }

  static atLeastOneAuthor(controlArray: FormArray): { [error: string]: any } {
    const check = controlArray.controls.some(el =>
    el.value && el.value.firstName !== "" && el.value.firstName !== null &&
    el.value.lastName !== "" && el.value.lastName !== null);
    return check ? null : {atLeastOneAuthor: { valid: false }};
  }

  static isGreaterZero(control: FormControl): { [error: string]: any } {
    return control.value > 0 ? null : {isGreaterZero: {valid: false}};
  }
}
