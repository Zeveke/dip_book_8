import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { cancelBooking, deleteBookingByID, getBooking } from '../../sevices/booking.services';
import { NavBar } from './nav';
import { AdminSidebar } from './sidebar';
import { Form } from 'react-bootstrap';
import Loader from '../client/loader/Loader';
import Button from '../Button'


export function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true); 

  const fetchBookings = useCallback(async () => {
    try {
      const response = await getBooking(query);
      setBookings(response.data);
      setLoading(false); 
    } catch (error) {
      console.error('Ошибка при загрузке заказов', error);
      setLoading(false); 
    }
  }, [query]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function handleCancelBooking(bookingId) {
    try {
      await cancelBooking(bookingId);
      Swal.fire('Congrats', 'Это бронирование было успешно отменено', 'success').then(result => {
        window.location.href='/contact';
      });
    } catch (error) {
      console.error('Ошибка при бронировании номера:', error);
      Swal.fire('Oops', 'Что-то пошло не так', 'error');
    }
  }

  async function deleteBooking(id) {
    try {
      await deleteBookingByID(id);
      fetchBookings();
      Swal.fire('Благодарим!', 'Это бронирование было успешно удалено', 'success').then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Ошибка при удалении бронирования:", error);
      Swal.fire('Oops', 'Что-то пошло не так', 'error');
    }
  }

  return (
    <>
      <NavBar />
      <AdminSidebar />

      {loading ? ( 
        <Loader />
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
                    src={`${process.env.REACT_APP_API_HOST}${booking.room.image[0]}`} 
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
                       <Button onClick={(e) => handleCancelBooking(booking._id)} name="Отменить" className="btn btn-danger btn-sm" />
                      )}                      
                      <Button onClick={(e) => deleteBooking(booking._id)} name="Удалить" className="btn btn-danger btn-sm ml-3" />
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

