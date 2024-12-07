const express = require("express");
const multer = require("multer");
const path = require("path");
const Employee = require("../models/Employee");
const router = express.Router();
//Multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Create Employee

router.post("/employees", upload.single("profilePic"), async (req, res) => {
  const { name, email, phoneNo, about, gender, birthDate, hobbies, interest } =
    req.body;
  const employees = new Employee({
    name,
    email,
    phoneNo,
    about,
    gender,
    birthDate,
    hobbies,
    interest,
    profilePic: req.file ? req.file.path : null,
  });
  try {
    const savedEmployee = await employees.save();
    res.json(savedEmployee);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Read or Get Employee

router.get("/employees", async (req, res) => {
  const { name, email, phoneNo } = req.body;
  const filter = {};
  if (name) filter.name = name;
  if (email) filter.email = email;
  if (phoneNo) filter.phoneNo = phoneNo;

  try {
    const employees = await Employee.find(filter);
    res.json(employees);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Update Employee By id

router.put("/employees/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Delete Employee By Id

router.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
