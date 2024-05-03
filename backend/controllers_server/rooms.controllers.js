//const Room=require("../models/Room")
const catalogServices = require("../services/catalog.services");

async function getAllRooms(req, res) {
  try {
    console.log(req.headers);
    let rooms = [];
    if (req.query.keyword) {
      rooms = await catalogServices.findRoomByQuery(req.query.keyword);
    } else if (req.query.type) {
      console.log(req.query.type);
      rooms = await catalogServices.findRoomByType(req.query.type);
    } else {
      rooms = await catalogServices.findRooms();
    }
    res.json(rooms);
  } catch (error) {
    res.status(500).send("Ошибка на сервере");
  }
}

async function getRoomById(req, res) {
  const idR = req.params.id;
  try {
    const room = await catalogServices.findRoomById(idR);
    res.json(room);
  } catch (error) {
    res.status(500).send("Ошибка на сервере");
  }
}

async function addRoom(req, res) {
  try {
    const roomData = JSON.parse(req.body.roomData);

    const images = req.files.map((file) => `/uploads/${file.filename}`);
    roomData.image = images;
    console.log("Проверка данных о помещении:", roomData);

    await catalogServices.saveRoom(roomData);

    res.status(201).json("Получилось");
  } catch (error) {
    console.error("Ошибка добавления : ", error);
    res.status(500).send(" Ошибка добавления: " + error.message);
  }
}

async function deleteRoomById(req, res) {
  const idR = req.params.id;
  try {
    await catalogServices.removeRoomById(idR);
    res.send("Номер удалён");
  } catch (error) {
    res.status(500).send("Ошибка при удалении комнаты");
  }
}

async function updateRoom(req, res) {
  const roomId = req.params.id;
  try {
    const formData = new FormData();
    formData.append("roomData", JSON.stringify(req.body));

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    formData.append("image", images);

    console.log("FormData test:", formData);

    await catalogServices.editRoom(roomId, formData);
    res.send("Номер был хорошо изменен");
  } catch (error) {
    console.error("Ошибка при изменении номера :", error);
    res.status(500).send("Ошибка при изменении номера");
  }
}

async function updateRoomWithBooking(req, res) {
  const idR = req.params.id;
  try {
    console.log("Id Room:", idR);
    console.log("Request Body:", req.body);
    await catalogServices.editRoomWithBooking(idR, req.body);
    res.send("Текущее бронирование было изменено");
  } catch (error) {
    console.error("Ошибка в обновлении номера при бронировании:", error);
    res.status(500).send("Ошибка при изменении номера");
  }
}

module.exports = {
  getAllRooms,
  getRoomById,
  addRoom,
  updateRoomWithBooking,
  deleteRoomById,
  updateRoom,
};
