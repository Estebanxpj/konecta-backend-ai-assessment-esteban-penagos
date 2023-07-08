import { SessionUserDto } from "../../../security/dtos/SessionUserDto";
import { ClientAuditDto } from "../../../audit/dtos/ClientAuditDto";
import { TaskDetailDto } from "../../dtos/TaskDetailDto";
import { Task } from "../../../../../domain/task/Task";
import {
  BaseUseCase,
  IResultT,
  ResultT,
  AuditActions,
} from "../../../../shared/useCase/BaseUseCase";
import { ITask } from "../../contracts/ITask";
import TaskMap from "../../common/TaskMap";

export class GetTasksByIdUseCase extends BaseUseCase {
  constructor(private taskRepository: ITask) {
    super();
  }

  public async execute(
    taskId: string,
    session: SessionUserDto,
    clientAudit: ClientAuditDto
  ): Promise<IResultT<TaskDetailDto>> {
    const result = new ResultT<TaskDetailDto>();
    const audit = ClientAuditDto.mapToDomain(
      clientAudit,
      AuditActions.GetTasksByUser
    );
    try {
      if(!this.validator.isValidEntry(result, {taskId: taskId})) return result;

      const task: Task = await this.taskRepository.getById(taskId);

      if (!task) {
        result.setError(
          this.resources.get(this.resourceKeys.TASKS_NOT_FOUND),
          this.applicationStatus.NOT_FOUND
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
