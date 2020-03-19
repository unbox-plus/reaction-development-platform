import { appendPathOnUrl } from '../httpRequest';

jest.mock('../../../domain/logger.js');

describe('zoopRequestService', () => {
  describe('when we are trying to append a path on a url', () => {
    it('will join the path after the url', () => {
      const url = 'http://test.com.br';
      const path = 'test';

      const appendedUrl = appendPathOnUrl(url, path);

      expect(appendedUrl).toEqual('http://test.com.br/test');
    });
  });
});
