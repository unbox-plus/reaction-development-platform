import Customer from '../../domain/entities/Customer';

/**
 * @typedef {import("../repositories/CustomerRepository").default} CustomerRepository
 * @typedef {import("../../domain/entities/Address").default} Address
 */

/**
 * Creates a customer
 * @param {Address} address Customer address
 * @param {Email} email Customer email
 * @param {String} firstName Customer first name
 * @param {String} lastName Customer last name
 * @param {String} phoneNumber Customer phone number
 * @param {String} taxPayerId Customer tax payer id
 * @param {String} params.birthDate Customer birth date YYYY-MM-DD
 * @param {Object} repositories Repositories
 * @param {CustomerRepository} repositories.customerRepository Customer repository
 */
const CreateCustomer = (
  address,
  email,
  firstName,
  lastName,
  phoneNumber,
  taxPayerId,
  birthDate,
  { customerRepository }
) => {
  const customer = new Customer({
    address,
    email,
    firstName,
    lastName,
    phoneNumber,
    taxPayerId,
    birthDate
  });

  return customerRepository.persist(customer);
};

export default CreateCustomer;
