import sinon from 'sinon';
import * as httpRequest from '../../http/httpRequest';
import CustomerRepositoryZoop from '../CustomerRepositoryZoop';
import { ZOOP_URL, getZoopAuth, getZoopMarketplaceId } from '../zoopConstants';
import { mockCreateCustomerZoopServer } from './mockCustomerServerResponse';
import customerPayload from './resources/customerPayload.json';
import customerResponse from './resources/customerResponse.json';
import Customer from '../../../domain/entities/Customer';
import Address from '../../../domain/entities/Address';
import UnboxPayCustomer from '../../reaction/collections/UnboxPayCustomer';

jest.mock('../zoopConstants');
jest.mock('../../../domain/logger.js');
jest.mock('../../reaction/collections/UnboxPayCustomer');

describe('Customer Repository Zoop', () => {
  describe('When creating a zoop customer', () => {
    const fakeMarketplaceId = 'fake_market_place_id';
    const fakeAuthUser = 'testauth';

    beforeAll(() => {
      getZoopAuth.mockImplementation(() => ({ username: fakeAuthUser }));
      getZoopMarketplaceId.mockImplementation(() => fakeMarketplaceId);
      mockCreateCustomerZoopServer(fakeMarketplaceId, fakeAuthUser);
    });

    it('calls the http request with the right arguments', async () => {
      const address = new Address({
        line1: 'Address Line 1',
        line2: 'Address Line 2',
        neighborhood: 'Jardim Paulista',
        city: 'Sao Paulo',
        state: 'SP',
        postalCode: '01420001',
        countryCode: 'BR'
      });
      const customer = new Customer({
        address,
        email: 'john@wick.com',
        firstName: 'John',
        lastName: 'Wick',
        phoneNumber: '11223219321',
        taxPayerId: '1234512345',
        birthDate: '1990-10-20'
      });
      const zoopRequestStub = sinon.stub(httpRequest, 'request').callsFake(() => customerResponse);
      const zoopPath = `marketplaces/${fakeMarketplaceId}/buyers`;
      const unboxCustomerInsertStub = sinon
        .stub(UnboxPayCustomer, 'insert')
        .callsFake(() => ({ id: 'fake_customer_id' }));

      const response = await new CustomerRepositoryZoop().persist(customer);

      expect(response).toBeInstanceOf(Customer);
      expect(zoopRequestStub.calledOnce).toBeTruthy();
      expect(zoopRequestStub.args[0][0]).toEqual({
        method: httpRequest.POST,
        url: ZOOP_URL,
        path: zoopPath,
        body: customerPayload,
        auth: { username: fakeAuthUser }
      });
      expect(unboxCustomerInsertStub.calledOnce).toBeTruthy();
      expect(unboxCustomerInsertStub.args[0][0]).toEqual({
        email: customer.email,
        paymentProcessorId: customerResponse.id
      });

      zoopRequestStub.restore();
      unboxCustomerInsertStub.restore();
    });
  });

  describe('When getting a customer by email', () => {
    it('returns the customer with id and email', async () => {
      const customerId = 'fake-customer-id';
      const customerEmail = 'john@doe.com';
      const unboxCustomerFindStub = sinon
        .stub(UnboxPayCustomer, 'findOne')
        .callsFake(() => ({ _id: customerId, email: customerEmail }));

      const foundCustomer = await new CustomerRepositoryZoop().findByEmail(customerEmail);

      expect(unboxCustomerFindStub.called).toBeTruthy();
      expect(unboxCustomerFindStub.args[0][0]).toEqual({
        email: customerEmail
      });
      expect(foundCustomer.id).toEqual(customerId);
      expect(foundCustomer.email).toEqual(customerEmail);

      unboxCustomerFindStub.restore();
    });

    it('returns null when email is not found', async () => {
      const notExistantEmail = 'not-existant-email@email.com';
      const unboxCustomerFindStub = sinon
        .stub(UnboxPayCustomer, 'findOne')
        .callsFake(() => undefined);

      const foundCustomer = await new CustomerRepositoryZoop().findByEmail(notExistantEmail);

      expect(foundCustomer).toEqual(null);

      unboxCustomerFindStub.restore();
    });
  });
});
