import GetCustomerByEmail from '../../application/use_cases/GetCustomerByEmail';
import CreateCustomer from '../../application/use_cases/CreateCustomer';
import CreateTransaction from '../../application/use_cases/CreateTransaction';
import CreateInstallmentList from '../../application/use_cases/CreateInstallmentList';
import GetRandomId from '../../application/use_cases/GetRandomId';

/**
 * @typedef {import("../../application/repositories/CustomerRepository").default} CustomerRepository
 * @typedef {import("../../application/repositories/TransactionRepository").default} TransactionRepository
 * @typedef {import("../../domain/entities/Address").default} Address
 * @typedef {import("../../domain/entities/PaymentMethod").default} PaymentMethod
 * @typedef {import("../../domain/entities/Transaction").default} Transaction
 */

/**
 * Authorizes a transaction
 * @param {Object} params Authorize transaction params
 * @param {String} params.email Customer email
 * @param {Address} params.address Customer address
 * @param {String} params.firstName Customer first name
 * @param {String} params.lastName Customer last name
 * @param {String} params.phoneNumber Customer phone number
 * @param {String} params.birthDate Customer birth date YYYY-MM-DD
 * @param {String} params.taxPayerId Customer tax payer id
 * @param {String} params.sellerId Seller id
 * @param {Number} params.amount Transaction amount
 * @param {String} params.currencyCode Transaction currency code
 * @param {Number} params.installments Transaction installments
 * @param {PaymentMethod} params.paymentMethod Transaction pauyment method
 * @param {Object} repositories Required repositories
 * @param {CustomerRepository} repositories.customerRepository Customer Repository
 * @param {TransactionRepository} repositories.transactionRepository Transaction Repository
 * @returns {Transaction} Created transaction
 */
export async function authorizeTransaction(
  {
    email,
    address,
    firstName,
    lastName,
    phoneNumber,
    birthDate,
    taxPayerId,
    sellerId,
    amount,
    currencyCode,
    installments,
    paymentMethod
  },
  { customerRepository, transactionRepository }
) {
  let customer = await GetCustomerByEmail(email, { customerRepository });

  if (!customer) {
    customer = await CreateCustomer(
      address,
      email,
      firstName,
      lastName,
      phoneNumber,
      taxPayerId,
      birthDate,
      {
        customerRepository
      }
    );
  }

  const paymentId = GetRandomId();

  const transaction = await CreateTransaction(
    sellerId,
    paymentId,
    amount,
    currencyCode,
    installments,
    customer,
    paymentMethod,
    {
      transactionRepository
    }
  );

  const installmentsList = await CreateInstallmentList(transaction.id, paymentMethod, {
    transactionRepository
  });

  return { transaction, installmentsList };
}
