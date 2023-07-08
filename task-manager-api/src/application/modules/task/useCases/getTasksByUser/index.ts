import { SessionUserDto } from "../../../security/dtos/SessionUserDto";
import { Task } from "../../../../../domain/task/Task";
import {
  BaseUseCase,
  IResultT,
  ResultT,
  ClientAuditDto,
  AuditActions,
} from "../../../../shared/useCase/BaseUseCase";
import TaskMap from "../../common/TaskMap";
import { ITask } from "../../contracts/ITask";
import { TaskDto } from "../../dtos/TaskDto";

export class GetTasksByUserUseCase extends BaseUseCase {
  constructor(private taskRepository: ITask) {
    super();
  }
  
  public async execute(
    session: SessionUserDto,
    clientAudit: ClientAuditDto
  ): Promise<IResultT<TaskDto[]>> {
    const result = new ResultT<TaskDto[]>();
    const audit = ClientAuditDto.mapToDomain(
      clientAudit,
      AuditActions.GetTasksById
    );
    try {
      const tasks: Task[] =
        (await this.taskRepository.getByUserId(session.userId)) ?? [];

      if (tasks?.length === 0) {
        result.setError(
          this.resources.get(this.resourceKeys.TASKS_NOT_FOUND),
          this.applicationStatus.NOT_FOUND
        );
        return result;
      }

      const data: TaskDto[] = tasks.map((task) => {
        return TaskMap.mapToDto(task);
      });

      result.setData(
        data,
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
