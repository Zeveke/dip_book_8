import React, { useState } from 'react';
import '../../main.css';
import { useNavigate } from 'react-router-dom';
import { addUser, userLogin } from '../../sevices/login.services';

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

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

  async function handleForm(event) {
    event.preventDefault();

    if (!validateEmail(email)) {
      window.alert("Пожалуйста, введите корректный email");
      return;
    }
    const user = { "name": name, "email": email, "password": password };
    try {
      if (!validatePassword(password)) {
        return;
      }
      
      await addUser(user);
      const response = await userLogin({ "email": email, "password": password });
      const { userId, token, username } = response.data;
      
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      window.alert("Пользователь успешно добавлен !");
      navigate("/home");
    } catch (error) {
      window.alert("Произошла ошибка при добавлении пользователя.");
    }
  }

  return (
    <section id="signup-form">
      <div className="auth--wrapper">
        <div className="form-wrapper">
          <div className="form-card">
            <h2>Регистрация</h2>
            <form action="" method="post" className="form">
              <div className="part part-3">
                <div className="form-group">
                  <label htmlFor="username">Имя</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Введите имя"
                    className="form-control"
                    value={name} onChange={(e) => { setName(e.target.value) }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Почта</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Введите почту"
                    className="form-control"
                    value={email} onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    className="form-control"
                    value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <div className="form-group">
                  <button type="submit" onClick={(e) => handleForm(e)} name="login-user" className="btn">
                    Регистрация
                  </button>

                </div>
              </div>
              <div className="alternate-auth">
                <span>
                  У вас уже есть учетная запись?
                  <a href="/login">&nbsp;Логин</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};


