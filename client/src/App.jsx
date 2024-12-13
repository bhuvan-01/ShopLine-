import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { useEffect } from 'react';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;
