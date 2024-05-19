import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { NavBar } from './nav';
import { AdminSidebar } from './sidebar';
import { updatePassword } from '../../sevices/login.services';
import { updateAdminProfileSuccess, updateAdminProfileFailure } from '../admin/redux/actions/profileAdminActions'

export function ProfileAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewPassword('');
  };

  const handleChangePassword = async () => {
    try {
      const userId=localStorage.getItem('userId');
      const confirmChange = window.confirm('Вы уверены, что хотите сменить свой пароль?');
      if (confirmChange) {
        const response = await updatePassword(userId, newPassword);
        console.log(response.message);
        dispatch(updateAdminProfileSuccess(response.data));
        handleClose();
      }
    } catch (error) {
      console.error('Ошибка при обновлении пароля:', error);
      dispatch(updateAdminProfileFailure(error));
    }
  };


  return (
    <>
      <NavBar />
      <AdminSidebar />

      <div className="container mt-4 mb-5 p-5">
        <h1 className="mb-5">Мои данные(админ) </h1>
        <div className="card shadow border-0 rounded mb-5 p-5">
          <div className="row">
            <div className="col-md-6 mb-5">
              <h5 className="card-subtitle mb-2 text-muted">Имя</h5>
              <p className="card-text">{localStorage.getItem('username')}</p>
            </div>
            <div className="col-md-6">
              <h5 className="card-subtitle mb-2 text-muted">Почта</h5>
              <p className="card-text">{localStorage.getItem('email')}</p>
            </div>
          </div>
          <div className="col"></div>
          <Button variant="primary" onClick={handleShow}>
          Изменить пароль
          </Button>
        </div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Изменить пароль</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Новый пароль:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
            />
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Показать пароль
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Закрыть
            </Button>
            <Button variant="primary" onClick={handleChangePassword}>
              Сохранить изменения
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
