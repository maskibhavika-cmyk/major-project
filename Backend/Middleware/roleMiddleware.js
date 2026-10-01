const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
   // req.user available nahi hai, to code error throw karne ke bajay undefined return karega ? ke liye
    console.log("User role:", req.user?.role);
console.log("Allowed roles:", allowedRoles);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission.",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;