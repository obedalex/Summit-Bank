const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { uploadToCloudinary } = require("../../utils/uploadToCloudinary");

// ==========================
// GET USER PROFILE
// ==========================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -withdrawPin");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// UPDATE BASIC PROFILE
// ==========================
const updateProfile = async (req, res) => {
  try {
    const { fullname, phone } = req.body;

    // build update object
    const updateData = {};

    if (fullname) updateData.fullname = fullname;
    if (phone) updateData.phone = phone;

    // If image uploaded → upload to Cloudinary
    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer, "profile_images");
      updateData.profileImage = upload.secure_url;
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select("-password -withdrawPin");

    res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==========================
// CHANGE PASSWORD
// ==========================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    
    const user = await User.findById(req.user.id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "Old password incorrect" });

    const hashedNew = await bcrypt.hash(newPassword, 10);

    user.password = hashedNew;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// UPDATE PROFILE IMAGE
// ==========================
const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
 
    // Upload to cloudinary
    const upload = await uploadToCloudinary(req.file.buffer, "profile_images");

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },             // match user
      { $set: { profileImage: upload.secure_url } }, // update only profileImage
      {
        new: true,                      // return updated doc
        upsert: true,                   // create doc if doesn't exist
        setDefaultsOnInsert: true       // apply schema defaults if new
      }
    ).select("-password");

    return res.json({
      message: "Profile image updated",
      user,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  updateProfileImage
};
