import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { cancelBooking, deleteBookingByID, getBooking } from '../../sevices/booking.services';
import { NavBar } from './component.nav';
import { AdminSidebar } from './component.sidebar';
import { Form } from 'react-bootstrap';
import Loader from '../client/Loader';


export function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки данных

  const fetchBookings = useCallback(async () => {
    try {
      const response = await getBooking(query);
      setBookings(response.data);
      setLoading(false); // Устанавливаем состояние загрузки в false после успешной загрузки данных
    } catch (error) {
      console.error('Ошибка при загрузке заказов', error);
      setLoading(false); // Устанавливаем состояние загрузки в false в случае ошибки
    }
  }, [query]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function handleCancelBooking(bookingId) {
    try {
      await cancelBooking(bookingId);
      Swal.fire('Congrats', 'Это бронирование было успешно отменено', 'success').then(result => {
        window.location.reload();
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

      {loading ? ( // Отображаем Loader во время загрузки данных
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
                    src={`http://217.25.90.141:3005${booking.room.image[0]}`} 
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
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Отменить
                        </button>
                      )}

                      <button className="btn btn-danger btn-sm ml-3" onClick={() => deleteBooking(booking._id)}>
                        Удалить
                      </button>
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
