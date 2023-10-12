const FamilyMember = require('../Models/FamilyMember');

// Create a new Health Package
exports.createFamilyMember = async (req, res) => {
  try {
    const newPackage = new FamilyMember(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Retrieve all Health Packages
exports.getAllFamilyMembers = async (req, res) => {
  try {
    const packages = await FamilyMember.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a Health Package
exports.updateFamilyMember = async (req, res) => {
  try {
    const updatedPackage = await FamilyMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a Health Package
exports.deleteFamilyMember = async (req, res) => {
  try {
    await FamilyMember.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};
