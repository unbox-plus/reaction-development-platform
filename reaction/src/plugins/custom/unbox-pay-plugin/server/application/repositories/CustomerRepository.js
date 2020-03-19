/**
 * @typedef {import("../../domain/entities/Customer").default} Customer
 */

class CustomerRepository {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Persist customer
   * @param {Customer} customer Customer entity
   */
  persist(customer) {
    return this.repository.persist(customer);
  }

  /**
   * Gets a customer by email
   * @param {String} email Customer email
   * @returns {Promise<Customer>} Customer gotten
   */
  findByEmail(email) {
    return this.repository.findByEmail(email);
  }
}

export default CustomerRepository;
