/**
 * @typedef {import("../../domain/entities/CreditCard").default} CreditCard
 * @typedef {import("../../domain/entities/Boleto").default} Boleto
 */

class TransactionPayloadBuilder {
  /**
   * Transaction Payload Builder constructor
   * @param {String} unboxSellerId Unbox seller id
   * @param {String} paymentId Payment id
   */
  constructor(unboxSellerId, paymentId) {
    this.transactionPayload = {
      on_behalf_of: unboxSellerId,
      reference_id: paymentId,
      description: 'UnboxPay',
      statement_descriptor: 'UnboxPay'
    };
  }

  /**
   * Adds amount to transaction payload
   * @param {Number} totalAmount Total amount integer (10,00 = 1000)
   * @param {String} currencyCode Currency code string (ex: BRL)
   * @returns {TransactionPayloadBuilder} instance
   */
  withAmount(totalAmount, currencyCode) {
    this.transactionPayload = {
      ...this.transactionPayload,
      source: {
        ...this.transactionPayload.source,
        amount: totalAmount,
        currency: currencyCode
      }
    };

    return this;
  }

  /**
   * Adds customer to transaction payload
   * @param {String} customerUnboxPayId The unbox pay id for customer
   * @returns {TransactionPayloadBuilder} instance
   */
  withCustomer(customerUnboxPayId) {
    this.transactionPayload = {
      ...this.transactionPayload,
      source: {
        ...this.transactionPayload.source,
        customer: {
          id: customerUnboxPayId
        }
      }
    };

    return this;
  }

  /**
   * Adds credit card info to transaction payload
   * @param {CreditCard} creditCard Credit card entity
   * @param {Number} installments Installments number
   * @returns {TransactionPayloadBuilder} instance
   */
  withCreditCard(creditCard, installments) {
    this.transactionPayload = {
      ...this.transactionPayload,
      payment_type: 'credit',
      capture: true,
      source: {
        ...this.transactionPayload.source,
        usage: 'reusable',
        type: 'card',
        card: {
          holder_name: creditCard.holderName,
          expiration_month: creditCard.expirationMonth,
          expiration_year: creditCard.expirationYear,
          card_number: creditCard.cardNumber,
          security_code: creditCard.securityCode
        },
        installment_plan: {
          mode: installments > 3 ? 'with_interest' : 'interest_free',
          number_installments: installments
        }
      }
    };

    return this;
  }

  /**
   * Adds boleto to payload
   * @param {Boleto} boleto Boleto entity
   * @returns {TransactionPayloadBuilder} instance
   */
  withBoleto(boleto) {
    this.transactionPayload = {
      ...this.transactionPayload,
      payment_type: 'boleto',
      payment_method: {
        expiration_date: boleto.expirationDate,
        top_instructions: [boleto.instructions]
      }
    };

    return this;
  }

  /**
   * @returns {Object} The transaction payload object
   */
  build() {
    return this.transactionPayload;
  }
}

export default TransactionPayloadBuilder;
