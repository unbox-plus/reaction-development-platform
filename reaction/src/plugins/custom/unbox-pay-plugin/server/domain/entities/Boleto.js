class Boleto {
  /**
   * Boleto constructor
   * @param {Object} params Boleto params
   * @param {String} params.expirationDate Boleto expiration date // TODO: Define later
   * @param {String} params.instructions Boleto instructions
   */
  constructor({ expirationDate = '', instructions = 'Não receber após o vencimento' }) {
    this.expirationDate = expirationDate;
    this.instructions = instructions;
  }
}

export default Boleto;
