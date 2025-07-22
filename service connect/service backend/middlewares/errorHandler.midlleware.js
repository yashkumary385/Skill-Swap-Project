export const errorHandler = (error,req,res,next)=>{
    console.log(error.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode // “If the status code is still 200, we must be in an error, so change it to 500.”
//Otherwise, keep the current res.statusCode.

  res.status(statusCode).json({
    message: error.message || 'Internal Server Error',
    // stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;



    
