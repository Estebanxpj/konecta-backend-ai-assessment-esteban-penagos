import { SessionUserDto } from "../../../security/dtos/SessionUserDto";
import { TaskDetailDto } from "../../dtos/TaskDetailDto";
import { Task } from "../../../../../domain/task/Task";
import {
  BaseUseCase,
  IResultT,
  IResult,
  ResultT,
  ClientAuditDto,
  AuditActions,
} from "../../../../shared/useCase/BaseUseCase";
import TaskMap from "../../common/TaskMap";
import { ITask } from "../../contracts/ITask";

export class CreateTaskUseCase extends BaseUseCase {
  constructor(private taskRepository: ITask) {
    super();
  }

  public async execute(
    taskDto: TaskDetailDto,
    session: SessionUserDto,
    clientAudit: ClientAuditDto
  ): Promise<IResultT<TaskDetailDto>> {
    const result = new ResultT<TaskDetailDto>();
    const audit = ClientAuditDto.mapToDomain(
      clientAudit,
      AuditActions.CreateTask
    );
    try {
      if (!this.validateRequest(result, taskDto)) return result;

      const task: Task = await this.taskRepository.create(
        TaskMap.mapToDomain(taskDto, session.userId)
      );

      if (!task) {
        result.setError(
          this.resources.get(this.resourceKeys.ERROR_SAVING_TASK),
          this.applicationStatus.INTERNAL_SERVER_ERROR
        );
        return result;
      }

      result.setData(
        TaskMap.mapToTaskDetailDto(task),
        this.applicationStatus.SUCCESS,
        this.resources.get(this.resourceKeys.SUCCESSFUL_PROCESS)
      );
      audit.setSuccess();
    } catch (error) {
      result.setMetadata(audit);
      this.handleError(error, result);
    }

    return result;
  }

  private validateRequest(result: IResult, taskDto: TaskDetailDto): boolean {
    const isValid = this.validator.isValidEntry(result, {
      tittle: taskDto.tittle,
      description: taskDto.description,
    });

    return isValid;
  }
}
