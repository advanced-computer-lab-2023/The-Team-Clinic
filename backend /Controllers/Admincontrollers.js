const admin = require('../Models/Admin.js');

exports.createAdmin = async (req, res) => {
  try {
    const newadmin = new admin(req.body);
    const savedadmin = await newadmin.save();
    res.status(201).json(savedadmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAlladmin = async (req, res) => {
  try {
    const findadmin = await admin.find();
    res.status(200).json(findadmin);
  } catch (err) {
    res.status(500).json(err);
  }
};
