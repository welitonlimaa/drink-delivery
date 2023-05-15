const customerToken = require('../tokens/customerToken.json');

const invalidDataResponse = {
  message: '"email" must be a valid email',
};

const customerEmail = 'zebirita@email.com';

export const loginCustomerData = {
  email: customerEmail,
  password: '$#zebirita#$',
};

export const customerDataWithToken = {
  name: 'Cliente Zé Birita',
  email: customerEmail,
  role: 'customer',
  token: customerToken,
};

module.exports = {
  invalidDataResponse,
  loginCustomerData,
  customerDataWithToken,
};
