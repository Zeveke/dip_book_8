import React, { useState } from 'react';
import '../../main.css';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../sevices/login.services';


export function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function handlForm(event) {
    event.preventDefault();
    try {
        const response = await userLogin({ "email": email, "password": password });

        const { userId, token, username , isAdmin } = response.data;
       
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("isAdmin", isAdmin);
        console.log(userId);
        if(isAdmin)
       { window.alert("Связь с админ установлена !");  
        navigate("/admin/dashboard");
        window.location.reload();
       }
       else
       { window.alert("Успешное подключение !");  
       navigate("/reservation");
       }

    } catch (error) {
      if (error.message === "Неверный пароль") {
        window.alert("Неверный пароль. Пожалуйста, попробуйте еще раз.");
      } else if (error.message === "Пользователь не существует") {
        window.alert("Пользователь не существует. Пожалуйста, проверьте свой адрес электронной почты.");
      } else {
        window.alert("Неверный адрес электронной почты или пароль !!");}
    }

  }

  return (

<section id="auth-form">
        <div className="auth--wrapper">

          <div className="bg-image">
          </div>
          <div className="form-wrapper">
            <div className="form-card">
              <h2>Войдите в свою учетную запись</h2>
              <div className="d-none">
                Иконки сделаны с{' '}
                <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                  Freepik
                </a>{' '}
                из{' '}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </div>

              
              <form action="" method="post" className="form">
                <div className="form-group">
                  <label htmlFor="email">Почта</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Введите почту"
                    className="form-control"
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    className="form-control"
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" onClick={(e) => handlForm(e)}  name="login-user" className="btn">
                    Войти
                  </button>
                </div>

                <div className="alternate-auth">
                  <span>
                    Нет аккаунта?
                    <a href="/admin/signup">&nbsp;Регистрация</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};
