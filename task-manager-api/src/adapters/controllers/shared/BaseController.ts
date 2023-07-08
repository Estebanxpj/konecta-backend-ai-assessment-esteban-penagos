import { IAuditApplication } from "../../../application/modules/audit/contracts/IAuditApplication";
import * as applicationStatus from "../../../application/shared/settings/httpStatusCodes.json";
import { SessionUserDto } from "../../../application/modules/security/dtos/SessionUserDto";
import { CipherDataDto } from "../../../application/modules/security/dtos/CipherDataDto";
import { ClientAuditDto } from "../../../application/modules/audit/dtos/ClientAuditDto";
import { SessionDto } from "../../../application/modules/security/dtos/SessionDto";
import { AuditApplication } from "../../../domain/audit/AuditApplication";
import { RequestBase } from "../../../infrastructure/server/RequestBase";
import Cipher from "../../../application/shared/utils/Cipher";
import HttpResponse from "./httpResponse/HttpResponse";
import resources, {
  resourceKeys,
} from "../../../application/shared/locals/errorMessages";
import {
  Response,
  NextFunction,
  Router,
  RouterType,
} from "../../../infrastructure/server/CoreServer";
import { IResult, ResultT } from "result-tsk";

export { RequestBase } from "../../../infrastructure/server/RequestBase";
export {
  Response,
  NextFunction,
} from "../../../infrastructure/server/CoreServer";

export default class BaseController {
  public router: RouterType;

  constructor(private readonly auditApplication: IAuditApplication) {
    this.router = Router();
  }

  handleResult(response: Response, result: IResult): void {
    if (result.getMetadata()) {
      this.auditApplication.createLog(
        result.getMetadata() as AuditApplication
      );
    }
    response
      .status(result.statusCode as number)
      .json(HttpResponse.createResponse(result));
  }

  decryptData<T>(request: RequestBase): T {
    try {
      const encryptRequest = new CipherDataDto(
        request.body.data,
        request.body.key
      );
      return JSON.parse(
        Cipher.decrypt(encryptRequest.data, encryptRequest.key)
      ) as T;
    } catch (error) {
      return request.body as T;
    }
  }

  checkUserSession = (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): void => {
    const session = request.session as SessionUserDto;
    if (!session?.userId) {
      const result = new ResultT<string>();
      result.setError(
        resources.get(resourceKeys.AUTHORIZATION_REQUIRED),
        applicationStatus.UNAUTHORIZED
      );
      return this.handleResult(response, result);
    } else {
      return next();
    }
  };

  checkSession = (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): void => {
    const session = request.session as SessionDto;
    if (!session?.domain) {
      const result = new ResultT<string>();
      result.setError(
        resources.get(resourceKeys.AUTHORIZATION_REQUIRED),
        applicationStatus.UNAUTHORIZED
      );
      return this.handleResult(response, result);
    } else {
      return next();
    }
  };

  getClientAudit(req: RequestBase): ClientAuditDto {
    return JSON.parse(req?.headers["clientInfo"]?.toString() ?? "");
  }
}
