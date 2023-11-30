const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wizelinerSchema = new Schema(
  {
    _id:{type: String, required: true,unique:true},
    name: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true  },
    arrived: { type: Boolean, required: false },
    arrivedDateTimeUTC: { type: Date, required: false },
    createdDateTimeUTC: { type: Date, required: false },
    guid: { type: String, required: true },
  },
  { timestamps: true }
);

const Wizeliner = mongoose.model("Wizeliners", wizelinerSchema);
module.exports = Wizeliner;
