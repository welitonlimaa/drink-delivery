const sinon = require('sinon');

const chai = require('chai');

const chaiHttp = require('chai-http');

const JWT = require('jsonwebtoken');

const app = require('../api/app');

const { Users, Sales, SalesProducts } = require('../database/models');
const {
  newSaleData,
  newOrderCreated,
  customerToken,
  customerData,
  customerOrders,
} = require('./mocks/sales/salesMocks');

chai.use(chaiHttp);

const { expect } = chai;

const routes = {
  saleRegister: '/sales/register',
  getSales: '/sales',
};

describe('Teste de integração Sales', function () {
  describe('Teste de integração Register Sale', function () {
    afterEach(function () {
      sinon.restore();
    });

    it(
      'create a new sale with sale valid data with success',
      async function () {
        const body = newSaleData;
        const headers = { authorization: customerToken };
        sinon.stub(JWT, 'verify').returns({ data: customerData });
        sinon
          .stub(Users, 'findOne')
          .resolves(true);
        sinon
          .stub(Sales, 'create')
          .resolves(newOrderCreated);
        sinon
          .stub(SalesProducts, 'bulkCreate')
          .resolves(true);

        const httpResponse = await chai.request(app)
          .post(routes.saleRegister)
          .set(headers)
          .send(body);

        expect(httpResponse.status).to.be.equal(201);
        expect(httpResponse.body).to.be.deep.equal(newOrderCreated);
      },
    );

    it(
      'try create a new sale without token',
      async function () {
        const body = newSaleData;
        const headers = {};
        const httpResponse = await chai.request(app)
          .post(routes.saleRegister)
          .set(headers)
          .send(body);

        expect(httpResponse.status).to.be.equal(401);
      },
    );

    it(
      'try create a new sale with invalid sale data',
      async function () {
        const body = {};
        const headers = { authorization: customerToken };
        sinon.stub(JWT, 'verify').returns({ data: customerData });

        const httpResponse = await chai.request(app)
          .post(routes.saleRegister)
          .set(headers)
          .send(body);

        expect(httpResponse.status).to.be.equal(400);
      },
    );

    it(
      'try create a new sale with invalid seller id',
      async function () {
        const body = newSaleData;
        const headers = { authorization: customerToken };
        sinon.stub(JWT, 'verify').returns({ data: customerData });
        sinon
          .stub(Users, 'findOne')
          .resolves(false);

        const httpResponse = await chai.request(app)
          .post(routes.saleRegister)
          .set(headers)
          .send(body);

        expect(httpResponse.status).to.be.equal(404);
      },
    );
  });

  describe('Teste de integração get Sales', function () {
    afterEach(function () {
      sinon.restore();
    });

    it(
      'get customer orders',
      async function () {
        const headers = { authorization: customerToken };
        sinon.stub(JWT, 'verify').returns({ data: customerData });
        sinon
          .stub(Sales, 'findAll')
          .resolves(customerOrders);

        const httpResponse = await chai.request(app)
          .get(routes.getSales)
          .set(headers);

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.deep.equal(customerOrders);
      },
    );

    it(
      'get customer order by id',
      async function () {
        const headers = { authorization: customerToken };
        sinon.stub(JWT, 'verify').returns({ data: customerData });
        sinon
          .stub(Sales, 'findByPk')
          .resolves(customerOrders[0]);

        const httpResponse = await chai.request(app)
          .get('/sales/1')
          .set(headers);

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.deep.equal(customerOrders[0]);
      },
    );
  });
});