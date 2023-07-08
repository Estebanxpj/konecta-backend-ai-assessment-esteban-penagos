import { ApplicationAuditRepository } from "../../../adapters/repositories/audit/ApplicationAuditRepository";
import { IApplicationError } from "../../../application/shared/errors/contracts/IApplicationError";
import HttpResponse from "../../../adapters/controllers/shared/httpResponse/HttpResponse";
import resources from "../../../application/shared/locals/errorMessages";
import { NextFunction, Response, Request } from "../../server/CoreServer";
import config from "../../server/ConfigResources"
import { Result } from "result-tsk";

export class ErrorHandlerMiddleware {
  private applicationAuditRepository: ApplicationAuditRepository;
  async handler(
    error: IApplicationError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = new Result();

    if (error?.name === "ApplicationError") {
      console.log("Controlled application error:", error.message);
      result.setError(error.message, error.errorCode);
      result.setMetadata(error.applicationAudit);
    } else {
      console.log("No controlled application error:", error);
      result.setError(
        resources.get(config.defaultError.message),
        config.defaultError.code
      );
    }

    if (res.headersSent) {
      return next(result);
    }
    if (error.applicationAudit) {
      this.applicationAuditRepository = new ApplicationAuditRepository();
      this.applicationAuditRepository.createLog(error.applicationAudit);
    }

    res
      .status(result.statusCode as number)
      .json(HttpResponse.createResponse(result));
  }
}

export default new ErrorHandlerMiddleware();
