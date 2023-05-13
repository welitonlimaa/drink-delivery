/* eslint-disable max-len */
const email = 'zebirita@email.com';

const loginCustomerData = {
  email,
  password: '$#zebirita#$',
};

const customerData = {
  name: 'Cliente Zé Birita',
  email,
  role: 'customer',
  password: '1c37466c159755ce1fa181bd247cb925',
};

const customerDataWithToken = {
  name: 'Cliente Zé Birita',
  email,
  role: 'customer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgzOTg2MjU2LCJleHAiOjE2ODM5ODk4NTZ9.7HvdKZNo5H1w-yOTFyIxfJsgRebe3NRIB4xc--X7p90',
};

module.exports = {
  loginCustomerData,
  customerData,
  customerDataWithToken,
};