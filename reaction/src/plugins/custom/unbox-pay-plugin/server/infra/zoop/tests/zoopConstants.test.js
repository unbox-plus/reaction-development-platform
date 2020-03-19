import mockedEnv from 'mocked-env';
import { getZoopAuth, getZoopMarketplaceId } from '../zoopConstants';

describe('Zoop Constants', () => {
  describe('When environment is set', () => {
    let restoreEnv;

    beforeAll(() => {
      restoreEnv = mockedEnv({
        ZOOP_KEY: 'zoop_key_test',
        ZOOP_MARKETPLACE_ID: 'zoop_marketplace_id_test'
      });
    });

    afterAll(() => {
      restoreEnv();
    });

    it('returns zoop auth constant with username and no password', () => {
      const auth = getZoopAuth();

      expect(auth).toEqual({ username: 'zoop_key_test' });
    });

    it('retuns zoop marketplace id', () => {
      const zoopMarketPlaceId = getZoopMarketplaceId();

      expect(zoopMarketPlaceId).toEqual('zoop_marketplace_id_test');
    });
  });
});
