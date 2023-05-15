import customerToken from './tokens/customerToken.json';

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
