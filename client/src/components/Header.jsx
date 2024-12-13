import { Button, Navbar } from 'flowbite-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const Header = () => {
  const {
    state: { user },
    dispatch,
  } = useApp();

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <Navbar
      fluid
      rounded
      className='w-[90%] mx-auto py-4 px-0 container max-w-[1400px]'
    >
      <Link to='/'>
        <Logo />
      </Link>

      <div className='flex gap-2 md:order-2'>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search for t-shirts'
          className='hidden md:visible border border-blue-300 rounded-md outline-none'
        />

        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link
            className='bg-blue-700 text-white p-2 px-6 rounded-md'
            to='/login'
          >
            Login
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse color='blue'>
        <Link to='/'>Home</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/orders'>Orders</Link>
        <Link to='/admin'>Admin</Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
