const bookingServices = require("../services/booking.services");
const catalogServices = require("../services/catalog.services");
const userServices = require("../services/login.services");

const stripe = require("stripe")(
  "sk_test_51P5uJ1RsUds6zVFQ65abi2yLA6wHnUowEm3SIqE0jvWyCa4PuKQFdgOb1XzidY2PNtxExo2iznAep6x34PgqLx3o00pMnCmKVN"
);

async function addBooking(req, res) {
  try {
    console.log(req.body);
    const token = req.body.token;
    console.log("token :" + token.id);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    console.log(customer.email);

    if (token.id) {
      try {
        const booking = await bookingServices.saveBooking(req.body);
        res.status(201).json(booking);
      } catch (error) {
        console.error("Ошибка добавления : ", error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Сбой платежа" });
    }
  } catch (error) {
    console.error("Ошибка при создании платежа : ", error);
    res.status(500).json({ error: error.message });
  }
}

async function getAllBookings(req, res) {
  let bookingsWithRooms = [];
  try {
    console.log(req.headers);
    let bookings = [];
    if (req.query.keyword) {
      bookings = await bookingServices.findBookingByQuery(req.query.keyword);
      bookingsWithRooms = await Promise.all(
        bookings.map(async (booking) => {
          const room = await catalogServices.findRoomById(booking.room);
          const user = await userServices.findUserById(booking.user);
          return { ...booking.toObject(), room, user };
        })
      );
    } else {
      bookings = await bookingServices.findBookings();
      bookingsWithRooms = await Promise.all(
        bookings.map(async (booking) => {
          const room = await catalogServices.findRoomById(booking.room);
          const user = await userServices.findUserById(booking.user);
          return { ...booking.toObject(), room, user };
        })
      );
    }

    res.json(bookingsWithRooms);
  } catch (error) {
    res.status(500).send("Ошибка на сервере");
  }
}

async function cancelBooking(req, res) {
  const bookingId = req.params.id;

  try {
    const booking = await bookingServices.findBookingById(bookingId);
    const roomId = booking.room;
    console.log("Booking ID:", bookingId);
    console.log("Room ID:", roomId);
    await bookingServices.editBooking(bookingId, { status: "canceled" });
    await bookingServices.removeBookingFromCurrentBookings(roomId, bookingId);
    res.json({ message: "Бронирование успешно отменено." });
  } catch (error) {
    console.error("Ошибка при отмене бронирования:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getBookingById(req, res) {
  const idB = req.params.id;
  try {
    const booking = await bookingServices.findBookingById(idB);
    res.json(booking);
  } catch (error) {
    res.status(500).send("Ошибка на сервере");
  }
}

async function getUserBookings(req, res) {
  try {
    const userId = req.params.userId;
    const userBookings = await bookingServices.findBookingsByUserId(userId);

    const bookingsWithRooms = await Promise.all(
      userBookings.map(async (booking) => {
        const room = await catalogServices.findRoomById(booking.room);
        return { ...booking.toObject(), room };
      })
    );
    res.json(bookingsWithRooms);
  } catch (error) {
    console.error("Ошибка при выборке пользовательских бронирований:", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteBookingById(req, res) {
  const idB = req.params.id;
  try {
    await bookingServices.removeBookingById(idB);
    res.send("Бронирование было удалено");
  } catch (error) {
    res.status(500).send("Ошибка при удалении бронирования");
  }
}

async function updateBooking(req, res) {
  const idB = req.params.id;
  try {
    await bookingServices.editBooking(idB, req.body);
    res.send("Бронирование было изменено");
  } catch (error) {
    res.status(500).send("Ошибка при изменении бронирования");
  }
}

module.exports = {
  cancelBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  addBooking,
  deleteBookingById,
  updateBooking,
};
