const customerToken = require('./tokens/customerToken.json');

const adminToken = require('./tokens/adminToken.json');

const sellerToken = require('./tokens/sellerToken.json');

const emailCustomer1 = 'zebirita@email.com';

const loginCustomerData = {
  email: emailCustomer1,
  password: '$#zebirita#$',
};

const customerData = {
  name: 'Cliente Zé Birita',
  email: emailCustomer1,
  role: 'customer',
  password: '1c37466c159755ce1fa181bd247cb925',
};

const customerDataWithToken = {
  name: 'Cliente Zé Birita',
  email: emailCustomer1,
  role: 'customer',
  token: customerToken,
};

const nameCustomer2 = 'Maria Pereira';
const emailCustomer2 = 'maria@deliveryapp.com';

const customerRegisterData = {
  name: nameCustomer2,
  email: emailCustomer2,
  password: '--adpl2@97!!--',
};

const newCustomerRegisteredData = {
  name: nameCustomer2,
  email: emailCustomer2,
  role: 'customer',
  password: '4f0366b32d40cb07e48205cdbeea242f',
};

const customerRegisteredReturnWithToken = {
  name: nameCustomer2,
  email: emailCustomer2,
  role: 'customer',
  token: customerToken,
};

const adminData = {
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
};

const nameSeller1 = 'Pedro Cardoso';
const emailSeller1 = 'pedro@deliveryapp.com';

const sellerAdminRegisterData = {
  name: nameSeller1,
  email: emailSeller1,
  role: 'seller',
  password: '--adpl2@97!!--',
};

const newSellerRegisteredData = {
  name: nameSeller1,
  email: emailSeller1,
  role: 'seller',
  password: '4f0366b32d40cb07e48205cdbeea242f',
};

const sellerRegisteredReturnWithToken = {
  name: nameSeller1,
  email: emailSeller1,
  role: 'seller',
  token: sellerToken,
};

module.exports = {
  customerToken,
  loginCustomerData,
  customerData,
  customerDataWithToken,
  customerRegisterData,
  newCustomerRegisteredData,
  customerRegisteredReturnWithToken,
  adminToken,
  adminData,
  sellerToken,
  sellerAdminRegisterData,
  newSellerRegisteredData,
  sellerRegisteredReturnWithToken,
};