import React from 'react';
import { Gallery } from './gallery';

export function Contact() {
  return (
    <>
      <section className="contact py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3 className="mb-4">
              <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted" href='/reservation'>
                Напишите нам
              </a>
            </h3>
            <form action="">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Имя
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ввелите ваше имя"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Почта
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Введите ваш адрес почты"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Телефон
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Введите ваш телефон"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Сообщение
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows="5"
                  placeholder="Введите ваше сообщение"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-dark">
                Отправить
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h3 className="mb-4">
              <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted" href='/reservation'>
                Локация
              </a>
            </h3>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d18590.02331129801!2d48.5868727!3d54.3790151!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1711647428050!5m2!1sru!2sru"
                title="Google Maps"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="gallery py-4">
        <div className="container">
            <div className="row">
                <div className="col-md-8 p-3">
                    <Gallery/>
                </div>
                <div className="col-md-4 p-3">
                    <h3 className="mb-4">
                        <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted" href='/reservation'>
                            Контактная информация
                        </a>
                    </h3>
                    <p className="lead">
                        Почта: <a href="mailto:m&z@gmail.com"
                            className="test-primary text-decoration-none">m&z@gmail.com</a>
                    </p>
                    <p className="lead">
                        Телефон: <a href="tel:123456789" className="test-primary text-decoration-none">123456789</a>
                    </p>
                    <p className="lead">
                        Адрес: {" "}
                        <a href="https://goo.gl/maps/4Z5Z9Z9Z9Z9Z9Z9Z9"
                            className="test-primary text-decoration-none" target="_blank" rel="noreferrer">Ульяновск, Россия</a>
                    </p>
                    <p className="lead">
                        Сайт: {" "}
                        <a href="https://www.google.com/" className="test-primary text-decoration-none"
                            target="_blank" rel="noreferrer">www.google.com</a>
                    </p>
                </div>
            </div>
        </div>
    </section>

    
    </>
  );
}
