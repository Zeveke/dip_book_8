const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    maxcount: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    rentperday: { type: Number, required: true },
    image: { type: [String], required: true },
    currentbookings: [{ type: mongoose.Schema.Types.ObjectId }],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;




