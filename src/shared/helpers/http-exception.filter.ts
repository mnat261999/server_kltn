import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = '';
    let errorDetails = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
      errorDetails = (exception.getResponse() as HttpException).message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      msg = 'An occured error on the server! Please try again!'
    }

    response.status(status).json({
      path: request.url,
      statusCode: status,
      msg,
      errorDetails,
      timestamp: new Date().toISOString(),
    });
  }
}