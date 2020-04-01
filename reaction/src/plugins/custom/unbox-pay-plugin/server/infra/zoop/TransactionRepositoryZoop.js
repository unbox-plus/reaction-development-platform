import { request, POST, GET } from '../http/httpRequest';
import { ZOOP_URL, getZoopAuth, getZoopMarketplaceId } from './zoopConstants';
import TransactionPayloadBuilder from './TransactionPayloadBuilderZoop';

/**
 * @typedef {import("../../domain/entities/Transaction").default} Transaction
 */

class TransactionRepositoryZoop {
  /**
   * Persist a transaction on zoop
   * @param {Transaction} transaction Transaction entity
   */
  async persist(transaction) {
    const zoopAuth = getZoopAuth();
    const zoopMarketPlaceId = getZoopMarketplaceId();
    const path = `marketplaces/${zoopMarketPlaceId}/transactions`;

    const transactionPayloadBuilder = new TransactionPayloadBuilder(
      transaction.sellerId,
      transaction.paymentId
    )
      .withAmount(transaction.amount, transaction.currencyCode)
      .withCustomer(transaction.customer.id);

    if (transaction.isCreditCardType()) {
      transactionPayloadBuilder.withCreditCard(
        transaction.paymentMethod.creditCard,
        transaction.installments
      );
    } else if (transaction.isBoletoType()) {
      transactionPayloadBuilder.withBoleto(transaction.paymentMethod.boleto);
    }

    const transactionPayload = transactionPayloadBuilder.build();

    console.log('transactionPayload', transactionPayload);

    const result = await request({
      method: POST,
      url: ZOOP_URL,
      path,
      body: transactionPayload,
      auth: zoopAuth
    });

    return result;
  }

  async getInstallmentList(transactionId, paymentMethod) {
    if (paymentMethod.type !== 'credit_card') return [];

    const zoopAuth = getZoopAuth();
    const zoopMarketPlaceId = getZoopMarketplaceId();
    const path = `marketplaces/${zoopMarketPlaceId}/transactions/${transactionId}/receivables`;

    const result = await request({
      method: GET,
      url: ZOOP_URL,
      path,
      auth: zoopAuth
    });

    const installments = result.items.map(item => {
      return {
        installmentNumber: item.installment,
        status: item.status,
        paidAt: item.paid_at,
        dueDate: item.expected_on,
        amount: item.amount,
        grossAmount: item.gross_amount,
        createdAt: item.created_at,
        canceledAt: item.canceled_at,
        authorizationCode: item.authorization_code
      };
    });

    return installments;
  }
}

export default TransactionRepositoryZoop;
