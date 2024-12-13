import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { getProductsService } from '../services/lib/product';
import ProductList from '../components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductsService();

        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Hero />

      <div className='container-max my-8'>
        <ProductList
          products={products.filter((prod) => prod.category === 'men')}
          title='Shop for Men'
          isLoading={isLoading}
        />
        <ProductList
          products={products.filter((prod) => prod.category === 'women')}
          title='Shop for Women'
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
export default Home;
