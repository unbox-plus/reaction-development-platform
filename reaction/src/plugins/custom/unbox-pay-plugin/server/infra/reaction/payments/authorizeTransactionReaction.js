import ReactionError from '@reactioncommerce/reaction-error';
import Logger from '../../../domain/logger';
import Address from '../../../domain/entities/Address';
import { getFirstName, getLastName } from '../../../application/use_cases/GetNames';
import CustomerRepositoryZoop from '../../zoop/CustomerRepositoryZoop';
import { getPackageSettings } from '../packageSettings';
import { definePaymentMethodByPaymentType } from './paymentMethod';
import CreditCard from '../../../domain/entities/CreditCard';
import Boleto from '../../../domain/entities/Boleto';
import PaymentMethod from '../../../domain/entities/PaymentMethod';
import TransactionRepositoryZoop from '../../zoop/TransactionRepositoryZoop';
import { authorizeTransaction } from '../../../adapters/controllers/TransactionController';

const PACKAGE_NAME = 'unboxpay-payments';
const PAYMENT_METHOD_NAME = 'unboxpay_';
const PROCESSOR = 'UnboxPay';

const getAddress = billingAddress => {
  const { address1, address2, city, region, postal } = billingAddress;

  return new Address({
    line1: address1,
    line2: address2,
    neighborhood: 'None', // TODO: Add neighborhood
    city,
    state: region,
    postalCode: postal
  });
};

const getPaymentMethod = (paymentType, paymentInfo) => {
  const paymentMethod = new PaymentMethod();

  if (paymentType === 'credit') {
    paymentMethod.setCreditCard(
      new CreditCard({
        holderName: paymentInfo.cardHolder,
        expirationMonth: paymentInfo.expirationMonth,
        expirationYear: paymentInfo.expirationYear,
        cardNumber: paymentInfo.cardNumber,
        securityCode: paymentInfo.securityCode
      })
    );
  } else if (paymentType === 'boleto') {
    paymentMethod.setBoleto(new Boleto());
  }

  return paymentMethod;
};

const integerAmount = amountFloat => Math.round(amountFloat * 100);

/**
 * @name authorizeTransactionReaction
 * @method
 * @summary this function creates a transaction
 * @param {Object} context The request context
 * @param {Object} input Input necessary to create a payment
 * @return {Promise<Object>} The payment object in schema expected by the orders plugin
 */
export default async function authorizeTransactionReaction(context, input) {
  const {
    collections: { UnboxPayCustomer }
  } = context;
  const { email, amount: amountFloat, billingAddress, currencyCode, shopId, paymentData } = input;
  const { paymentType, ...paymentInfo } = paymentData;
  const { installments } = paymentInfo;
  const { phone, fullName } = billingAddress;
  const paymentMethodType = definePaymentMethodByPaymentType(paymentType);
  const { unboxPayPluginSellerId: sellerId } = getPackageSettings(context, shopId);
  const amount = integerAmount(amountFloat);
  const taxPayerId = '078.783.660-55'; // TODO: GET TAX PAYER
  const birthDate = '1992-10-05'; // TODO: GET BIRTH DATE
  const firstName = getFirstName(fullName);
  const lastName = getLastName(fullName);
  const address = getAddress(billingAddress);
  const paymentMethod = getPaymentMethod(paymentType, paymentInfo);
  const customerRepository = new CustomerRepositoryZoop(UnboxPayCustomer);
  const transactionRepository = new TransactionRepositoryZoop();

  try {
    const { transaction, installmentsList } = await authorizeTransaction(
      {
        email,
        address,
        firstName,
        lastName,
        phoneNumber: phone,
        birthDate,
        taxPayerId,
        sellerId,
        amount,
        currencyCode,
        installments,
        paymentMethod
      },
      { customerRepository, transactionRepository }
    );

    return {
      _id: transaction.id,
      address: billingAddress,
      amount,
      createdAt: new Date(),
      data: {
        paymentType,
        paymentRecord: transaction.source,
        redirectUrl:
          paymentType === 'boleto'
            ? transaction.source.payment_method.url.replace(/\\/g, '')
            : null,
        installments: paymentType === 'credit' ? installmentsList : null,
        gqlType: 'UnboxPayPaymentData'
      },
      displayName: `${paymentMethodType} via UnboxPay`,
      method: paymentMethodType,
      mode: 'sale',
      name: `${PAYMENT_METHOD_NAME}${paymentType}`,
      paymentPluginName: PACKAGE_NAME,
      processor: PROCESSOR,
      riskLevel: 'normal',
      shopId,
      status: 'created',
      transactionId: transaction.id,
      transactions: []
    };
  } catch (error) {
    Logger.error(error);

    throw new ReactionError(
      'payment-failed',
      `There was a problem authorizing this payment: ${error.message}`
    );
  }
}
