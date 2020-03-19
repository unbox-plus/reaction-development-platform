export default class Address {
  /**
   * Address constructor
   * @param {Object} params Params object
   * @param {String} params.line1 Address line 1
   * @param {String} params.line2 Address line 2
   * @param {String} params.neighborhood Address neighborhood
   * @param {String} params.city City
   * @param {String} params.state State
   * @param {String} params.postalCode Postal code
   * @param {String} params.countryCode Country Code
   */
  constructor({ line1, line2, neighborhood, city, state, postalCode, countryCode = 'BR' }) {
    this.line1 = line1;
    this.line2 = line2;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.countryCode = countryCode;
  }
}
