const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type:mongoose.Types.ObjectId,
      ref:"Room"
  },
   user: {
      type:mongoose.Types.ObjectId,
      ref:"User"
  },
   fromdate: {type: String,required: true},
   todate: {type: String,required: true},
   totalamount: {type: Number,required: true},
   totaldays: {type: Number,required: true},
   transactionId: {type: String,required: true},
   status: {type: String,required: true,default:'booked'}
 },
 {
   timestamps: true,
 
  }
  
);

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;

