import {Address} from "../class/address";

export class AddressFactory {

  static empty(): Address {
    return new Address('', '', '', '', '');
  }

  /**
   * Turns json into Address
   * @param rawAddress
   * @returns {Address}
   */
  static fromObject(rawAddress: any): Address {
    return new Address(
      rawAddress.address1,
      rawAddress.address2,
      rawAddress.postal_code,
      rawAddress.city,
      rawAddress.country
    );
  }
}
