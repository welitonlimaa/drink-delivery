const sinon = require('sinon');

const chai = require('chai');

const chaiHttp = require('chai-http');

const app = require('../api/app');

const { Products } = require('../database/models');

const { products } = require('./mocks/products/productsMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração Products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('route /products return products data with status 200', async function () {
    sinon
      .stub(Products, 'findAll')
      .resolves(products);

    const httpResponse = await chai.request(app).get('/products');

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(products);
  });
});