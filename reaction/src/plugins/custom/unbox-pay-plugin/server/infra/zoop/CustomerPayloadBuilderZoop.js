/**
 * @typedef {import("../../domain/entities/Address").default} Address
 */

export default class CustomerPayloadBuilder {
  constructor() {
    this.customerPayload = {};
  }

  /**
   * Adds address
   * @param {Address} address Address entity
   * @returns {CustomerPayloadBuilder}
   */
  withAddress(address) {
    this.customerPayload = {
      ...this.customerPayload,
      address: {
        line1: address.line1,
        line2: address.line2,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        postal_code: address.postalCode,
        country_code: address.countryCode
      }
    };

    return this;
  }

  /**
   * Adds email
   * @param {String} email Email address
   * @returns {CustomerPayloadBuilder}
   */
  withEmail(email) {
    this.customerPayload = {
      ...this.customerPayload,
      email
    };

    return this;
  }

  /**
   * Adds customers name
   * @param {String} firstName First Name
   * @param {String} lastName Last Name
   * @returns {CustomerPayloadBuilder}
   */
  withName(firstName, lastName) {
    this.customerPayload = {
      ...this.customerPayload,
      first_name: firstName,
      last_name: lastName
    };

    return this;
  }

  /**
   * Adds customers phone number
   * @param {String} phoneNumber Phone Number
   * @returns {CustomerPayloadBuilder}
   */
  withPhone(phoneNumber) {
    this.customerPayload = {
      ...this.customerPayload,
      phone_number: phoneNumber
    };

    return this;
  }

  /**
   * Adds customers tax payer id
   * @param {String} taxPayerId Tax Payer Id (CPF)
   * @returns {CustomerPayloadBuilder}
   */
  withTaxPayerId(taxPayerId) {
    this.customerPayload = {
      ...this.customerPayload,
      taxpayer_id: taxPayerId
    };

    return this;
  }

  /**
   * Adds customers birth date
   * @param {String} birthDate Birth Date YYYY-MM-DD
   * @returns {CustomerPayloadBuilder}
   */
  withBirthDate(birthDate) {
    this.customerPayload = {
      ...this.customerPayload,
      birthdate: birthDate
    };

    return this;
  }

  /**
   * Build customer payload
   * @returns {Object} Customer payload object
   */
  build() {
    return this.customerPayload;
  }
}
