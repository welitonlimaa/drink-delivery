import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import ProductCard from './ProductCard';
import { requestData } from '../services/requests';

function Products() {
  const { products, setProducts, productsCart, setProductsCart } = useContext(AppContext);

  const getProducts = async () => {
    const data = await requestData('/products');
    const productsData = data.map((product) => {
      product.quantity = 0;
      return product;
    });
    setProducts(productsData);
  };

  const updateProductCart = ({ id, urlImage, name, price, productQuantity }) => {
    if (productQuantity > 0) {
      const product = productsCart.filter((data) => data.id === id);
      if (product.length !== 0) {
        const newProductsCart = productsCart.filter((data) => data.id !== id);
        newProductsCart.push({ id, urlImage, name, price, quantity: productQuantity });
        return setProductsCart(newProductsCart);
      }
      productsCart.push({ id, urlImage, name, price, quantity: productQuantity });
      return setProductsCart(productsCart);
    }

    if (productQuantity === 0) {
      const newProductsCart = productsCart.filter((data) => data.id !== id);
      return setProductsCart(newProductsCart);
    }
  };

  useEffect(() => {
    getProducts();
  }, [productsCart]);
  console.log(productsCart);
  return (
    <div className="flex flex-wrap justify-around">
      {
        products.map(({ name, price, urlImage, id, quantity }, index) => (<ProductCard
          key={ index }
          id={ id }
          urlImage={ urlImage }
          name={ name }
          price={ price }
          quantity={ quantity }
          updateProductCart={ updateProductCart }
        />))
      }
    </div>
  );
}

export default Products;
