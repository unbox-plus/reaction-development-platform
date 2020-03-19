import { getFirstName, getLastName } from '../GetNames';

describe('Name', () => {
  describe('when we have a valid full name', () => {
    const fullName = 'John Travolta da Silva';

    describe('and wanna get the first name', () => {
      it('returns only the first name', () => {
        const expectedFirstName = 'John';

        const firstName = getFirstName(fullName);

        expect(firstName).toEqual(expectedFirstName);
      });
    });

    describe('and wanna get the last name', () => {
      it('returns the only the last name', () => {
        const expectedLastName = 'Travolta da Silva';

        const lastName = getLastName(fullName);

        expect(lastName).toEqual(expectedLastName);
      });
    });
  });

  describe('when have a full name with only the first name', () => {
    const fullName = 'John';

    describe('and wanna get the first name', () => {
      it('returns only the first name', () => {
        const expectedFirstName = 'John';

        const firstName = getFirstName(fullName);

        expect(firstName).toEqual(expectedFirstName);
      });
    });

    describe('and wanna get the last name', () => {
      it('returns a empty string', () => {
        const expectedLastName = '';

        const lastName = getLastName(fullName);

        expect(lastName).toEqual(expectedLastName);
      });
    });
  });
});
