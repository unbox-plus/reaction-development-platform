/**
 * @typedef {import("../../domain/entities/Transaction").default} Transaction
 */

class TransactionRepository {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Persist transaction
   * @param {Transaction} transaction Transaction entity
   */
  persist(transaction) {
    return this.repository.persist(transaction);
  }

  /**
   * Gets a transaction by id
   * @param {String} transactionId Transaction id
   * @returns {Promise<Transaction>} Transaction
   */
  findById(transactionId) {
    return this.repository.findById(transactionId);
  }

  /**
   * Get Installment List
   * @param {String} transactionId Transaction id
   * @param {String} paymentMethod payment Method
   * @returns {Promise<Transaction>} Transaction
   */
  getInstallmentList(transactionId, paymentMethod) {
    return this.repository.getInstallmentList(transactionId, paymentMethod);
  }
}

export default TransactionRepository;
