import { Task } from "../../../../domain/task/Task";
import { TaskDetailDto } from "../dtos/TaskDetailDto";
import { TaskDto } from "../dtos/TaskDto";

export default class TaskMap {
    public static mapToDomain(taskDto: TaskDetailDto, userId: string): Task {
        return new Task(userId, taskDto.tittle, taskDto.description, taskDto.completed);
    }

    public static mapToTaskDetailDto(task: Task): TaskDetailDto {
        return new TaskDetailDto(task.description, task.completed, task.id, task.tittle);
    }

    public static mapToDto(task: Task): TaskDto {
        return new TaskDto(task.id, task.tittle);
    }
}