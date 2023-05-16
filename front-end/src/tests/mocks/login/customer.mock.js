const customerToken = require('../tokens/customerToken.json');
const registerCustomerToken = require('../tokens/registerCustomerToken.json');

export const invalidDataResponse = {
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

export const notRegistredUser = {
  email: 'notregistred@gmail.com',
  password: 'notregistred',
};

export const registerCustomerData = {
  name: 'Novo Cliente',
  email: 'novocliente@gmail.com',
  role: 'customer',
  token: registerCustomerToken,
};

export const registerPassword = '123456789';

module.exports = {
  invalidDataResponse,
  loginCustomerData,
  customerDataWithToken,
  notRegistredUser,
  registerCustomerData,
  registerPassword,
};
