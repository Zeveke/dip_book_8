import React, { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Button from "../Button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomDetails, onToken } from '../redux/actions/checkoutActions';

export function Checkout() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { room, loading, error, bookingLoading, bookingError } = useSelector(state => state.roomDetails);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromdate = searchParams.get('fromdate');
  const todate = searchParams.get('todate');
  const totaldays = moment(todate, 'DD-MM-YYYY').diff(moment(fromdate, 'DD-MM-YYYY'), 'days') + 1;

  useEffect(() => {
    dispatch(fetchRoomDetails(id));
  }, [id, dispatch]);

  if (loading) return <p>Минутку...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container mt-3 mb-5">
      {room ? (
        <div className="row bs" style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px" }}>
          <div className="col-md-6">
            <h2>{room.name}</h2>
            <Carousel>
              {room.image.map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={`${process.env.REACT_APP_API_URL}${image}`} alt={`Slide ${index}`} />
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
                <p>С: {fromdate}</p>
                <p>До: {todate}</p>
                <p>Вместимость: {room.maxcount}</p>
              </b>
            </div>
            <div className="mt-4">
              <b>
                <h2>Сумма</h2>
                <hr />
                <p>Всего дней: {totaldays}</p>
                <p>Арендная плата за сутки: {room.rentperday} руб</p>
                <p>Общая сумма: {totaldays * room.rentperday} руб</p>
              </b>
            </div>
            <div className="mt-4" style={{ float: 'right' }}>
              {bookingLoading ? (
                <p>Идет обработка платежа...</p>
              ) : (
                <StripeCheckout
                  token={(token) => dispatch(onToken(token, room, fromdate, todate, totaldays, navigate))}
                  stripeKey="pk_test_51P5uJ1RsUds6zVFQVOe9wwQP3BWXNtO0nAIFRkLI25aSRN5VHjdHkCIqbat7djS55w7SMHod5p00g2nme1KqM4A900ruoYC0Ar"
                >
                  <Button className="btn btn-dark">
                    Оплатить
                  </Button>
                </StripeCheckout>
              )}
              {bookingError && <p>Ошибка при бронировании: {bookingError}</p>}
            </div>
          </div>
        </div>
      ) : (
        <p>Минутку...</p>
      )}
    </div>
  );
}