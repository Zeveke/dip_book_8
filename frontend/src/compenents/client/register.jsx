import React, { useState } from "react";
import '../../login_admin.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, userLogin } from "../../sevices/login.services";
import { registerSuccess, registerFailure } from "../../compenents/redux/actions/registerActions";
import Button from "../Button";

export function Register () {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    
    if (password.length < 8) {
      window.alert("Пароль должен содержать не менее 8 символов");
      return false;
    }

    
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      window.alert("Пароль должен содержать как минимум одну заглавную и одну строчную букву");
      return false;
    }

    
    if (!/\d/.test(password)) {
      window.alert("Пароль должен содержать как минимум одну цифру");
      return false;
    }

    
    if (!/[^a-zA-Z0-9]/.test(password)) {
      window.alert("Пароль должен содержать как минимум один спецсимвол");
      return false;
    }

    return true;
  };

  async function handlForm(event){
    event.preventDefault(); 
    const user={"name":name,"email":email,"password":password, "isAdmin": true}
    try {
      if (!validatePassword(password)) {
        return;
      }
      await addUser(user);
      const response = await userLogin({ "email": email, "password": password, "isAdmin": true });
      const { userId, token, username } = response.data;
      
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("isAdmin", true);
      window.alert("Вы - Администратор !");
      navigate("/admin/dashboard");
      window.location.reload();
      dispatch(registerSuccess(response.data));
    } catch (error) {
      window.alert("Произошла ошибка при добавлении администратора.");
      dispatch(registerFailure(error));
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

  const GoToSignIn = () => {
    navigate('/login'); 
  };

  return (
       
    <div style={globalStyles}>
    <Button className="back-arrow m-2 custom-button" onClick={handleBackToHome}>
        <span>Домой</span>
      </Button>
      <Button className="back-arrow m-2 custom-button" onClick={GoToSignIn}>
        <span>Есть аккаунт</span>
      </Button>
    <div className="container" style={containerStyles}>
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="Имя пользователя" 
              value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-envelope"></i>
              <input type="text" className="login__input" placeholder="Почта" 
              value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Пароль" 
              value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button className="button login__submit" onClick={(e) => handlForm(e)}>
              <span className="button__text">Регистрация админа</span>
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

