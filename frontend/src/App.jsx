import './App.css';
import { Home } from './compenents/client/component.home'
import { Routes, Route } from 'react-router-dom';
import { Layout } from './compenents/client/component.layout.client';
import { About } from './compenents/client/component.about';
import { Rooms } from './compenents/client/component.rooms';
import { Contact } from './compenents/client/component.contact';
import { Reservation } from './compenents/client/component.reservation';
import { Checkout } from './compenents/client/component.checkout';
import { Register } from './compenents/client/component.register';
import { Dashboard } from './compenents/admin/component.dashboard';
import { LoginForm } from './compenents/client/component.login';
import { Bookings } from './compenents/client/component.bookings';
import { Profile } from './compenents/client/component.profile';
import { SignUpForm } from './compenents/admin/component.register.admin';
import { Login } from './compenents/admin/component.login.admin';
import {BookingList} from './compenents/admin/component.bookingsList';
import { RoomList } from './compenents/admin/component.roomsList';
import { UserList } from './compenents/admin/component.usersList';
import { ProfileAdmin } from './compenents/admin/component.profile';

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
        {isLoggedIn ? (
          <>
            <Route path='bookings' element={<Bookings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/reservation/checkout/:id' element={<Checkout />} />
          </>
        ) : null}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>


      {/* Admin  */}
      <Route path='admin'>
        <Route path='' element={<LoginForm />} />
        <Route path='signin' element={<LoginForm />} />
        <Route path='signup' element={<SignUpForm />} />

        {isAdmin ? (
          <>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='allbookings' element={<BookingList />} />
            <Route path='allrooms' element={<RoomList />} />
            <Route path='allusers' element={<UserList />} />
            <Route path='profileadmin' element={<ProfileAdmin />} />
          </>
        ) : null}


      </Route>
    </Routes>
  );
}


export default App;
     
