/* eslint-disable react/prop-types */
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Shimmer = () => {
  return (
    <div className='animate-pulse space-y-3'>
      <div className='w-full h-48 bg-gray-200 rounded-md'></div>
      <div className='w-full h-6 bg-gray-200 rounded-md'></div>
      <div className='w-2/3 h-3 bg-gray-200 rounded-md'></div>
    </div>
  );
};

const ProductList = ({ products, title, isLoading }) => {
  return (
    <div className='my-16'>
      <h1 className='text-2xl font-semibold my-4'>{title}</h1>
      {isLoading ? (
        <>
          <div className='grid grid-cols-6 gap-6'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Shimmer key={i} />
            ))}
          </div>
          <div className='animate-pulse w-48 my-8 h-10 rounded-md bg-gray-200'></div>
        </>
      ) : (
        <>
          <ul className='grid grid-cols-6 gap-6'>
            {products.map((prod) => (
              <Link key={prod._id} to={`/products/${prod._id}`}>
                <img src={prod.imageUrl} className='rounded-md' alt='' />
                <h1 className='text-lg my-2 font-semibold'>{prod.title}</h1>
                <p className='text-gray-601'>{prod.brand}</p>
                <p className='font-bold'>$ {prod.price}</p>
              </Link>
            ))}
          </ul>
          <Button outline className='w-48 my-8' color='blue'>
            Show more
          </Button>
        </>
      )}
    </div>
  );
};
export default ProductList;
