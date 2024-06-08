/**
 * @description - This function normalizes the port
 * @param {string} val
 * @returns  {number | boolean} - returns the port number or false
 */
export const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
