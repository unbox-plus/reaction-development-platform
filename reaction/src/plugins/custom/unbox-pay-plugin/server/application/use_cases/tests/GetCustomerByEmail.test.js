import sinon from 'sinon';
import GetCustomerByEmail from '../GetCustomerByEmail';
import CustomerRepository from '../../repositories/CustomerRepository';

describe('GetCustomerByEmail', () => {
  describe('When getting a customer by email', () => {
    it('calls the customers repository with findByEmail passing the email', () => {
      const email = 'fake@email.com';
      const findByEmail = sinon.spy();
      const customerRepository = new CustomerRepository({ findByEmail });

      GetCustomerByEmail(email, { customerRepository });

      expect(findByEmail.calledOnce).toBeTruthy();
      expect(findByEmail.calledWith(email)).toBeTruthy();
    });
  });
});
