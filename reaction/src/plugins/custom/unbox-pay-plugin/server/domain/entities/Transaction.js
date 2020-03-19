import { TYPE_BOLETO, TYPE_CREDIT_CARD } from './PaymentMethod';

/**
 * @typedef {import("./Customer").default} Customer
 * @typedef {import("./PaymentMethod").default} PaymentMethod
 */

class Transaction {
  /**
   * Transaction constructor
   * @param {Object} params Transaction params
   * @param {String} params.id Transaction id
   * @param {String} params.sellerId Transaction seller id
   * @param {String} params.paymentId Transaction payment id
   * @param {Number} params.amount Transaction amount (10,00 = 1000)
   * @param {String} params.currencyCode Transaction currency code
   * @param {Number} params.installments Number of installments
   * @param {Customer} params.customer Transaction customer
   * @param {PaymentMethod} params.paymentMethod Transaction payment method
   */
  constructor({
    id = null,
    sellerId,
    paymentId,
    amount,
    currencyCode = 'BRL',
    installments = 1,
    customer,
    paymentMethod
  }) {
    this.id = id;
    this.sellerId = sellerId;
    this.paymentId = paymentId;
    this.amount = amount;
    this.currencyCode = currencyCode;
    this.customer = customer;
    this.installments = installments;
    this.paymentMethod = paymentMethod;
  }

  /**
   * @returns {Boolean} Returns true if its a credit card
   */
  isCreditCardType() {
    return this.paymentMethod.type === TYPE_CREDIT_CARD;
  }

  /**
   * @returns {Boolean} Returns true if its a boleto transaction
   */
  isBoletoType() {
    return this.paymentMethod.type === TYPE_BOLETO;
  }
}

export default Transaction;
