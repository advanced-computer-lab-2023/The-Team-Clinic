const Doctor = require('../Models/doccs');
const Patient = require('../Models/patients');
const Admin = require('../Models/Admin');
const Pharmacist = require('../Models/pharmacists');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Array of user models to search through
    const userTypes = [
      { model: Doctor, role: 'Doctor' },
      { model: Patient, role: 'Patient' },
      { model: Admin, role: 'Admin' },
      { model: Pharmacist, role: 'Pharmacist' }
    ];

    // Find the user by username in each model
    for (const userType of userTypes) {
      const user = await userType.model.findOne({ username: username });
      if (user) {
        // If user is found, compare the plaintext password
        if (password === user.password) {
          return res.json({
            success: true,
            message: 'Logged in successfully',
            role: userType.role
          });
        } else {
          return res.status(406).json({ success: false, message: 'Wrong password' });
        }
      }
    }
    // If no user found in any model
    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    // Handle any other errors
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};

module.exports = {
  login
};