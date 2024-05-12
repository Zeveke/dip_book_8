import React, { useEffect, useState } from 'react';
import { getRooms } from '../../sevices/room.services';

export function Gallery() {

    const [rooms, setRooms] = useState([]);
  const query=''

  useEffect(() => {
      fetchRooms();
    }, [query]);
  
    async function fetchRooms() {
      try {
        const res = await getRooms(query);
        setRooms(res.data);
        console.log("Данные из базы данных:", res.data);
      } catch (error) {
        console.error("Ошибка при выборе комнат:", error);
      }
    }

  return (
    <>
      <section className="gallery">
        <div className="container">
          <h3 className="mb-4">
            <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted" href='/reservation'>
              Галерея


              
            </a>
          </h3>
          <div className="gallery-grid">

          {rooms.map((room) => (
            <div  key={room._id} className="img-holder position-relative overflow-hidden">
            <img src={`${process.env.REACT_APP_API_HOST}${room.image[0]}`} className="img-fluid h-100 w-100 " alt="" />

            <div className="info">
                <h5 className="text-white mt-2" >{room.name}</h5>
  
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
