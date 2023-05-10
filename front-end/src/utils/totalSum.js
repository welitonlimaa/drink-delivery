const sumTotal = (products) => {
  const sumProducts = products.reduce((acc, curr) => {
    const { quantity, price } = curr;
    if (quantity) {
      const value = quantity * Number(price);
      return acc + value;
    }
    const value = curr.SalesProducts.quantity * Number(price);
    return acc + value;
  }, 0);

  return sumProducts;
};

export default sumTotal;
