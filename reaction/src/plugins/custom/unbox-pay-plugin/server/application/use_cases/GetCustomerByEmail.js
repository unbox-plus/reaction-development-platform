/**
 * @typedef {import("../repositories/CustomerRepository").default} CustomerRepository
 */

/**
 * Gets a customer by email
 * @param {String} email Customer email
 * @param {Object} repositories Repositories
 * @param {CustomerRepository} repositories.customerRepository Customer repository
 */
const GetCustomerByEmail = (email, { customerRepository }) => customerRepository.findByEmail(email);

export default GetCustomerByEmail;
