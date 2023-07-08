import * as statusCodes from "../../../application/shared/settings/httpStatusCodes.json";
import { ApplicationError } from "../../../application/shared/errors/ApplicationError";
import { NextFunction, Response } from "../../server/CoreServer";
import resources, {
  resourceKeys,
} from "../../../application/shared/locals/errorMessages";
import { RequestBase } from "../../server/RequestBase";
import Jwt from "../../security/jwt";
import config from "../../server/ConfigResources";

const TOKEN_PARTS = 2;
const TOKEN_VALUE_POSITION = 1;

const PATH_WHITE_LIST = [
  `${config.server.root}/ping`,
  `${config.server.root}/v1/authorize`,
];

export class AuthorizationMiddleware {
  async handler(
    req: RequestBase,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (PATH_WHITE_LIST.some((path) => path === req.path)) {
        return next();
      }

      const auth: string = req.headers.authorization?.toString() ?? "";

      const parts = auth.split(/\s+/);
      if (parts?.length !== TOKEN_PARTS) {
        throw new ApplicationError(
          resources.get(resourceKeys.AUTHORIZATION_REQUIRED),
          statusCodes.UNAUTHORIZED,
          null
        );
      }

      const token = parts[TOKEN_VALUE_POSITION];
      const session = Jwt.verify(token)?.session;

      if (!session) {
        throw new ApplicationError(
          resources.get(resourceKeys.AUTHORIZATION_REQUIRED),
          statusCodes.UNAUTHORIZED,
          null
        );
      }

      req.session = session;
    } catch (error) {
      throw new ApplicationError(
        resources.get(resourceKeys.AUTHORIZATION_REQUIRED),
        statusCodes.UNAUTHORIZED,
        null
      );
    }

    return next();
  }
}

export default new AuthorizationMiddleware();
