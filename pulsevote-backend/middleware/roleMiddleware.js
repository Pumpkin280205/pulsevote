const requireRole = (roleName) => {
  return (req, res, next) => {
    const hasRole = req.user?.roles?.some(role => role.role === roleName);
    if (!hasRole) {
      return res.status(403).json({ message: `Insufficient permissions: requires ${roleName} role` });
    }
    next();
  };
};

module.exports = { requireRole };