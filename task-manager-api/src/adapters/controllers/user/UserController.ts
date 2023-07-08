import { UserDto } from "../../../application/modules/user/dtos/UserDto";
import BaseController, {
  NextFunction,
  RequestBase,
  Response,
} from "../shared/BaseController";
import { applicationAuditRepository } from "../shared/container";
import { createUserUseCase } from "./container";

export class UserController extends BaseController {
  constructor() {
    super(applicationAuditRepository);
    this.initializeRoutes();
  }

  create = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userDto = request.body as UserDto;

      this.handleResult(
        response,
        await createUserUseCase.execute(userDto, this.getClientAudit(request))
      );
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes(): void {
    this.router.post("/v1/users/register", [
      this.checkSession,
      this.create,
    ]);
  }
}

export default new UserController();;
