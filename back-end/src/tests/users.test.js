const sinon = require('sinon');

const chai = require('chai');

const chaiHttp = require('chai-http');

const JWT = require('jsonwebtoken');

const app = require('../api/app');

const { Users } = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

const { 
  loginCustomerData, 
  customerData, 
  customerRegisterData,
  customerRegisteredReturnWithToken,
  newCustomerRegisteredData,
  newSellerRegisteredData,
  sellerRegisteredReturnWithToken,
  sellerAdminRegisterData,
  adminToken,
  adminData,
  customerToken,
  customerDataWithToken,
} = require('./mocks/users/customerMocks');

const routes = {
  login: '/login',
  customerRegister: '/users/register',
  adminRegister: '/users/admin/register',
};

describe('Teste de integração Users', function () {
  describe('Teste de integração Login', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it(
      'request in /login route with customer data returns user data with success',
      async function () {
        const body = loginCustomerData;
        sinon
          .stub(Users, 'findOne')
          .resolves(customerData);
        sinon.stub(JWT, 'sign').returns(customerToken);
        const httpResponse = await chai.request(app)
          .post('/login')
          .send(body);
  
        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.deep.equal(customerDataWithToken);
      },
    );
  
    it(
      'request in /login route with customer invalid format data returns error with status 400',
      async function () {
        const body = {};

        const httpResponse = await chai.request(app)
          .post('/login')
          .send(body);
  
        expect(httpResponse.status).to.be.equal(400);
      },
    );
  
    it(
      'request in /login route with customer invalid data returns error with status 404',
      async function () {
        const body = customerData;
        sinon
          .stub(Users, 'findOne')
          .resolves({});

        const httpResponse = await chai.request(app)
          .post('/login')
          .send(body);
  
        expect(httpResponse.status).to.be.equal(404);
      },
    );  
  });

  describe('Teste de integração Register', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it(
      'create a new customer with customer valid data with success',
      async function () {
        const body = customerRegisterData;
        sinon
          .stub(Users, 'findOne')
          .resolves(undefined);
        sinon
          .stub(Users, 'create')
          .resolves(newCustomerRegisteredData);
        sinon.stub(JWT, 'sign').returns(customerRegisteredReturnWithToken.token);

        const httpResponse = await chai.request(app)
          .post(routes.customerRegister)
          .send(body);
  
        expect(httpResponse.status).to.be.equal(201);
        expect(httpResponse.body).to.be.deep.equal(customerRegisteredReturnWithToken);
      },
    );
  
    it(
      'try create a new customer with customer invalid format data',
      async function () {
        const httpResponse = await chai.request(app)
          .post(routes.customerRegister)
          .send({});
  
        expect(httpResponse.status).to.be.equal(400);
      },
    );

    it(
      'try create of new customer with customer data already registered',
      async function () {
        const body = customerRegisterData;
        sinon
          .stub(Users, 'findOne')
          .resolves(newCustomerRegisteredData);
        
        const httpResponse = await chai.request(app)
          .post(routes.customerRegister)
          .send(body);
  
        expect(httpResponse.status).to.be.equal(409);
      },
    );
  });

  describe('Teste de integração Admin Register', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it(
      'create a new seller with seller valid data with success',
      async function () {
        const body = sellerAdminRegisterData;
        const headers = { authorization: adminToken };

        sinon.stub(JWT, 'verify').returns({ data: adminData });
        sinon
          .stub(Users, 'findOne')
          .resolves(undefined);
        sinon
          .stub(Users, 'create')
          .resolves(newSellerRegisteredData);
        sinon.stub(JWT, 'sign').returns(sellerRegisteredReturnWithToken.token);

        const httpResponse = await chai.request(app)
          .post(routes.adminRegister)
          .set(headers)
          .send(body);
  
        expect(httpResponse.status).to.be.equal(201);
        expect(httpResponse.body).to.be.deep.equal(sellerRegisteredReturnWithToken);
      },
    );
    
    it(
      'try create a seller with no admin token',
      async function () {
        const body = sellerAdminRegisterData;
        const headers = { authorization: customerToken };

        const httpResponse = await chai.request(app)
          .post(routes.adminRegister)
          .set(headers)
          .send(body);
  
        expect(httpResponse.status).to.be.equal(401);
      },
    );

    it(
      'try create a new seller with invalid format seller data',
      async function () {
        const headers = { authorization: adminToken };

        sinon.stub(JWT, 'verify').returns({ data: adminData });

        const httpResponse = await chai.request(app)
          .post(routes.adminRegister)
          .set(headers)
          .send({});
  
        expect(httpResponse.status).to.be.equal(400);
      },
    );

    it(
      'try create a new seller with data already registered',
      async function () {
        const body = sellerAdminRegisterData;
        const headers = { authorization: adminToken };

        sinon.stub(JWT, 'verify').returns({ data: adminData });
        sinon
          .stub(Users, 'findOne')
          .resolves(true);

        const httpResponse = await chai.request(app)
          .post(routes.adminRegister)
          .set(headers)
          .send(body);
  
        expect(httpResponse.status).to.be.equal(409);
      },
    );
  });
});