const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {type: String,required: true},
    maxcount: {type: Number,required: true},
    phoneNumber: {type: Number,required: true},
    rentperday: {type: Number,required: true},
    image: [],
    currentbookings: [],
    type: {type: String,required: true},
    description: {type: String,required: true},
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;


