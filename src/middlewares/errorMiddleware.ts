import { NextFunction, Request, Response } from "express";
import errorLogger from "@n-loggers/errorLogger";
import { InternalError } from "@n-errors/HttpError";
import { ApplicationError } from "@n-errors/ApplicationError";

function errorMiddleware(
  error: ApplicationError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  errorLogger.error(
    JSON.stringify({
      body: request.body,
      path: request.path,
      query: request.query,
      message: error.message,
      stack: error.stack,
    })
  );

  const message =
    (process.env.APP_ENV == "dev" && error.stack) || error.message;
  error.message = message;
  console.log("message: ", message)
  if (error instanceof ApplicationError) {
    return response.status(error.status).send(error.toJSON());
  }
  const err = new InternalError(message);
  response.status(err.status).send(err.toJSON());
}

export default errorMiddleware;
