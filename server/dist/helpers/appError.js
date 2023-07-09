class AppError {
    constructor(message, statusCode) {
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.statusCode = statusCode;
        this.isOperational = true;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;
