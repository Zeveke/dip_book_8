const express = require("express");

const bookingController = require("../controllers_server/bookings.controllers");
const router = express.Router();

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.addBooking);

router
  .route("/:id")
  .get(bookingController.getBookingById)
  .delete(bookingController.deleteBookingById)
  .patch(bookingController.updateBooking);

router.route("/user/:userId").get(bookingController.getUserBookings);

router.route("/:id/cancel").patch(bookingController.cancelBooking);

module.exports = router;
