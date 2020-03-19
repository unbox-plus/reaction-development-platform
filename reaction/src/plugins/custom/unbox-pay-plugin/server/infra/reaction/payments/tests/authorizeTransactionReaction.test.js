import sinon from 'sinon';
import { authorizeTransaction } from '../../../../adapters/controllers/TransactionController';
import authorizeTransactionReaction from '../authorizeTransactionReaction';
import { getPackageSettings } from '../../packageSettings';
import Address from '../../../../domain/entities/Address';
import PaymentMethod from '../../../../domain/entities/PaymentMethod';
import CreditCard from '../../../../domain/entities/CreditCard';
import CustomerRepositoryZoop from '../../../zoop/CustomerRepositoryZoop';
import TransactionRepositoryZoop from '../../../zoop/TransactionRepositoryZoop';

jest.mock('../../../../adapters/controllers/TransactionController');
jest.mock('../../packageSettings');
jest.mock('../../../../domain/logger.js');

const context = {
  userId: 'fake-user-id-123'
};

const input = {
  accountId: '9L62B2iZMgkMn2LhF',
  amount: 39.98,
  billingAddress: {
    address1: 'Al Jau 123',
    address2: 'Apto 33',
    city: 'Sao Paulo',
    company: null,
    country: 'BR',
    fullName: 'John Doe',
    isBillingDefault: false,
    isCommercial: false,
    isShippingDefault: false,
    phone: '11987654321',
    postal: '01420001',
    region: 'SP',
    _id: 'KwhLnk9AEk9ju3qBf',
    failedValidation: false
  },
  currencyCode: 'USD',
  email: 'john@doe.com',
  shopId: 'J8Bhq3uTtdgwZx3rz',
  paymentData: {
    cardHolder: 'John Doe',
    expirationMonth: '01',
    expirationYear: '21',
    cardNumber: '4539003370725497',
    securityCode: '123',
    installments: 1,
    paymentType: 'credit'
  }
};

describe('Authorize Transaction Reaction', () => {
  it('should call authorize transaction with the right params', () => {
    const authorizeTransactionSpy = sinon.spy();
    authorizeTransaction.mockImplementation(authorizeTransactionSpy);
    getPackageSettings.mockImplementation(() => ({ sellerId: 'fake-seller-id-123' }));
    const expectedAddress = new Address({
      line1: 'Al Jau 123',
      line2: 'Apto 33',
      neighborhood: 'None',
      city: 'Sao Paulo',
      state: 'SP',
      postalCode: '01420001',
      countryCode: 'BR'
    });
    const expectedCreditCard = new CreditCard({
      holderName: 'John Doe',
      expirationMonth: '01',
      expirationYear: '21',
      cardNumber: '4539003370725497',
      securityCode: '123'
    });
    const expectedPaymentMethod = new PaymentMethod();
    expectedPaymentMethod.setCreditCard(expectedCreditCard);
    const expectedCustomerRepo = new CustomerRepositoryZoop();
    const expectedTransactionRepo = new TransactionRepositoryZoop();

    authorizeTransactionReaction(context, input);

    sinon.assert.calledWith(
      authorizeTransactionSpy,
      {
        email: 'john@doe.com',
        address: expectedAddress,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '11987654321',
        birthDate: '1992-10-05',
        taxPayerId: '078.783.660-55',
        sellerId: 'fake-seller-id-123',
        amount: 3998,
        currencyCode: 'USD',
        installments: 1,
        paymentMethod: expectedPaymentMethod
      },
      { customerRepository: expectedCustomerRepo, transactionRepository: expectedTransactionRepo }
    );
  });
});
