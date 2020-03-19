import UnboxPayCustomer from '../collections/UnboxPayCustomer';

export const createCustomerReaction = async (userId, shopId, email, zoopCustomerId) => {
  const customer = await UnboxPayCustomer.insert({
    userId,
    shopId,
    email,
    unboxPayId: zoopCustomerId
  });

  return customer;
};

export const getReactionCustomer = (userId, shopId) => {
  const customer = UnboxPayCustomer.findOne({ userId, shopId });

  return customer;
};
