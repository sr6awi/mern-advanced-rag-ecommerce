const AddressModel = require("../models/Address");

// Create a new address entry
exports.addAddress = async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    // Always set user to current user!
    const address = new AddressModel({
      ...req.body,
      user: userId
    });

    await address.save();
    res.status(201).json(address);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add address. Please try again." });
  }
};


// Fetch all addresses linked to a user
exports.getUserAddresses = async (req, res) => {
  try {
    const { id } = req.params;
    const addressList = await AddressModel.find({ user: id });
    res.status(200).json(addressList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not retrieve addresses. Try later." });
  }
};

// Update address by ID
exports.modifyAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = await AddressModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAddress);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Address update failed." });
  }
};

// Delete address by ID
exports.removeAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await AddressModel.findByIdAndDelete(id);
    res.status(200).json(deletedAddress);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to delete address." });
  }
};
