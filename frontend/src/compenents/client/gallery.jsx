import React, { useEffect, useState } from 'react';
import { fetchRooms } from './fetchRooms';

export function Gallery() {
  const [rooms, setRooms] = useState([]);
  const query = ''; 

  useEffect(() => {
    const getRoomsData = async () => {
      try {
        const data = await fetchRooms(query);
        setRooms(data);
        console.log("Данные из базы данных:", data);
      } catch (error) {
        console.error("Ошибка при выборе комнат:", error);
      }
    };

    getRoomsData();
  }, [query]);

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