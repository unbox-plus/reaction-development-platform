import sinon from 'sinon';
import * as httpRequest from '../../http/httpRequest';
import { ZOOP_URL, getZoopAuth, getZoopMarketplaceId } from '../zoopConstants';
import { mockCreateTransactionZoopServer } from './mockTransactionServerResponse';
import TransactionRepositoryZoop from '../TransactionRepositoryZoop';
import Transaction from '../../../domain/entities/Transaction';
import Customer from '../../../domain/entities/Customer';
import TransactionPayloadBuilder from '../TransactionPayloadBuilderZoop';
import PaymentMethod from '../../../domain/entities/PaymentMethod';
import CreditCard from '../../../domain/entities/CreditCard';

jest.mock('../zoopConstants');
jest.mock('../../../domain/logger.js');

describe('Transaction Respository Zoop', () => {
  const fakeMarketplaceId = 'fake_market_place_id';
  const fakeAuthUser = 'testauth';

  beforeAll(() => {
    getZoopAuth.mockImplementation(() => ({ username: fakeAuthUser }));
    getZoopMarketplaceId.mockImplementation(() => fakeMarketplaceId);
    mockCreateTransactionZoopServer(fakeMarketplaceId, fakeAuthUser);
  });

  describe('When creating a zoop transaction', () => {
    it('calls the http request with the right arguments', async () => {
      const paymentMethod = new PaymentMethod();
      const creditCard = new CreditCard({});
      paymentMethod.setCreditCard(creditCard);
      const transaction = new Transaction({
        sellerId: '123',
        paymentId: 'payment123',
        amount: 1000,
        currencyCode: 'BRL',
        installments: 1,
        customer: new Customer({ id: 'fake-customer-id-123' }),
        paymentMethod
      });
      const requestStub = sinon
        .stub(httpRequest, 'request')
        .callsFake(() => ({ id: 'fake-transaction-id' }));
      const zoopPath = `marketplaces/${fakeMarketplaceId}/transactions`;
      const transactionPayload = new TransactionPayloadBuilder('123', 'payment123')
        .withAmount(1000, 'BRL')
        .withCustomer('fake-customer-id-123')
        .withCreditCard(creditCard, 1)
        .build();

      const response = await new TransactionRepositoryZoop().persist(transaction);

      expect(response).toEqual({ id: 'fake-transaction-id' });
      expect(requestStub.calledOnce).toBeTruthy();
      expect(requestStub.args[0][0]).toEqual({
        method: httpRequest.POST,
        url: ZOOP_URL,
        path: zoopPath,
        body: transactionPayload,
        auth: { username: fakeAuthUser }
      });

      requestStub.restore();
    });
  });
  describe('When pass in zoop transaction', () => {
    it('calls the http request with the right arguments', async () => {
      const transactionId = '41a2b6af2743415e81e5e1190158bf11';
      const paymentMethod = new PaymentMethod();
      const creditCard = new CreditCard({});
      paymentMethod.setCreditCard(creditCard);
      const itens = {
        items: [
          {
            id: '24e6e99735cd4a44a7fd979013801e1f',
            resource: 'receivable',
            status: 'pending',
            recipient: '40f88970a9d04ca1bd3bc6a4db997edf',
            transaction: '41a2b6af2743415e81e5e1190158bf11',
            split_rule: null,
            installment: 2,
            liable: true,
            amount: 9.6,
            gross_amount: 10.0,
            anticipation_fee: 0.0,
            paid_at: null,
            created_at: '2019-11-08T16:55:09+00:00',
            transaction_created_at: '2019-11-08T16:55:06+00:00',
            canceled_at: null,
            expected_on: '2020-01-08T00:00:00+00:00',
            authorization_code: 'Z133937-000260004',
            id_original_receivable: null,
            prepaid: false
          },
          {
            id: '4d85aef968ba48329f11cf8000f5700d',
            resource: 'receivable',
            status: 'pending',
            recipient: '40f88970a9d04ca1bd3bc6a4db997edf',
            transaction: '41a2b6af2743415e81e5e1190158bf11',
            split_rule: null,
            installment: 1,
            liable: true,
            amount: 9.6,
            gross_amount: 10.0,
            anticipation_fee: 0.0,
            paid_at: null,
            created_at: '2019-11-08T16:55:09+00:00',
            transaction_created_at: '2019-11-08T16:55:06+00:00',
            canceled_at: null,
            expected_on: '2019-12-09T00:00:00+00:00',
            authorization_code: 'Z133937-000260004',
            id_original_receivable: null,
            prepaid: false
          }
        ]
      };
      const expectItens = [
        {
          installmentNumber: 2,
          status: 'pending',
          paidAt: null,
          dueDate: '2020-01-08T00:00:00+00:00',
          amount: 9.6,
          grossAmount: 10.0,
          createdAt: '2019-11-08T16:55:09+00:00',
          canceledAt: null,
          authorizationCode: 'Z133937-000260004'
        },
        {
          installmentNumber: 1,
          status: 'pending',
          paidAt: null,
          dueDate: '2019-12-09T00:00:00+00:00',
          amount: 9.6,
          grossAmount: 10.0,
          createdAt: '2019-11-08T16:55:09+00:00',
          canceledAt: null,
          authorizationCode: 'Z133937-000260004'
        }
      ];
      const requestStub = sinon.stub(httpRequest, 'request').callsFake(() => itens);
      const zoopPath = `marketplaces/${fakeMarketplaceId}/transactions/${transactionId}/receivables`;

      const response = await new TransactionRepositoryZoop().getInstallmentList(
        transactionId,
        paymentMethod
      );

      expect(response).toEqual(expectItens);
      expect(requestStub.calledOnce).toBeTruthy();
      expect(requestStub.args[0][0]).toEqual({
        method: httpRequest.GET,
        url: ZOOP_URL,
        path: zoopPath,
        auth: { username: fakeAuthUser }
      });
    });
  });
});
