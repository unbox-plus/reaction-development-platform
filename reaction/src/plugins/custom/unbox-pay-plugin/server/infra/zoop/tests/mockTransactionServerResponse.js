import nock from 'nock';
import { ZOOP_URL } from '../zoopConstants';
import creditCardTransactionResponse from './resources/creditCardTransactionResponse.json';
import creditCardTransactionPayload from './resources/creditCardTransactionPayload.json';
import creditCardTransactionUnauthorizedError from './resources/creditCardTransactionUnauthorizedError.json';

export function mockCreateTransactionZoopServer(validMarketPlaceId, validAuthUser) {
  nock(`${ZOOP_URL}/marketplaces/${validMarketPlaceId}`)
    .post('/transactions', creditCardTransactionPayload)
    .basicAuth({ user: validAuthUser })
    .reply(200, creditCardTransactionResponse);

  nock(`${ZOOP_URL}/marketplaces/${validMarketPlaceId}`)
    .post('/transactions', creditCardTransactionPayload)
    .reply(511, creditCardTransactionUnauthorizedError);
}
