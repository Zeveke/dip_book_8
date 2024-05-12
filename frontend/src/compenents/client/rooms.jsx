import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from 'react-redux'; 
import { getRooms } from "../../sevices/room.services";
import { 
  fetchDateRoomRequest,   
  fetchDateRoomFailure,
  FETCH_DATE_ROOM_REQUEST,
  FETCH_DATE_ROOM_FAILURE,  

} from './redux/actions/roomActions';

export function Rooms() {
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState([]);
  const query = "";

  const fetchRooms = useCallback(async () => {
    try {
      const res = await getRooms(query);
      setRooms(res.data);
      console.log("Данные из базы данных:", res.data);
      
      dispatch(fetchDateRoomRequest(FETCH_DATE_ROOM_REQUEST));
    } catch (error) {
      dispatch(fetchDateRoomFailure(FETCH_DATE_ROOM_FAILURE));
      console.error("Ошибка при выборе комнат:", error);
    }
  }, [dispatch, query]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <section className="gallery py-5">
      <div className="container">
        <h3 className="text-center mb-4">
          <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted" href="/reservation">
          Свободные номера
          </a>
        </h3>
        <div className="gallery-grid">
        {rooms.map((room) => (
           <div key={room._id}  className="img-holder position-relative overflow-hidden">
           <img src={`${process.env.REACT_APP_API_HOST}${room.image[0]}`} className="img-fluid h-100 w-100 " alt="" />

           <div className="info">
              
               <p className="text-white">{room.rentperday} Руб/Сутки</p>
               <div className="d-flex mb-2 justify-content-start align-items-center hotel-icons text-white">
                   <span className="d-inline-block me-3">
                       <i className="fa fa-bed"></i> {room.type}
                   </span>
                   <span className="d-inline-block me-3">
                       <i className="fa fa-users"></i> {room.maxcount}
                   </span>
               </div>
               <a href="reservation" className="btn btn-light btn-sm mt-4">
               Закажите прямо сейчас
               </a>
           </div>
       </div>
        ))}
                
            </div>
      </div>
    </section>
  );
}
