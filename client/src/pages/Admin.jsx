import { Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Admin = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = useApp();

  useEffect(() => {
    if (!user) {
      toast.error('Please login to get access!');
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className='container-max'>
      <Outlet />
    </div>
  );
};

export default Admin;
