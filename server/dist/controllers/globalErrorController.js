import AppError from '../helpers/appError.js';
const sendError = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        console.log(err);
        console.log(err.stack);
        console.log(err.message);
        res.status(err.statusCode || 500).json({
            status: err.status,
            error: err,
            message: err.message,
        });
    }
};
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 404);
};
const handleDuplicateFieldErrorDB = (err) => {
    const productName = err.keyValue.email;
    const userEmail = err.keyValue.email;
    let message = '';
    if (productName)
        message = `The product under the name ${productName} already exists`;
    if (userEmail)
        message = `The user under the email ${userEmail} already exists`;
    return new AppError(message, 404);
};
const handleValidatorErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data: ${errors.join('. ')}`;
    return new AppError(message, 404);
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    let error = Object.assign({}, err);
    // MONGO DB ERRORS
    // 1. Cast error
    if (err.name === 'CastError')
        error = handleCastErrorDB(error);
    // 2. Tour name already exist
    if (err.code === 11000)
        error = handleDuplicateFieldErrorDB(error);
    // 3. Didn't specify all fields
    if (err.name === 'ValidationError')
        error = handleValidatorErrorDB(error);
    sendError(res, error);
};
export default globalErrorHandler;
