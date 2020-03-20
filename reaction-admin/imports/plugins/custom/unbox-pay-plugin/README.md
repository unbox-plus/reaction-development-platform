# Unbox Pay Plugin

This is the Unbox Pay plugin for Reaction Commerce.

## Rules

To merge with the master branch you'll need:

- Follow Airbnb ESLint rules

## Testing Rules

- We'll follow [**XUnit Test Patterns**](http://xunitpatterns.com/Four%20Phase%20Test.html). TL;DR: to avoid let, subject, complex before or/and after.
- All Reaction dependencies should be mocked.
- Global mocks stays inside `__mocks__` folder.

```javascript
describe('TestFileName', () => {
  describe('when Foo is fooling', () => {
    it('will Foo like bar', () => {
      // ** 1. SETUP **
      // ** 2. EXERCISE **
      // ** 3. VERIFY **
      // ** 4. TEARDOWN **
    });

    it('will not Foo like bar', () => {
      // ** 1. SETUP **
      // ** 2. EXERCISE **
      // ** 3. VERIFY **
      // ** 4. TEARDOWN **
    });

    it('will modify Baz and Qux', () => {
      // ** 1. SETUP **
      // ** 2. EXERCISE **
      // ** 3. VERIFY **
      // ** 4. TEARDOWN **
    });
  });
});
```

## Layers Architecture

We're trying to follow a layer architecture like Uncle's Bob Clean Architecture:

<img src="images/architecture_cone.jpeg" alt="Layers Architecture" width="500" />

- Domain Layer: Business rules, should not depend from anyone.
  - Can call: -
  - Can be called: Application, Adapters, Infra
- Application Layer: The glue between adapter and domain layer. A use case is a action inside the system, like "CreateTransaction".
  - Can call: Domain
  - Can be called: Adapter, Infra
- Adapter Layer: Controllers, Presenters and Gateways
  - Can call: Application, Domain
  - Can be called by: Infra
- Infra Layer: Most general layer, connects with external services, connects with Reaction and its libs, knows about the external world.
  - Can call: Adapter, Applcation, Domain
  - Can be called by: -

## Installing dependencies

On your terminal, run:

```bash
yarn install
```

## Running tests

To run all tests:

```bash
yarn test
```

To run only tests that you're currently working on:

```bash
yarn test:watch
```

## Linting code

If you wanna check if you're correctly following lint rules, run:

```bash
yarn lint
```
