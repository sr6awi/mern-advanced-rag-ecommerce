// Returns selected user fields only
exports.sanitizeUser = (user) => ({
    _id: user._id,
    email: user.email,
    isVerified: user.isVerified,
    isAdmin: user.isAdmin,
  });
  