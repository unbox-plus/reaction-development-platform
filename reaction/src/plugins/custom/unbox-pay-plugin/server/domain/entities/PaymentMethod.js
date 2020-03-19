export const TYPE_CREDIT_CARD = 'credit_card';
export const TYPE_BOLETO = 'boleto';

/**
 * @typedef {import("./CreditCard").default} CreditCard
 * @typedef {import("./Boleto").default} Boleto
 */

class PaymentMethod {
  /**
   * Set credit card payment method
   * @param {CreditCard} creditCard Credit card
   */
  setCreditCard(creditCard) {
    this.type = TYPE_CREDIT_CARD;
    this.creditCard = creditCard;
  }

  /**
   * Sets boleto payment method
   * @param {Boleto} boleto Boleto
   */
  setBoleto(boleto) {
    this.type = TYPE_BOLETO;
    this.boleto = boleto;
  }
}

export default PaymentMethod;
