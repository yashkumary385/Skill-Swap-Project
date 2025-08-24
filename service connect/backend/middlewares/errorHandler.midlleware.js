export const errorHandler = (error,res)=>{
    console.log(error.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message: error.message || 'Internal Server Error',
   
  });
};

export default errorHandler;



    
