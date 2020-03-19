import nock from 'nock';
import { ZOOP_URL } from '../zoopConstants';
import customerPayload from './resources/customerPayload';
import customerUnauthorizedError from './resources/customerUnauthorizedError.json';
import customerResponse from './resources/customerResponse.json';

export function mockCreateCustomerZoopServer(validMarketPlaceId, validAuthUser) {
  nock(`${ZOOP_URL}/marketplaces/${validMarketPlaceId}`)
    .post('/buyers', customerPayload)
    .basicAuth({ user: validAuthUser })
    .reply(200, customerResponse);

  nock(`${ZOOP_URL}/marketplaces/${validMarketPlaceId}`)
    .post('/buyers', customerPayload)
    .reply(511, customerUnauthorizedError);
}
