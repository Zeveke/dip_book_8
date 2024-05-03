const Booking = require("../models/booking");
const Room = require("../models/room");

async function findBookings() {
  return await Booking.find();
}

async function findBookingById(idB) {
  return await Booking.findById(idB);
}

async function findBookingsByUserId(userId) {
  return await Booking.find({ user: userId });
}

async function findBookingByQuery(query) {
  return await Booking.find({ status: { $regex: query, $options: "i" } });
}

async function saveBooking(b) {
  console.log(b);
  return await Booking.create(b);
}

async function removeBookingById(idB) {
  try {
    const booking = await Booking.findById(idB);
    if (!booking) {
      return { success: false, message: "Бронирование не найдено." };
    }
    if (booking.status !== "booked") {
      return await Booking.findByIdAndDelete(idB);
    } else {
      throw new Error("Бронирование активировано и не может быть удалено");
    }
  } catch (error) {
    return {
      success: false,
      message: "Ошибка при удалении бронирования.",
      error: error.message,
    };
  }
}
async function editBooking(idB, b) {
  return await Booking.findByIdAndUpdate(idB, b);
}

async function removeBookingFromCurrentBookings(roomId, bookingId) {
  await Room.findByIdAndUpdate(roomId, {
    $pull: { currentbookings: { bookingId: bookingId } },
  });
}

module.exports = {
  findBookings,
  removeBookingFromCurrentBookings,
  findBookingsByUserId,
  findBookingById,
  findBookingByQuery,
  saveBooking,
  removeBookingById,
  editBooking,
};
