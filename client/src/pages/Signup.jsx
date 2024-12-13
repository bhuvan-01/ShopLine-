import { Button, Label, TextInput } from 'flowbite-react';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signupService } from '../services/lib/auth';
import toast from 'react-hot-toast';
import { useApp } from '../hooks/useApp';

const Signup = () => {
  const {
    state: { user },
  } = useApp();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = values;

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signupService(values);
      console.log(res);

      if (res.status === 201) {
        toast.success('Signed up successfully!');
        navigate('/login');
      }
    } catch (err) {
      console.log('Error in Login: ', err.response);
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
          <h2 className='my-2 text-lg text-gray-500'>Create an account</h2>
          {/* name */}
          <div className='my-4'>
            <Label className='my-2 block' htmlFor='name' value='Your name' />

            <TextInput
              id='name'
              name='name'
              type='text'
              placeholder='Enter the name'
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* email */}
          <div className='my-4'>
            <Label className='my-2 block' htmlFor='email' value='Your email' />

            <TextInput
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* password */}
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
            Create account
          </Button>
          <p className='my-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 hover:underline'>
              Login
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
export default Signup;
