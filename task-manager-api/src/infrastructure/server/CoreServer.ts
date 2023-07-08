import * as Server from "express";

const Router = Server.Router;

export {
  Router as RouterType,
  Request,
  Response,
  NextFunction,
  Application,
  RequestHandler,
  ErrorRequestHandler,
} from "express";


export { Server, Router };