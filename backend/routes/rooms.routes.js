const express = require("express");

const roomController = require("../controllers_server/rooms.controllers");

const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/Users/markz/Downloads/dip_book8/dip_book8/backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(upload.array("roomImages", 5), roomController.addRoom);

router
  .route("/:id")
  .get(roomController.getRoomById)
  .delete(roomController.deleteRoomById)
  .put(upload.array("roomImages"), roomController.updateRoom)
  .patch(roomController.updateRoomWithBooking);

module.exports = router;
