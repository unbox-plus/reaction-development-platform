import TransactionPayloadBuilder from '../TransactionPayloadBuilderZoop';
import CreditCard from '../../../domain/entities/CreditCard';
import Boleto from '../../../domain/entities/Boleto';

describe('Transaction Payload Builder', () => {
  describe('When passing all data to builder', () => {
    describe('and calling the build function with Credit Card', () => {
      it('returns final transaction payload', () => {
        const fakeSellerId = 'fakeSellerId123';
        const fakePaymentId = 'fakePaymentId123';
        const fakeCustomerId = 'fakeCustomerId123';
        const expectedTransactionPayload = {
          description: 'UnboxPay',
          payment_type: 'credit',
          capture: true,
          on_behalf_of: fakeSellerId,
          reference_id: fakePaymentId,
          source: {
            amount: 1000,
            currency: 'BRL',
            usage: 'reusable',
            type: 'card',
            card: {
              holder_name: 'John Doe',
              expiration_month: '01',
              expiration_year: '2030',
              card_number: '1111111111111111',
              security_code: '123'
            },
            installment_plan: {
              mode: 'interest_free',
              number_installments: 1
            },
            customer: {
              id: fakeCustomerId
            }
          },
          statement_descriptor: 'UnboxPay'
        };
        const creditCard = new CreditCard({
          holderName: 'John Doe',
          expirationMonth: '01',
          expirationYear: '2030',
          cardNumber: '1111111111111111',
          securityCode: '123'
        });

        const transactionPayload = new TransactionPayloadBuilder(fakeSellerId, fakePaymentId)
          .withAmount(1000, 'BRL')
          .withCustomer(fakeCustomerId)
          .withCreditCard(creditCard, 1)
          .build();

        expect(transactionPayload).toEqual(expectedTransactionPayload);
      });
    });

    describe('and calling the build function with Boleto', () => {
      it('returns final transaction payload', () => {
        const fakeSellerId = 'fakeSellerId123';
        const fakePaymentId = 'fakePaymentId123';
        const fakeCustomerId = 'fakeCustomerId123';
        const expectedTransactionPayload = {
          description: 'UnboxPay',
          payment_type: 'boleto',
          on_behalf_of: fakeSellerId,
          reference_id: fakePaymentId,
          payment_method: {
            expiration_date: '',
            top_instructions: ['Não receber após o vencimento']
          },
          statement_descriptor: 'UnboxPay',
          source: {
            amount: 1000,
            currency: 'BRL',
            customer: {
              id: fakeCustomerId
            }
          }
        };
        const boleto = new Boleto({ instructions: 'Não receber após o vencimento' });

        const boletoTransactionPayload = new TransactionPayloadBuilder(fakeSellerId, fakePaymentId)
          .withAmount(1000, 'BRL')
          .withCustomer(fakeCustomerId)
          .withBoleto(boleto)
          .build();

        expect(boletoTransactionPayload).toEqual(expectedTransactionPayload);
      });
    });
  });
});
