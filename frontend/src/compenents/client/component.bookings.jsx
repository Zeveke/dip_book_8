import React, { useState, useEffect, useCallback } from 'react';
import { cancelBooking, getBookings } from '../../sevices/booking.services';
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';


export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchUserBookings = useCallback(async () => {
    try {
      const response = await getBookings(userId);
      setBookings(response.data);
    } catch (error) {
      console.error("Ошибка при выборке пользовательских бронирований:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserBookings();
  }, [userId, fetchUserBookings]);


  async function handleCancelBooking(bookingId) {
    try {
      await cancelBooking(bookingId);
      fetchUserBookings();
      Swal.fire('Congrats', 'Ваше бронирование было успешно отменено', 'success').then(() => {
        window.location.reload()
      });
    } catch (error) {
      console.error("Ошибка при бронировании номера:", error);
      Swal.fire('Oops', 'Что-пошло не так', 'error');
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Бронирования пользователя</h4>
      <Space direction="vertical" style={{ width: '100%' }}>
        {bookings.map((booking) => (
          <div key={booking._id} className="card shadow rounded mb-4">
            <div className="card-body">
              <h5 className="card-title">{booking.room.name}</h5>
              <p><strong>Номер бронирования:</strong> {booking._id}</p>
              <p><strong>Заезд:</strong> {booking.fromdate}</p>
              <p><strong>Выезд:</strong> {booking.todate}</p>
              <p><strong>Общая сумма:</strong> {booking.totalamount} руб</p>
              <p><strong>Статус: </strong>
                {(booking.status === 'booked') ? <Tag color="green">Подтверждено</Tag> : <Tag color="red">Отменено</Tag>}</p>
            </div>
            {booking.status !== 'canceled' && (
              <div className='text-right mr-4 mb-4'>
                <button className="btn btn-danger" onClick={() => { handleCancelBooking(booking._id) }}>Отменить бронирование</button>
              </div>
            )}
          </div>
        ))}
      </Space>
      <Divider />
    </div>
  );
}
