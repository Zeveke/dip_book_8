const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://mark:Qwe123@cluster0.psy5rzx.mongodb.net/puper2?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Не удалось установить соединение с MongoDB");
});

connection.on("connected", () => {
  console.log("MongoDB успешно подключился");
});

module.exports = connection;
