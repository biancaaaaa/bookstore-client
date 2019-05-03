import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Address} from "../shared/class/address";
import {AddressFactory} from "../shared/factory/address-factory";
import {UserService} from "../shared/service/user.service";
import {Output} from "@angular/core";
import {AuthService} from "../shared/service/authentication.service";

@Component({
  selector: 'bs-delivery-address',
  templateUrl: './delivery-address.component.html',
  styles: []
})
export class DeliveryAddressComponent implements OnInit {
  @Output() nextStep = new EventEmitter<any>();
  address: Address = AddressFactory.empty();
  addressForm: FormGroup;
  isUpdatingAddress: boolean = false;
  addressExists: boolean;

  constructor(private fb: FormBuilder,
              private us: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      this.authService.getUserInfo().subscribe(res => {
        localStorage.setItem('userInfo', JSON.stringify(res));
        userInfo = res;
        console.log(userInfo);
        this.checkAddress(userInfo);
      });
      this.initAddress();
    } else {
      this.checkAddress(userInfo);
    }
  }

  /**
   * Checks, if address already exists in user info.
   *
   * @param userInfo
   */
  checkAddress(userInfo) {
    if (!userInfo.address) {
      this.addressExists = false;
    } else {
      this.addressExists = true;
      this.address = AddressFactory.fromObject(userInfo.address);
    }
    this.initAddress();
  }

  /**
   * Switches to update mode.
   *
   * @param mode
   */
  setToUpdateMode(mode) {
    this.isUpdatingAddress = mode;
    if (mode) this.initAddress();
  }

  /**
   * Initializes the address form.
   */
  initAddress() {
    this.addressForm = this.fb.group({
      address1: this.address.address1,
      address2: this.address.address2,
      postal_code: this.address.postal_code,
      city: this.address.city,
      country: this.address.country
    });
  }

  /**
   * Saves new address into db.
   */
  submitForm() {
    const address: Address = AddressFactory.fromObject(this.addressForm.value);

    this.us.setAddress(address).subscribe(res => {
      this.nextStep.emit();
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      userInfo = {...userInfo, address: this.addressForm.value};
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    });
  }
}
