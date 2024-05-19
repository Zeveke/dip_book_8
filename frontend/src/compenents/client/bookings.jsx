import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookingsRequest, cancelBookingRequest } from '../redux/actions/bookingActions'
import { Divider, Space, Tag } from 'antd';
import Button from '../Button';

export function Bookings() {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(state => state.booking);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBookingsRequest(userId));
    }
  }, [dispatch, userId]);

  const handleCancelBooking = (bookingId) => {
    dispatch(cancelBookingRequest(bookingId, userId));
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Бронирования пользователя</h4>
      <Space direction="vertical" style={{ width: '100%' }}>
        {bookings.map((booking) => (
          <div key={booking._id} className="card shadow rounded mb-4">
            <div className="card-body">
              <h5 className="card-title">{booking.room.name}</h5>
              <p>
                <strong>Номер бронирования:</strong> {booking._id}
              </p>
              <p>
                <strong>Заезд:</strong> {booking.fromdate}
              </p>
              <p>
                <strong>Выезд:</strong> {booking.todate}
              </p>
              <p>
                <strong>Общая сумма:</strong> {booking.totalamount} руб
              </p>
              <p>
                <strong>Статус: </strong>
                {booking.status === 'booked' ? (
                  <Tag color="green">Подтверждено</Tag>
                ) : (
                  <Tag color="red">Отменено</Tag>
                )}
              </p>
            </div>
            {booking.status !== 'canceled' && (
              <div className="text-right mr-4 mb-4">
                <Button
                  className="btn btn-danger"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Отменить бронирование
                </Button>
              </div>
            )}
          </div>
        ))}
      </Space>
      <Divider />
    </div>
  );
}