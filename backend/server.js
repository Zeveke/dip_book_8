const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());

const roomRouter = require("./routes/rooms.routes");
const loginRouter = require("./routes/login.routes");
const bookingRouter = require("./routes/bookings.routes");

app.use(express.json());

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/rooms", roomRouter);
app.use("/bookings", bookingRouter);
app.use("/", loginRouter);
