import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { getRoom } from "../../sevices/room.services";
import { Link } from "react-router-dom";
import { Modal , Carousel } from 'react-bootstrap';  
import { DatePicker } from 'antd';
import Loader from "./loader/Loader"; 
import { 
  updateReservationRequest, 
  updateReservationSuccess, 
  updateReservationFailure,
  setReservationType,
  setReservationQuery,
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_FAILURE,
  UPDATE_RESERVATION_SUCCESS,

} from './redux/actions/ReservationAction';
import Button from "../Button";

import { fetchReservationThunk } from './redux/thunks/reservation.thunk'

const { RangePicker } = DatePicker;

export function Reservation() {  
  const [selectedRoom, setSelectedRoom] = useState(null);  
  
  const [show, setShow] = useState(false);
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [datesSelected, setDatesSelected] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const [duplicateRooms, setDuplicateRooms] = useState([]);  

  const dispatch = useDispatch();
  const { rooms, query, type } = useSelector((state) => state.reservation)
  const fetchRooms = useCallback(async () => {
    setLoading(true); 
    try {
      const res = await getRoom(query, type);      
      setDuplicateRooms(res.data);
      console.log("Данные из базы данных:", res.data);
      dispatch(updateReservationRequest(res.data, UPDATE_RESERVATION_REQUEST))
    } catch (error) {
      dispatch(updateReservationFailure(UPDATE_RESERVATION_FAILURE))
      console.error("Ошибка при выборе комнат:", error);
    } finally {
      setLoading(false); 
    }
  }, [query, type, dispatch ]);

  useEffect(() => {
   dispatch(fetchReservationThunk(query, type))
  }, [query, type, dispatch])

  console.log(type, query)

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleShow = (room) => {
    setSelectedRoom(room);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  function filterByDate(dates) {
    if (dates && dates.length === 2) { 
      const fd = dates[0].format('DD-MM-YYYY');
      const td = dates[1].format('DD-MM-YYYY');

      setFromdate(fd);
      setTodate(td);
      setDatesSelected(true); 

      var temprooms = [];
      for (const room of duplicateRooms) {
        let availability = true;

        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              (fd >= booking.fromdate && fd <= booking.todate) ||
              (td >= booking.fromdate && td <= booking.todate) ||
              (fd <= booking.fromdate && td >= booking.todate)
            ) {
              availability = false;
              break;
            }
          }
        }

        if (availability === true) {
          dispatch(updateReservationSuccess(UPDATE_RESERVATION_SUCCESS))
          temprooms.push(rooms);
        }
      }
      dispatch(updateReservationRequest(temprooms, UPDATE_RESERVATION_REQUEST))
      
    } else { 
      
      window.location.reload(); 
    }
  }

  return (
    <section className="reservation py-5">
      <div className="container">
        <div className="text-center">
          <h3 className="">
            <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted" href="/reservation">
              Бронирование
            </a>
          </h3>
          <h5>Доступные по датам номера </h5>
        </div>
        <form action="reservation">
          <div className="card shadow border-0 rounded mb-4 mt-4">
            <div className="row p-2">
              <div className="col m-3 rounded-2">
                <select className="form-control" value={type} onChange={e=>dispatch(setReservationType(e.target.value))} disabled={datesSelected}>
                  <option value="all"> Выберите количество гостей</option>
                  <option value="Single" >1 гость</option>
                  <option value="Double">до 3 гостей</option>
                  <option value="Suite">до 7 гостей</option>
                </select>
              </div>
              <div className="col m-3 rounded-2">
                <RangePicker
                  format='DD-MM-YYYY'
                  onChange={filterByDate}
                  disabledDate={(current) => current < new Date()}
                />
                <div style={{ textAlign: 'center' }}>Выберите даты</div>
              </div>
              { !datesSelected && (
                <div className="col m-3 rounded-2">
                  <input type="text" className="form-control" placeholder="Фильтр по имени номера" onChange={e=>dispatch(setReservationQuery(e.target.value))}/>
                </div>
              )}
            </div>
          </div>
        </form>

        {loading ? (
          <Loader /> 
        ) : (
          rooms.map((room) => (
            <div key={room._id} className="card bg-white rounded overflow-hidden mb-4">
              <div className="row">
                <div className="col-md-2 p-0">
                <img src={`${process.env.REACT_APP_API_HOST}${room.image[0]}`} className="img-fluid h-100 w-100 " alt="" />
                </div>
                <div className="col-md-6 p-3 m-auto">
                  <h3>{room.name}</h3>
                  <p className="text-warning">
                    <i className="fa fa-star"></i>
                    <a href="https://tophotels.ru/?%2F=" className="text-primary text-decoration-none">
                      (5 отзывов)
                    </a>
                  </p>
                  <p className="mb-0">
                    <strong>Максимальная вместимость:</strong> {room.maxcount}
                  </p>
                  <p className="mb-0">
                    <strong>Номер телефона:</strong> {room.phoneNumber}
                  </p>
                  <p className="mb-0">
                    <strong>Тип:</strong> {room.type}
                  </p>
                </div>
                <div className="col-md-3 text-end offset-md-1 p-3 m-auto">
                  <p>
                    Начиная с <span className="fw-bold text-success">{room.rentperday} руб</span>
                  </p>
                  {(fromdate && todate) && (
                    (localStorage.getItem("jwtToken")) ?
                      <Link to={`/reservation/checkout/${room._id}?fromdate=${fromdate}&todate=${todate}`} className="btn btn-success rounded-0">
                        Бронируй сейчас
                      </Link> :
                      <Link to="/login" className="btn btn-success rounded-0">
                        Бронируй немедленно
                      </Link>
                  )}                 
                  <Button onClick={() => handleShow(room)} name="Смотри подробности" className="btn btn-dark rounded-0 m-2" />    
                </div>
              </div>
            </div>
          ))
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRoom && selectedRoom.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRoom && (
              <div>
                <Carousel>
                  {selectedRoom.image.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={`${process.env.REACT_APP_API_HOST}${image}`} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <p><strong>Описание:</strong> {selectedRoom.description}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}


