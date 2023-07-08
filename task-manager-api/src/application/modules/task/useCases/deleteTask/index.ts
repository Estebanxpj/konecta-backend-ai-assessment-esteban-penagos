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

export class DeleteTaskUseCase extends BaseUseCase {
    constructor(private taskRepository: ITask, ) {
      super();
    }
  
    public async execute(
      taskId: string,
      clientAudit: ClientAuditDto
    ): Promise<IResultT<TaskDetailDto>> {
      const result = new ResultT<TaskDetailDto>();
      const audit = ClientAuditDto.mapToDomain(
        clientAudit,
        AuditActions.UpdateTask
      );
      try {
        if (!this.validator.isValidEntry(result, { taskId: taskId }))
          return result;
  
        const wasDeleteTask: boolean = await this.taskRepository.delete(taskId);
  
        if (!wasDeleteTask) {
          result.setError(
            this.resources.get(this.resourceKeys.ERROR_DELETE_TASK),
            this.applicationStatus.INTERNAL_SERVER_ERROR
          );
          return result;
        }
  
        result.setData(
          taskId,
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