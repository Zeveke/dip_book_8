import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { handleUserLogin } from "../redux/actions/loginActions";
import '../../login_admin.css';
import { useNavigate } from "react-router-dom";
import Button from "../Button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);

  const handleForm = (event) => {
    event.preventDefault();
    dispatch(handleUserLogin({ email, password }, navigate));
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  const goToSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="global-styles">
      <Button className="back-arrow m-2 custom-button" onClick={handleBackToHome}>
        <span>Домой</span>
      </Button>
      <Button className="back-arrow m-2 custom-button" onClick={goToSignUp}>
        <span>Создать учетную запись админа</span>
      </Button>
      <div className="container container-styles">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input type="text" className="login__input" placeholder="Почта"
                  onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input type="password" className="login__input" placeholder="Пароль"
                  onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button className="button login__submit" onClick={(e) => handleForm(e)}>
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
