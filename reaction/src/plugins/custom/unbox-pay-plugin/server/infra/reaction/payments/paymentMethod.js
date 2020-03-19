/**
 * @name definePaymentMethodByPaymentType
 * @summary define the name of the method being used through the type
 * @param {String} paymentType the type of payment being made
 * @return {String} The method name
 */
export function definePaymentMethodByPaymentType(paymentType) {
  if (paymentType === 'credit') return 'Credit Card';
  if (paymentType === 'boleto') return 'Boleto';

  return null;
}
