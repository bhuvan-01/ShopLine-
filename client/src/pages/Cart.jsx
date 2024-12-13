import { Button } from 'flowbite-react';
import { useApp } from '../hooks/useApp';
import { createOrder } from '../services/lib/product';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Cart = () => {
  const {
    state: { user, cart },
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('Please login!');
      navigate('/login');
    }
  }, [navigate, user]);

  const total = cart.reduce((sum, prod) => (sum += prod.price), 0);

  const handleOrderSubmit = async () => {
    try {
      const res = await createOrder({ products: cart });

      // console.log(res);

      if (res.status === 201) {
        toast.success('Order processed successfully!');
        navigate('/orders');
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className='container-max'>
      <h1 className='my-8 text-2xl font-semibold'>Cart</h1>

      <div className='flex gap-48 justify-between'>
        {/* cart items */}
        <ul className='basis-8/12'>
          {cart.map((p) => (
            <div className='flex my-4' key={p._id}>
              <img
                src={p.imageUrl}
                alt=''
                className='w-24 aspect-[3/4] rounded-md object-cover'
              />
              <div className='grow p-4'>
                <div className='font-semibold'>{p.title}</div>
                <p>{p.brand}</p>

                <p className='my-2 font-bold'>$ {p.price}</p>
              </div>
            </div>
          ))}
        </ul>
        {/* order checkout */}
        <div className='basis-4/12'>
          <h1 className='text-xl font-semibold border-b pb-4'>Checkout</h1>

          <div className='my-4 flex items-center justify-between'>
            <p className='font-semibold'>Total Price: </p>
            <p>$ {total}</p>
          </div>
          <div className='my-4 flex items-center justify-between'>
            <p className='font-semibold'>Discount (10%): </p>
            <p>- $ {parseFloat(total * 0.1).toFixed(2)} </p>
          </div>
          <div className='my-4 mb-8 flex items-center justify-between text-2xl'>
            <p className='font-semibold'>Grand Total: </p>
            <p className='font-bold text-blue-900'>
              $ {total - parseFloat(total * 0.1).toFixed(2)}{' '}
            </p>
          </div>

          <Button
            onClick={handleOrderSubmit}
            className='w-full my-4'
            color='blue'
          >
            Checkout Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
