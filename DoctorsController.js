const doctors = require('../Models/doctors');

exports.createNewDoc = async (req, res) => {
  try {
    const newDoc = new doctors(req.body);
    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await doctors.find();
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDoc = async (req, res) => {
  try {
      const updated = await doctors.findByIdAndUpdate(
        req.params.username,
        req.body,
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };


exports.deleteDoc = async (req, res) => {
  try {
    await doctors.findByIdAndDelete(req.params.username);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};