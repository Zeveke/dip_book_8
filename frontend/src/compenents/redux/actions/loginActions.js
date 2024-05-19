import { userLogin } from "../../../sevices/login.services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const userLoginSuccess = (userData) => ({
  type: USER_LOGIN_SUCCESS,
  payload: userData,
});

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const handleUserLogin = (credentials) => async (dispatch) => {
  const navigate = useNavigate(); // Get navigate function

  try {
    const response = await userLogin(credentials);
    const { userId, token, username, isAdmin } = response.data;

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("email", credentials.email);
    localStorage.setItem("isAdmin", isAdmin);

    if (isAdmin) {
      Swal.fire("Связь с админ установлена!");
      navigate("/admin/dashboard");
      window.location.reload();
    } else {
      Swal.fire("Успешное подключение!");
      navigate("/reservation");
    }

    dispatch(userLoginSuccess({ userId, token, username, isAdmin }));
  } catch (error) {
    let errorMessage = "Неверный адрес электронной почты или пароль !!";
    if (error.message === "Неверный пароль") {
      errorMessage = "Неверный пароль. Пожалуйста, попробуйте еще раз.";
    } else if (error.message === "Пользователь не существует") {
      errorMessage =
        "Пользователь не существует. Пожалуйста, проверьте свой адрес электронной почты.";
    }
    Swal.fire(errorMessage);
    dispatch(userLoginFailure(errorMessage));
  }
};
