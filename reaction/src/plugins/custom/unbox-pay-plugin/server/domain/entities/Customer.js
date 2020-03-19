/**
 * @typedef {import("./Address").default} Address
 */

class Customer {
  /**
   * Customer constructor
   * @param {Object} params Customer params
   * @param {String} params.id Customer Id
   * @param {Address} params.address Customer address
   * @param {String} params.email Customer email
   * @param {String} params.firstName Customer first name
   * @param {String} params.lastName Customer last name
   * @param {String} params.phoneNumber Customer phone number
   * @param {String} params.taxPayerId Cutomer tax payer id
   * @param {string} params.birthDate customer birth date yyyy-mm-dd
   */
  constructor({
    id = null,
    address,
    email,
    firstName,
    lastName,
    phoneNumber,
    taxPayerId,
    birthDate
  }) {
    this.id = id;
    this.address = address;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.taxPayerId = taxPayerId;
    this.birthDate = birthDate;
  }
}

export default Customer;
