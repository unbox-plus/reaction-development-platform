import axios from 'axios';
import Logger from '../../domain/logger';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const appendPathOnUrl = (url, path) => `${url}/${path}`;

/**
 * @name request
 * @method
 * @summary Executes and HTTP request with the provided values
 * @param {Object} options Request otpions
 * @param {String} options.method This param will receive one of: "GET", "POST", "PUT" or "DELETE"
 * @param {String} options.path The path for the http request
 * @param {Object} options.body the body for a http request
 * @param {Object} options.parameters the params for a http request
 * @param {Object} options.headers  the headers for a http request
 * @param {String} options.auth this string should have the format 'user: password' for a basicAuth operation
 * @return {Promise<Object>} The HTTP request result
 */
export async function request({
  method = GET,
  url,
  path,
  body = null,
  parameters = null,
  headers = null,
  auth = null
}) {
  const endpoint = appendPathOnUrl(url, path);

  Logger.debug(`HTTP ${method}: ${endpoint}`);
  Logger.debug(`Headers ${JSON.stringify(headers, null, 2)}`);
  Logger.debug(`Params: ${JSON.stringify(parameters, null, 2)}`);
  Logger.debug(`Body: ${JSON.stringify(body, null, 2)}`);

  const options = {
    method,
    url: endpoint,
    ...(parameters && { params: parameters }),
    ...(body && { data: body }),
    headers: { 'Content-Type': 'application/json', ...headers },
    ...(auth && { auth })
  };

  console.log('options', options);

  try {
    const requestResult = await axios(options);
    const result = requestResult.data;

    Logger.debug(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    Logger.debug(`Request Error: ${JSON.stringify(error.response.data, null, 2)}`);
    throw new Error(`There was a problem when executing HTTP request`);
  }
}
