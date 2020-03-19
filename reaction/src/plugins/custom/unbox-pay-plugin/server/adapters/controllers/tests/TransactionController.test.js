import sinon from 'sinon';
import { authorizeTransaction } from '../TransactionController';
import GetCustomerByEmail from '../../../application/use_cases/GetCustomerByEmail';
import CreateCustomer from '../../../application/use_cases/CreateCustomer';
import GetRandomId from '../../../application/use_cases/GetRandomId';
import CustomerRepository from '../../../application/repositories/CustomerRepository';
import Address from '../../../domain/entities/Address';
import Customer from '../../../domain/entities/Customer';
import TransactionRepository from '../../../application/repositories/TransactionRepository';
import PaymentMethod from '../../../domain/entities/PaymentMethod';
import CreateInstallmentList from '../../../application/use_cases/CreateInstallmentList';

jest.mock('../../../application/use_cases/GetCustomerByEmail');
jest.mock('../../../application/use_cases/CreateCustomer');
jest.mock('../../../application/use_cases/CreateTransaction');
jest.mock('../../../application/use_cases/GetRandomId');
jest.mock('../../../application/use_cases/CreateInstallmentList');

describe('Transaction Controller', () => {
  describe('When authorizing a transaction', () => {
    it('tries to get customer by email with customer repository', async () => {
      const email = 'fake@email.com';
      const getCustomerByEmailSpy = sinon.spy();
      GetCustomerByEmail.mockImplementation(getCustomerByEmailSpy);
      const customerRepository = new CustomerRepository();

      await authorizeTransaction({ email }, { customerRepository });

      expect(getCustomerByEmailSpy.calledOnce).toBeTruthy();
      expect(getCustomerByEmailSpy.calledWith(email, { customerRepository })).toBeTruthy();
    });

    it('creates a transaction', async () => {
      const customerRepository = new CustomerRepository();
      const transactionRepository = new TransactionRepository();
      const sellerId = 'fake-seller-id';
      const amount = 10000;
      const currencyCode = 'BRL';
      const installments = 10;
      const paymentMethod = new PaymentMethod();
      const paymentId = 'fake-payment-id';
      const customer = new Customer({});
      const getCustomerByEmail = () => customer;
      GetCustomerByEmail.mockImplementationOnce(getCustomerByEmail);
      const getRandomId = () => paymentId;
      GetRandomId.mockImplementationOnce(getRandomId);
      const expectResult = {
        installmentsList: undefined,
        transaction: {
          amount,
          currencyCode,
          customer: {
            address: undefined,
            birthDate: undefined,
            email: undefined,
            firstName: undefined,
            id: null,
            lastName: undefined,
            phoneNumber: undefined,
            taxPayerId: undefined
          },
          id: '41a2b6af2743415e81e5e1190158bf11',
          installments,
          paymentId,
          paymentMethod,
          sellerId
        }
      };

      const transaction = await authorizeTransaction(
        { sellerId, amount, currencyCode, installments, paymentMethod },
        { customerRepository, transactionRepository }
      );

      expect(transaction).toEqual(expectResult);
    });

    describe('When creates in transaction', () => {
      it('Create Installments List', async () => {
        const customerRepository = new CustomerRepository();
        const transactionRepository = new TransactionRepository();
        const sellerId = 'fake-seller-id';
        const amount = 10000;
        const currencyCode = 'BRL';
        const installments = 10;
        const paymentMethod = new PaymentMethod();
        const paymentId = 'fake-payment-id';
        const customer = new Customer({});
        const getCustomerByEmail = () => customer;
        GetCustomerByEmail.mockImplementationOnce(getCustomerByEmail);
        const getRandomId = () => paymentId;
        GetRandomId.mockImplementationOnce(getRandomId);
        CreateInstallmentList.mockImplementation(() => {
          return [
            {
              installmentNumber: 1,
              status: 'pending',
              paidAt: null,
              dueDate: null,
              amount: 32.0,
              grossAmount: 33.33,
              createdAt: '2019-11-13T15:54:45+00:00',
              canceledAt: null,
              authorizationCode: 'Z133937-000260004'
            },
            {
              installmentNumber: 3,
              status: 'pending',
              paidAt: null,
              dueDate: null,
              amount: 32.01,
              grossAmount: 33.34,
              createdAt: '2019-11-13T15:54:45+00:00',
              canceledAt: null,
              authorizationCode: 'Z133937-000260004'
            },
            {
              installmentNumber: 2,
              status: 'pending',
              paidAt: null,
              dueDate: null,
              amount: 32.0,
              grossAmount: 33.33,
              createdAt: '2019-11-13T15:54:45+00:00',
              canceledAt: null,
              authorizationCode: 'Z133937-000260004'
            }
          ];
        });

        const expectResult = {
          installmentsList: [
            {
              installmentNumber: 1,
              status: 'pending',
              paidAt: null,
              dueDate: null,
              amount: 32.0,
              grossAmount: 33.33,
              createdAt: '2019-11-13T15:54:45+00:00',
              canceledAt: null,
              authorizationCode: 'Z133937-000260004'
            },
            {
              installmentNumber: 3,
              status: 'pending',
              paidAt: null,
              dueDate: null,
              amount: 32.01,
              grossAmount: 33.34,
              createdAt: '2019-11-13T15:54:45+00:00',
              canceledAt: null,
              authorizationCode: 'Z133937-000260004'
            },
            {
              installmentNumber: 2,
              status: 'pending',
              paidAt: null,
              dueDate: null,
              amount: 32.0,
              grossAmount: 33.33,
              createdAt: '2019-11-13T15:54:45+00:00',
              canceledAt: null,
              authorizationCode: 'Z133937-000260004'
            }
          ],
          transaction: {
            amount,
            currencyCode,
            customer: {
              address: undefined,
              birthDate: undefined,
              email: undefined,
              firstName: undefined,
              id: null,
              lastName: undefined,
              phoneNumber: undefined,
              taxPayerId: undefined
            },
            id: '41a2b6af2743415e81e5e1190158bf11',
            installments,
            paymentId,
            paymentMethod,
            sellerId
          }
        };

        const transaction = await authorizeTransaction(
          { sellerId, amount, currencyCode, installments, paymentMethod },
          { customerRepository, transactionRepository }
        );

        expect(transaction).toEqual(expectResult);
      });
    });

    describe('When customer not found by email', () => {
      beforeEach(() => {
        const getCustomerByEmail = () => null;
        GetCustomerByEmail.mockImplementationOnce(getCustomerByEmail);
      });

      it('creates a new customer', async () => {
        const email = 'fake@email.com';
        const customerRepository = new CustomerRepository();
        const createCustomerSpy = sinon.spy();
        CreateCustomer.mockImplementation(createCustomerSpy);
        const address = new Address({});
        const firstName = 'John';
        const lastName = 'Doe';
        const phoneNumber = '123456';
        const taxPayerId = '123456789';
        const birthDate = '1990-10-20';

        await authorizeTransaction(
          { email, address, firstName, lastName, phoneNumber, taxPayerId, birthDate },
          { customerRepository }
        );

        expect(createCustomerSpy.calledOnce).toBeTruthy();
        expect(
          createCustomerSpy.calledWith(
            address,
            email,
            firstName,
            lastName,
            phoneNumber,
            taxPayerId,
            birthDate,
            { customerRepository }
          )
        ).toBeTruthy();
      });
    });

    describe('When customer is found by email', () => {
      beforeEach(() => {
        const getCustomerByEmail = email => new Customer({ email });
        GetCustomerByEmail.mockImplementationOnce(getCustomerByEmail);
      });

      it('not creates a customer', async () => {
        const email = 'fake@email.com';
        const customerRepository = new CustomerRepository();
        const createCustomerSpy = sinon.spy();
        CreateCustomer.mockImplementation(createCustomerSpy);

        await authorizeTransaction({ email }, { customerRepository });

        expect(createCustomerSpy.called).toBeFalsy();
      });
    });
  });
});
