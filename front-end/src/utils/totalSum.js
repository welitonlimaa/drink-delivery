const sumTotal = (productsCart) => {
  const sumProducts = productsCart.reduce((acc, curr) => {
    const value = curr.quantity * Number(curr.price);
    return acc + value;
  }, 0);

  return sumProducts;
};

export default sumTotal;
