import { SessionUserDto } from "../../../security/dtos/SessionUserDto";
import { TaskDetailDto } from "../../dtos/TaskDetailDto";
import { Task } from "../../../../../domain/task/Task";
import {
  BaseUseCase,
  ClientAuditDto,
  IResultT,
  ResultT,
  AuditActions,
} from "../../../../shared/useCase/BaseUseCase";
import { ITask } from "../../contracts/ITask";
import TaskMap from "../../common/TaskMap";

export class UpdateTaskUseCase extends BaseUseCase {
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
      AuditActions.UpdateTask
    );
    try {
      if (!this.validator.isValidEntry(result, { taskId: taskDto.id }))
        return result;

      const task: Task = await this.taskRepository.update(taskDto);

      if (!task) {
        result.setError(
          this.resources.get(this.resourceKeys.NOT_FOUNDED_TASK),
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
}
