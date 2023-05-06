import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import ProductCard from './ProductCard';
import { requestData } from '../services/requests';

function Products() {
  const { products, setProducts } = useContext(AppContext);

  const getProducts = async () => {
    const data = await requestData('/products');
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);
  return (
    <div className="flex flex-wrap justify-around">
      {
        products.map(({ name, price, urlImage, id }, index) => (<ProductCard
          key={ index }
          id={ id }
          urlImage={ urlImage }
          name={ name }
          price={ price }
        />))
      }
    </div>
  );
}

export default Products;
