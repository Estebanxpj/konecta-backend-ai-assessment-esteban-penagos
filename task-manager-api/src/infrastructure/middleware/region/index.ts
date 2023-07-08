import resources from "../../../application/shared/locals/errorMessages";
import { NextFunction, Request, Response } from "../../server/CoreServer";
import config from "../../server/ConfigResources";

export class RegionMiddleware {
  handler(req: Request, res: Response, next: NextFunction): void {
    const clientLanguages: string = req.headers["accept-language"];

    const acceptedLanguage: string =
      config.region.appSupportedLanguages.find((language) =>
        clientLanguages?.includes(language)
      ) || config.region.defaultLanguage;

    resources.init(acceptedLanguage);

    return next();
  }
}

export default new RegionMiddleware();
