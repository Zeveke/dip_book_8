import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchBookingsRequest, cancelBookingRequest, deleteBookingRequest } from '../admin/redux/actions/bookingAdminActions';
import { NavBar } from './nav';
import { AdminSidebar } from './sidebar';
import { Form } from 'react-bootstrap';
import Loader from '../client/loader/loader';
import Button from '../Button';

export function BookingList() {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(state => state.booking);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBookingsRequest(query));
  }, [dispatch, query]);

  const handleCancelBooking = (bookingId) => {
    dispatch(cancelBookingRequest(bookingId))
      .then(() => {
        Swal.fire('Congrats', 'Это бронирование было успешно отменено', 'success').then(() => {
          dispatch(fetchBookingsRequest(query));
        });
      })
      .catch((error) => {
        console.error('Ошибка при бронировании номера:', error);
        Swal.fire('Oops', 'Что-то пошло не так', 'error');
      });
  };

  const handleDeleteBooking = (id) => {
    dispatch(deleteBookingRequest(id))
      .then(() => {
        Swal.fire('Благодарим!', 'Это бронирование было успешно удалено', 'success').then(() => {
          dispatch(fetchBookingsRequest(query));
        });
      })
      .catch((error) => {
        console.error("Ошибка при удалении бронирования:", error);
        Swal.fire('Oops', 'Что-то пошло не так', 'error');
      });
  };

  return (
    <>
      <NavBar />
      <AdminSidebar />
      {loading ? (
        <Loader />
      ) : error ? (
        <p>Ошибка: {error}</p>
      ) : (
        <main id="main" className="flexbox-col p-5">
          <h2 className="center mb-2 ml-5">Лист бронирования</h2>
          <Form.Control type="search" className="w-50 m-3" onChange={e => setQuery(e.target.value)} placeholder="Введите статус бронирования" />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Номер</th>
                <th>Фото</th>
                <th>Пользователь</th>
                <th>С даты</th>
                <th>До даты</th>
                <th>Общая сумма</th>
                <th>Всего дней</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{booking.room.name}</td>
                  <td><img 
                    height={100} 
                    width={100} 
                    src={`${process.env.REACT_APP_API_URL}${booking.room.image[0]}`} 
                    alt={`Изображение номера ${booking.room.name}`} 
                  /></td>
                  <td>{booking.user.name}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.totalamount}</td>
                  <td>{booking.totaldays}</td>
                  <td>{booking.status}</td>
                  <td>
                    <div>
                      {booking.status === 'booked' && (
                       <Button
                       className="btn btn-danger btn-sm"
                       onClick={() => handleCancelBooking(booking._id)}
                     >
                       Отменить
                     </Button>
                   )}
             
                   <Button
                     className="btn btn-danger btn-sm ml-3"
                     onClick={() => handleDeleteBooking(booking._id)}
                   >
                     Удалить
                   </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </>
  );
}