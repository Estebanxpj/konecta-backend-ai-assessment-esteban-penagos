import { Request, NextFunction, Response } from "../../server/CoreServer";

export class ClientRequestInfoMiddleware {
    handler(req: Request, res: Response, next: NextFunction): void {
  
      const clientIp = req.ip;
      const userAgent = req.headers["user-agent"];

  
      req.headers["clientInfo"] = JSON.stringify({ip: clientIp, userAgent});
  
      return next();
    }
  }
  
  export default new ClientRequestInfoMiddleware();
  