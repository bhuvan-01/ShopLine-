import { useEffect, useState } from 'react';
import { getOrders } from '../services/lib/product';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import toast from 'react-hot-toast';

const Odrers = () => {
  const {
    state: { user },
  } = useApp();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login!');
      navigate('/login');
    }
  }, [navigate, user]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getOrders();

        if (res.status === 200) {
          setOrder(res.data);
        }
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className='container-max'>
      <h1 className='my-8 text-2xl font-semibold'>My Odrers</h1>

      {isLoading ? (
        'Loading...'
      ) : (
        <ul className='basis-8/12'>
          {order.map((o) =>
            o.products.map((p) => (
              <div className='flex my-4' key={p._id}>
                <Link to={`/products/${p._id}`}>
                  <img
                    src={p.imageUrl}
                    alt=''
                    className='w-24 aspect-[3/4] rounded-md object-cover'
                  />
                </Link>
                <div className='grow p-4'>
                  <div className='font-semibold'>{p.title}</div>
                  <p>{p.brand}</p>

                  <p className='my-2 font-bold'>$ {p.price}</p>

                  <p className='text-gray-500'>
                    Ordered on {new Date(o.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
export default Odrers;
