/**
 * @typedef {import("../repositories/TransactionRepository").default} TransactionRepository
 * @typedef {import("../../domain/entities/PaymentMethod").default} PaymentMethod
 */

/**
 * Creates a transaction
 * @param {String} transactionId transaction Id
 * @param {PaymentMethod} paymentMethod Payment method
 * @param {Object} repositories Repositories object
 * @param {TransactionRepository} repositories.transactionRepository Transaction Repository
 */
export default function CreateInstallmentList(
  transactionId,
  paymentMethod,
  { transactionRepository }
) {
  return transactionRepository.getInstallmentList(transactionId, paymentMethod);
}
