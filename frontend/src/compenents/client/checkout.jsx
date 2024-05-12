import React, { useEffect, useState } from "react";
import { getRoomByID, updateRoom2 } from "../../sevices/room.services";
import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import moment from 'moment';
import { addBooking } from "../../sevices/booking.services";
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';



export function Checkout() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromdate = searchParams.get('fromdate');
  const todate = searchParams.get('todate');
  const totaldays = moment(todate, 'DD-MM-YYYY').diff(moment(fromdate, 'DD-MM-YYYY'), 'days')+1;
  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        console.log("Получение сведений о номере для roomId:", id);
        const response = await getRoomByID(id);
        setRoom(response.data);
      } catch (error) {
        console.error("Ошибка при получении сведений о номере:", error);
      }
    }

    fetchRoomDetails();
  }, [id]);

 
  
  async function addCurrentBooking(roomId, bookingId, userId, status) {
    try {
      const response = await getRoomByID(roomId);
      const room = response.data;
      console.log(bookingId);
  
      room.currentbookings.push({
        bookingId: bookingId,
        fromdate: fromdate,
        todate: todate,
        userId: userId,
        status: status
      });
  
      await updateRoom2(roomId, room);
      console.log(room);
    } catch (error) {
      console.error('Ошибка при обновлении номера при новом бронировании:', error);
    }
  }
  
 

  async function onToken(token, roomId) {
    try {
      const userId = await localStorage.getItem("userId");
      console.log('User ID:', userId);
      console.log('Room ID:', roomId);
  
      if (!room) {
        console.error("Ошибка: Информация о номере недоступна");
        return;
      }
  
      const bookingDetails = {
        "room": roomId,
        "user": userId,
        "fromdate": fromdate,
        "todate": todate,
        "totalamount": totaldays * room.rentperday,
        "totaldays": totaldays,
        "transactionId": token.id,
        "token": token  
              };
    
      const response = await addBooking(bookingDetails);
      const bookingId = response.data._id;
      const status = response.data.status;
      console.log("Ответ на бронирование:", response.data);
      addCurrentBooking(roomId, bookingId, userId, status);

      Swal.fire('Поздравляем!', 'Ваш номер успешно забронирован!' , 'success').then(()=>{
        window.location.href='/contact'
      });
    } catch (error) {
      console.error("Ошибка при бронировании номера:", error);
      Swal.fire('Sorry', 'Что-то пошло не так', 'error');

    }
  }
  

  return (
    <div className="container mt-3 mb-5">
      {room ? (
        <div className="row bs" style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px" }}>
          <div className="col-md-6">
            <h2>{room.name}</h2>
             <Carousel>
                  {room.image.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={`${process.env.REACT_APP_API_HOST}${image}`} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
          </div>
          <div className="col-md-6">
            <div>
              <h2>Подробности бронирования</h2>
              <hr />
              <b>
                <p>Имя: {localStorage.getItem("username")}</p>
                <p>Почта: {localStorage.getItem("email")}</p>
                <p>С:  {fromdate} </p>
                <p>До:  {todate}</p>
                <p>Вместимость:  {room.maxcount} </p>
              </b>
            </div>
            <div className="mt-4">
              <b>
                <h2>Сумма</h2>
                <hr />
                <p>Всего дней: {totaldays} </p>
                <p>Арендная плата за сутки:  {room.rentperday} руб</p>
                <p>Общая сумма: {totaldays * room.rentperday} руб</p>
              </b>
            </div>
            <div className="mt-4" style={{float:'right'}}>
           
                      
            <StripeCheckout
        token={(token) => onToken(token, room._id)}
        stripeKey="pk_test_51P5uJ1RsUds6zVFQVOe9wwQP3BWXNtO0nAIFRkLI25aSRN5VHjdHkCIqbat7djS55w7SMHod5p00g2nme1KqM4A900ruoYC0Ar"
      >
            <button className="btn btn-dark">Оплатить</button>

      </StripeCheckout>
      
            </div>
          </div>
        </div>
      ) : (
        <p>Минутку...</p>
      )}
    </div>
  );
}
