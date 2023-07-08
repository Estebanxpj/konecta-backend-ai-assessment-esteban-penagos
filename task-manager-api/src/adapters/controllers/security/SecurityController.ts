import { CredentialsDto } from "../../../application/modules/security/dtos/CredentialsDto";
import { SessionDto } from "../../../application/modules/security/dtos/SessionDto";
import { authorizeUseCase, loginUseCase } from "./container";
import { applicationAuditRepository } from "../shared/container";
import BaseController, {
  Response,
  NextFunction,
  RequestBase,
} from "../shared/BaseController";

export class SecurityController extends BaseController {
  constructor() {
    super(applicationAuditRepository);
    this.initializeRoutes();
  }

  authorize = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const domain = request.body.domain;
      const apiKey = request.body.apiKey;

      this.handleResult(
        response,
        await authorizeUseCase.execute(apiKey, domain)
      );
    } catch (error) {
      next(error);
    }
  };

  login = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const credentials: CredentialsDto =
        this.decryptData<CredentialsDto>(request);

      const session: SessionDto = request.session as SessionDto;

      this.handleResult(
        response,
        await loginUseCase.execute(
          credentials,
          session,
          this.getClientAudit(request)
        )
      );
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes(): void {
    this.router.post("/v1/authorize", this.authorize);
    this.router.post("/v1/login", [this.checkSession, this.login]);
  }
}

export default new SecurityController();
