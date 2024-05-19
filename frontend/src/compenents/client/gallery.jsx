import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsSuccess, fetchRoomsFailure } from '../redux/actions/galleryActions';
import { getRooms } from '../../sevices/room.services';

export function Gallery() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms);
  const error = useSelector(state => state.error);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await getRooms('');
        dispatch(fetchRoomsSuccess(res.data));
        console.log("Данные из базы данных:", res.data);
      } catch (error) {
        dispatch(fetchRoomsFailure(error));
        console.error("Ошибка при выборе комнат:", error);
      }
    }

    fetchRooms();
  }, [dispatch]); 

  return (
    <>
      <section className="gallery">
        <div className="container">
          <h3 className="mb-4">
            <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted" href='/reservation'>
              Бронируйте сейчас
            </a>
          </h3>
          <div className="gallery-grid">
            {rooms.map((room) => (
              <div key={room._id} className="img-holder position-relative overflow-hidden">
                <img src={`${process.env.REACT_APP_API_URL}${room.image[0]}`} className="img-fluid h-100 w-100 " alt="" />
                <div className="info">
                  <h5 className="text-white mt-2">{room.name}</h5>
                  <p className="text-white">{room.rentperday} руб/ночь</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
