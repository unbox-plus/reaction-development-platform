const CreateTransaction = (
  sellerId,
  paymentId,
  amount,
  currencyCode,
  installments,
  customer,
  paymentMethod
) => {
  return {
    id: '41a2b6af2743415e81e5e1190158bf11',
    sellerId,
    paymentId,
    amount,
    currencyCode,
    installments,
    customer,
    paymentMethod
  };
};

export default CreateTransaction;
