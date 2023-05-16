const customerToken = require('../tokens/customerToken.json');
const { customerDataWithToken } = require('../login/customer.mock');

const newSaleData = {
  sellerId: 2,
  totalPrice: '2.20',
  deliveryAddress: 'rua qualquer',
  deliveryNumber: '123',
  products: [{ productId: 1, quantity: 1 }],
};

const newOrderCreated = {
  id: 2,
  userId: 3,
  sellerId: 2,
  totalPrice: '2.20',
  deliveryAddress: 'rua okay',
  deliveryNumber: '123',
  status: 'Pendente',
};

const customerOrders = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '2.20',
    deliveryAddress: 'rua ola',
    deliveryNumber: '99',
    saleDate: '2023-05-15T17:24:29.000Z',
    status: 'Pendente',
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        SalesProducts: {
          quantity: 1,
        },
      },
    ],
    customer: {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      role: 'customer',
    },
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '2.20',
    deliveryAddress: 'rua qualquer',
    deliveryNumber: '123',
    saleDate: '2023-05-15T17:24:46.000Z',
    status: 'Pendente',
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        SalesProducts: {
          quantity: 1,
        },
      },
    ],
    customer: {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      role: 'customer',
    },
  },
];

module.exports = {
  customerToken,
  customerDataWithToken,
  newSaleData,
  newOrderCreated,
  customerOrders,
};
