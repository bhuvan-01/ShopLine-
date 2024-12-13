import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../services/lib/product';
import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { useApp } from '../hooks/useApp';
import toast from 'react-hot-toast';

const Shimmer = () => {
  return (
    <div className='animate-pusle my-8 min-h-screen w-full flex gap-8'>
      <div className='w-1/2 h-[80vh] bg-gray-300 rounded-md'></div>
      <div className='w-1/2 h-[80vh] space-y-4 rounded-md'>
        <div className='w-full h-8 bg-gray-200 rounded-md'></div>
        <div className='w-full h-8 bg-gray-200 rounded-md'></div>
        <div className='w-1/5 h-4 bg-gray-200 rounded-md'></div>
      </div>
    </div>
  );
};

const Product = () => {
  const { id } = useParams();
  const {
    state: { cart },
    dispatch,
  } = useApp();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlreadyOnCart, setIsAlreadyOnCart] = useState(false);

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product,
    });
    toast.success('Added to cart');
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getProduct(id);

        if (res.status === 200) {
          setProduct(res.data);
          setIsAlreadyOnCart(cart.some((p) => p._id === res.data._id));
        }
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [cart, id]);

  return (
    <div className='container-max'>
      <div className='flex'>
        {isLoading ? (
          <Shimmer />
        ) : (
          <div className='min-h-screen my-8 flex gap-16'>
            <img
              src={product.imageUrl}
              alt=''
              className='basis-1/2 rounded-md block aspect-[3/4] w-full max-h-[80vh] object-cover'
            />
            <div className='basis-1/2'>
              <h1 className='text-3xl mb-3'>{product.title}</h1>
              <p className='font-semibold text-cyan-600'>{product.brand}</p>
              <h2 className='text-xl my-4 font-bold'>$ {product.price}</h2>

              {/* description */}
              <section className='block my-4'>
                <h3 className='font-semibold mb-2'>Product Description</h3>
                <p className='text-gray-600'>{product.description}</p>
                <p className='text-gray-600'>
                  Category:{' '}
                  <span className='uppercase'>{product.category}</span>
                </p>
              </section>

              {isAlreadyOnCart ? (
                <Link
                  to='/cart'
                  className='p-3 inline-block my-4 px-6 rounded-md bg-blue-700 text-white'
                >
                  Go to Cart
                </Link>
              ) : (
                <Button onClick={() => addToCart(product)} color='blue'>
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Product;
