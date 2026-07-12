import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Units from './Units/Units';
import UnitBooking from './Unit Booking/UnitBooking';
import BoardroomBooking from './Boardroom Booking/BoardroomBooking';
import Success from './Unit Booking/Success';
import Amenities from './Amenities/Amenities';
import Authentication from './Admin/Authentication';
import RateLimitError from './Errors/RateLimitError';
import { useRateLimit } from './Errors/RateLimitContext';
import axios from 'axios';
import Home from './Home/Home';

const routes = [
  { path: "/", element: <Home /> },
  { path: "/units", element: <Units /> },
  { path: "/units/:unitID", element: <UnitBooking /> },
  { path: "/units/boardroom/:boardroomID", element: <BoardroomBooking /> },
  { path: "/amenities", element: <Amenities /> },
  { path: "/paymentSuccess", element: <Success /> },
  { path: "/admin", element: <Authentication /> }
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

function App() {

  const {rateLimitError, setRateLimitError} = useRateLimit();
  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.data === "Rate limit exceeded") {
          setRateLimitError(true);
        }
        return Promise.reject(error);
      }
    );  
  }, []);

  return (
    <>
      <div className="decommissioned-banner">
        This app has been decommissioned, some features may not be available
      </div>
      <Router>
        <ScrollToTop/>
        <Routes>
          {routes.map(route => (<Route key={route.path} path={route.path} element={rateLimitError ? <RateLimitError/> : route.element} />))}
        </Routes>
      </Router>
    </>
  )
}

export default App;
