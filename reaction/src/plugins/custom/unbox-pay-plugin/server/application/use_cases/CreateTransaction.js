import Transaction from '../../domain/entities/Transaction';

/**
 * @typedef {import("../repositories/TransactionRepository").default} TransactionRepository
 * @typedef {import("../../domain/entities/Customer").default} Customer
 * @typedef {import("../../domain/entities/PaymentMethod").default} PaymentMethod
 */

/**
 * Creates a transaction
 * @param {String} sellerId Seller Id
 * @param {String} paymentId Payment Id
 * @param {String} amount Amount (10,00 = 1000)
 * @param {String} currencyCode Currency code
 * @param {String} installments Number of installments
 * @param {Customer} customer Customer
 * @param {PaymentMethod} paymentMethod Payment method
 * @param {Object} repositories Repositories object
 * @param {TransactionRepository} repositories.transactionRepository Transaction Repository
 */
const CreateTransaction = (
  sellerId,
  paymentId,
  amount,
  currencyCode,
  installments,
  customer,
  paymentMethod,
  { transactionRepository }
) => {
  const transaction = new Transaction({
    sellerId,
    paymentId,
    amount,
    currencyCode,
    installments,
    customer,
    paymentMethod
  });

  return transactionRepository.persist(transaction);
};

export default CreateTransaction;
