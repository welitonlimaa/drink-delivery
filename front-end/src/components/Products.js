import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import ProductCard from './ProductCard';
import { requestData } from '../services/requests';
import Cart from './Cart';

function Products() {
  const { products, setProducts } = useContext(AppContext);
  const [productsCart, setProductsCart] = useState([]);

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

        return setProductsCart([...newProductsCart,
          { id, urlImage, name, price, quantity: productQuantity }]);
      }
      return setProductsCart([...productsCart,
        { id, urlImage, name, price, quantity: productQuantity }]);
    }

    if (productQuantity === 0) {
      const newProductsCart = productsCart.filter((data) => data.id !== id);
      return setProductsCart(newProductsCart);
    }
  };

  useEffect(() => {
    if (products.length === 0) getProducts();
    localStorage.setItem('cart', JSON.stringify(productsCart));
  }, [productsCart]);

  return (
    <div>
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
      <Cart productsCart={ productsCart } />
    </div>
  );
}

export default Products;
