import CustomerPayloadBuilder from '../CustomerPayloadBuilderZoop';
import Address from '../../../domain/entities/Address';

describe('Customer Payload Builder', () => {
  describe('When passing all data to builder', () => {
    describe('and calling the build function', () => {
      it('returns final customer payload', () => {
        const expectedCustomerPayload = {
          address: {
            city: 'Sao Paulo',
            country_code: 'BR',
            line1: 'Rua das Flores, 123',
            line2: 'Apto 123',
            neighborhood: 'Jardim Paulista',
            postal_code: '01420001',
            state: 'SP'
          },
          email: 'hello@hello.com',
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '11323218323',
          taxpayer_id: '02322321232'
        };
        const address = new Address({
          line1: 'Rua das Flores, 123',
          line2: 'Apto 123',
          neighborhood: 'Jardim Paulista',
          city: 'Sao Paulo',
          state: 'SP',
          postalCode: '01420001',
          countryCode: 'BR'
        });
        const email = 'hello@hello.com';
        const firstName = 'John';
        const lastName = 'Doe';
        const phone = '11323218323';
        const taxPayerId = '02322321232';

        const customerPayload = new CustomerPayloadBuilder()
          .withAddress(address)
          .withEmail(email)
          .withName(firstName, lastName)
          .withPhone(phone)
          .withTaxPayerId(taxPayerId)
          .build();

        expect(customerPayload).toEqual(expectedCustomerPayload);
      });
    });
  });
});
