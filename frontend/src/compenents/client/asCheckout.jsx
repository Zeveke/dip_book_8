import { getRoomByID, updateRoom2 } from "../../sevices/room.services";
import { addBooking } from "../../sevices/booking.services";
import Swal from "sweetalert2";

export async function fetchRoomDetails(id, setRoom) {
  try {
    console.log("Получение сведений о номере для roomId:", id);
    const response = await getRoomByID(id);
    setRoom(response.data);
  } catch (error) {
    console.error("Ошибка при получении сведений о номере:", error);
  }
}

export async function addCurrentBooking(
  roomId,
  bookingId,
  userId,
  fromdate,
  todate,
  status
) {
  try {
    const response = await getRoomByID(roomId);
    const room = response.data;
    console.log(bookingId);

    room.currentbookings.push({
      bookingId: bookingId,
      fromdate: fromdate,
      todate: todate,
      userId: userId,
      status: status,
    });

    await updateRoom2(roomId, room);
    console.log(room);
  } catch (error) {
    console.error(
      "Ошибка при обновлении номера при новом бронировании:",
      error
    );
  }
}

export async function onToken(
  token,
  room,
  fromdate,
  todate,
  totaldays,
  navigate
) {
  try {
    const userId = await localStorage.getItem("userId");
    console.log("User ID:", userId);
    console.log("Room ID:", room._id);

    if (!room) {
      console.error("Ошибка: Информация о номере недоступна");
      return;
    }

    const bookingDetails = {
      room: room._id,
      user: userId,
      fromdate: fromdate,
      todate: todate,
      totalamount: totaldays * room.rentperday,
      totaldays: totaldays,
      transactionId: token.id,
      token: token,
    };

    const response = await addBooking(bookingDetails);
    const bookingId = response.data._id;
    const status = response.data.status;
    console.log("Ответ на бронирование:", response.data);
    await addCurrentBooking(
      room._id,
      bookingId,
      userId,
      fromdate,
      todate,
      status
    );

    Swal.fire(
      "Поздравляем!",
      "Ваш номер успешно забронирован!",
      "success"
    ).then(() => {
      navigate("/contact");
    });
  } catch (error) {
    console.error("Ошибка при бронировании номера:", error);
    Swal.fire("Sorry", "Что-то пошло не так", "error");
  }
}
