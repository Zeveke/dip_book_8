import './App.css';
import { Home } from './compenents/client/home'
import { Routes, Route } from 'react-router-dom';
import { Layout } from './compenents/client/layout.client';
import { About } from './compenents/client/about';
import { Rooms } from './compenents/client/rooms';
import { Contact } from './compenents/client/contact';
import { Reservation } from './compenents/client/reservation';
import { Checkout } from './compenents/client/checkout';
import { Register } from './compenents/client/register';
import { Dashboard } from './compenents/admin/dashboard';
import { Bookings } from './compenents/client/bookings';
import { Profile } from './compenents/client/profile';
import { SignUpForm } from './compenents/admin/register.admin';
import { Login } from './compenents/admin/login.admin';
import {BookingList} from './compenents/admin/bookingsList';
import { RoomList } from './compenents/admin/roomsList';
import { UserList } from './compenents/admin/usersList';
import { ProfileAdmin } from './compenents/admin/profile';
import NotFoundPage from './compenents/client/notFoundPage';


function App() {
  const isAdmin = localStorage.getItem("isAdmin")=== "true";
  const isLoggedIn = localStorage.getItem("jwtToken");
  return (
    <Routes>
      {/* Client */}
      <Route path='' element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='rooms' element={<Rooms />} />
        <Route path='reservation' element={<Reservation />} />
        <Route path='contact' element={<Contact />} />
        <Route path='*' element={<NotFoundPage />} /> {/* Страница ошибки */}
        {isLoggedIn ? (
          <>
            <Route path='bookings' element={<Bookings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/reservation/checkout/:id' element={<Checkout />} />
            <Route path='*' element={<NotFoundPage />} /> {/* Страница ошибки */}
          </>
        ) : null}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} /> {/* Страница ошибки */}
      </Route>


      {/* Admin  */}
      <Route path='admin'>     
        <Route path='signup' element={<SignUpForm />} />
        <Route path='*' element={<NotFoundPage />} /> {/* Страница ошибки */}

        {isAdmin ? (
          <>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='allbookings' element={<BookingList />} />
            <Route path='allrooms' element={<RoomList />} />
            <Route path='allusers' element={<UserList />} />
            <Route path='profileadmin' element={<ProfileAdmin />} />
            <Route path='*' element={<NotFoundPage />} /> {/* Страница ошибки */}
          </>
        ) : null}


      </Route>
    </Routes>
  );
}


export default App;

