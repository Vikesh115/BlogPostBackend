const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Server error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
  });

  console.error('Error:', err.message); // Log error details for debugging
};

module.exports = errorMiddleware;
