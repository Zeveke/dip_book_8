import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import '../../dash.css';

export function AdminSidebar(){
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogoutClick = async () => {
    await localStorage.removeItem("jwtToken");
    await localStorage.removeItem("userId");
    await localStorage.removeItem("username");  
    await localStorage.removeItem("email");
    await localStorage.removeItem("isAdmin");
    console.log("logout....")
    navigate("/register");
  }

  return (
    <nav id="navbar">
      <ul className="navbar-items flexbox-col">
        
        <li className={`navbar-item flexbox-left ${location.pathname === '/admin/dashboard' ? 'isActive' : ''}`}>
          <a className="navbar-item-inner flexbox-left" href='/admin/dashboard'>
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <i className="fas fa-tachometer-alt white"></i>
            </div>
            <span className="link-text">Панель статистики</span>
          </a>
        </li>

       
        <li className={`navbar-item flexbox-left ${location.pathname === '/admin/allrooms' ? 'isActive' : ''}`}>
          <a className="navbar-item-inner flexbox-left" href='/admin/allrooms'>
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <i className="fas fa-bed white"></i>
            </div>
            <span className="link-text">Лист номеров</span>
          </a>
        </li>

       
        <li className={`navbar-item flexbox-left ${location.pathname === '/admin/allbookings' ? 'isActive' : ''}`}>
          <a className="navbar-item-inner flexbox-left" href='/admin/allbookings'>
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <i className="fas fa-calendar-check white"></i>
            </div>
            <span className="link-text">Лист брони</span>
          </a>
        </li>

       
        <li className={`navbar-item flexbox-left ${location.pathname === '/reservation' ? 'isActive' : ''}`}>
          <a className="navbar-item-inner flexbox-left" href='/reservation'>
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <i className="fas fa-globe white"></i>
            </div>
            <span className="link-text">Тест брони и дат</span>
          </a>
        </li>

        
        <li className={`navbar-item flexbox-left ${location.pathname === '/admin/allusers' ? 'isActive' : ''}`}>
          <a className="navbar-item-inner flexbox-left" href='/admin/allusers'>
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <i className="fas fa-users white"></i>
            </div>
            <span className="link-text">Пользователи</span>
          </a>
        </li>
        
        <li className={`navbar-item flexbox-left ${location.pathname === '/admin/profileadmin' ? 'isActive' : ''}`}>
          <a className="navbar-item-inner flexbox-left" href='/admin/profileadmin'>
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <i className="fas fa-user white"></i>
            </div>
            <span className="link-text">Твой профиль</span>
          </a>
        </li>

        
        <li className="navbar-item flexbox-left">
          <button className="navbar-item-inner flexbox-left" onClick={handleLogoutClick}>
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <i className="fas fa-sign-out-alt white"></i>
            </div>
            <span className="link-text">Добавить админа</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}