import { SessionUserDto } from "../../../application/modules/security/dtos/SessionUserDto";
import { applicationAuditRepository } from "../shared/container";
import BaseController, {
  RequestBase,
  Response,
  NextFunction,
} from "../shared/BaseController";
import {
  createTaskUseCase,
  deleteTaskUseCase,
  getTaskByIdUseCase,
  getTasksByUserUseCase,
  updateTaskUseCase,
} from "./conteiner";
import { TaskDetailDto } from "../../../application/modules/task/dtos/TaskDetailDto";

export class TaskController extends BaseController {
  constructor() {
    super(applicationAuditRepository);
    this.initializeRoutes();
  }

  getTasksByUser = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const session = request.session as SessionUserDto;
      this.handleResult(
        response,
        await getTasksByUserUseCase.execute(session, this.getClientAudit(request))
      );
    } catch (error) {
      next(error);
    }
  };

  getTaskById = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const session = request.session as SessionUserDto;
      const taskId = request.params.id;
      this.handleResult(
        response,
        await getTaskByIdUseCase.execute(
          taskId,
          session,
          this.getClientAudit(request)
        )
      );
    } catch (error) {
      next(error);
    }
  };

  create = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const session = request.session as SessionUserDto;
      const taskDto = request.body as TaskDetailDto;
      this.handleResult(
        response,
        await createTaskUseCase.execute(
          taskDto,
          session,
          this.getClientAudit(request)
        )
      );
    } catch (error) {
      next(error);
    }
  };

  update = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const session = request.session as SessionUserDto;
      const taskId = request.params?.id;
      const taskDto = request.body as TaskDetailDto;
      taskDto.id = taskId;

      this.handleResult(
        response,
        await updateTaskUseCase.execute(
          taskDto,
          session,
          this.getClientAudit(request)
        )
      );
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    request: RequestBase,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const session = request.session as SessionUserDto;
      const taskId = request.params.id;
      this.handleResult(
        response,
        await deleteTaskUseCase.execute(
          taskId,
          this.getClientAudit(request)
        )
      );
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.get("/v1/tasks", [this.checkUserSession, this.getTasksByUser]);
    this.router.get("/v1/tasks/:id", [this.checkUserSession, this.getTaskById]);
    this.router.post("/v1/tasks", [this.checkUserSession, this.create]);
    this.router.put("/v1/tasks/:id", [this.checkUserSession, this.update]);
    this.router.delete("/v1/tasks/:id", [this.checkUserSession, this.delete]);
  }
}

export default new TaskController();;
