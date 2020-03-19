class CreditCard {
  /**
   * Credit Card constructor
   * @param {Object} params Credit card params
   * @param {String} params.holderName Holder name
   * @param {String} params.expirationMonth Expiration month MM
   * @param {String} params.expirationYear Expiration year YYYY
   * @param {String} params.cardNumber Card number
   * @param {String} params.securityCode Security code CVV
   */
  constructor({ holderName, expirationMonth, expirationYear, cardNumber, securityCode }) {
    this.holderName = holderName;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.cardNumber = cardNumber;
    this.securityCode = securityCode;
  }
}

export default CreditCard;
