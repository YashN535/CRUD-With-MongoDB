const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true },
  about: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  birthDate: { type: Date },
  hobbies: [String],
  interest: [String],
  profilePic: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
