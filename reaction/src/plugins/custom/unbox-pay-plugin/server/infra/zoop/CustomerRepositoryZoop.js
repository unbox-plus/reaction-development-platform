import Customer from '../../domain/entities/Customer';
import { request, POST } from '../http/httpRequest';
import { ZOOP_URL, getZoopAuth, getZoopMarketplaceId } from './zoopConstants';
import CustomerPayloadBuilder from './CustomerPayloadBuilderZoop';
import UnboxPayCustomer from '../reaction/collections/UnboxPayCustomer';

/**
 * @typedef {import("../../domain/entities/Customer").default} Customer
 */

const createZoopCustomer = async customer => {
  const auth = getZoopAuth();
  const zoopMarketplaceId = getZoopMarketplaceId();

  const customerPayload = new CustomerPayloadBuilder()
    .withAddress(customer.address)
    .withEmail(customer.email)
    .withName(customer.firstName, customer.lastName)
    .withPhone(customer.phoneNumber)
    .withTaxPayerId(customer.taxPayerId)
    .withBirthDate(customer.birthDate)
    .build();

  const customerResult = await request({
    method: POST,
    url: ZOOP_URL,
    path: `marketplaces/${zoopMarketplaceId}/buyers`,
    body: customerPayload,
    auth
  });

  return customerResult;
};

const createUnboxPayCustomer = async (customer, zoopCustomer) => {
  const unboxPayCustomer = await UnboxPayCustomer.insert({
    email: customer.email,
    paymentProcessorId: zoopCustomer.id
  });

  return unboxPayCustomer;
};

const getUnboxPayCustomer = email => {
  const unboxPayCustomer = UnboxPayCustomer.findOne({ email });

  return unboxPayCustomer;
};

class CustomerRepositoryZoop {
  /**
   * Persists customer with Zoop
   * @param {Customer} customer Customer entity
   */
  async persist(customer) {
    const zoopCustomer = await createZoopCustomer(customer);
    const unboxPayCustomer = await createUnboxPayCustomer(customer, zoopCustomer);

    return new Customer({
      id: unboxPayCustomer._id,
      address: customer.address,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      taxPayerId: customer.taxPayerId,
      birthDate: customer.birthDate
    });
  }

  /**
   * Find a customer by its email
   * @param {String} email Customer email
   * @returns {Customer} The customer found
   */
  async findByEmail(email) {
    const unboxPayCustomer = await getUnboxPayCustomer(email);

    if (!unboxPayCustomer) return null;

    return new Customer({
      id: unboxPayCustomer._id,
      email: unboxPayCustomer.email
    });
  }
}

export default CustomerRepositoryZoop;
