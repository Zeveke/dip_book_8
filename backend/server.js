const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const dbConnection = require("./db");

const roomRouter = require("./routes/rooms.routes");
const loginRouter = require("./routes/login.routes");
const bookingRouter = require("./routes/bookings.routes");

app.use(express.json());

const port = 3005;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/rooms", roomRouter);
app.use("/bookings", bookingRouter);
app.use("/", loginRouter);

app.use("/static", express.static("./build/static/"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
