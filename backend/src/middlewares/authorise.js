const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message:
          "🚫 Access Denied! You need admin privileges to access this resource. 🛡️",
      });
    }
    next();
  };
  
  export default adminMiddleware;