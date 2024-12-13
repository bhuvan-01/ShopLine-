import { Button, Label, TextInput } from 'flowbite-react';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { loginService } from '../services/lib/auth';
import { useApp } from '../hooks/useApp';

const Login = () => {
  const {
    state: { loading, user },
    dispatch,
  } = useApp();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = values;

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginService(values);
      console.log(res);

      if (res.status === 200) {
        toast.success('Logged in successfully!');
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data,
        });
        navigate('/');
      }
    } catch (err) {
      console.log('Error in Login: ', err.response);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='md:flex justify-center  h-screen'>
      <div className='grow md:basis-1/2 h-full flex items-center justify-center'>
        <form
          onSubmit={handleFormSubmit}
          className='w-[90%] my-8 block max-w-[480px] mx-auto'
        >
          <Logo />
          <h2 className='my-2 text-lg text-gray-500'>Login to continue</h2>
          <div className='my-4'>
            <Label className='my-2 block' htmlFor='email' value='Your email' />

            <TextInput
              id='email'
              name='email'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='my-4'>
            <Label
              className='my-2 block'
              htmlFor='password'
              value='Your password'
            />
            <TextInput
              id='password'
              name='password'
              placeholder='Enter password'
              type='password'
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button className='w-full' type='submit' color='blue'>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <p className='my-4'>
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='text-blue-500 hover:underline'>
              Create an account
            </Link>
          </p>
        </form>
      </div>
      <div className='hidden md:block md:basis-1/2'>
        <img
          className='h-full w-full block object-cover'
          src='https://images.pexels.com/photos/972887/pexels-photo-972887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
      </div>
    </div>
  );
};

export default Login;
