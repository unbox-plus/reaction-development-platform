import Logger from '@reactioncommerce/logger';

export default {
  info: Logger.info.bind(Logger),
  warn: Logger.warn.bind(Logger),
  debug: Logger.debug.bind(Logger),
  error: Logger.error.bind(Logger)
};
