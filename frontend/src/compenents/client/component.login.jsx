import React, { useState } from "react";
import '../../login_admin.css';
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../sevices/login.services";

export function LoginForm() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function handlForm(event) {
    event.preventDefault();
    try {
        const response = await userLogin({ "email": email, "password": password});

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
  
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const globalStyles = {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    fontFamily: 'Raleway, sans-serif',
  };
  const handleBackToHome = () => {
    navigate('/home'); 
  };

  const GoToSignUp = () => {
    navigate('/register'); 
  };
  return (
    <div style={globalStyles}>
    <button className="back-arrow m-2 custom-button" onClick={handleBackToHome}>
      <span>Домой</span>
    </button>
    <button className="back-arrow m-2 custom-button" onClick={GoToSignUp}>
      <span>Создать учетную запись админа</span>
    </button>
    <div className="container" style={containerStyles}>
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="Почта" 
               onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Пароль" 
               onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button className="button login__submit" onClick={(e) => handlForm(e)}>
              <span className="button__text">Войти</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>         
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
    </div>
  );
}
