export const ZOOP_URL = 'https://api.zoop.ws/v1';

/**
 * @returns {Object} Auth object with the zoop key
 */
export const getZoopAuth = () => {
  const { ZOOP_KEY } = process.env;

  return { username: ZOOP_KEY };
};

/**
 * @returns {String} Zoop's marketplace id
 */
export const getZoopMarketplaceId = () => {
  const { ZOOP_MARKETPLACE_ID } = process.env;

  return ZOOP_MARKETPLACE_ID;
};
