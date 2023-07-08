import { Task } from "../../../../domain/task/Task";
import { TaskDetailDto } from "../dtos/TaskDetailDto";

export interface ITask {
    create(task: Task): Promise<Task>;
    getByUserId(userId: string): Promise<Task[]>;
    getById(id: string): Promise<Task>;
    update(task: TaskDetailDto): Promise<Task>;
    delete(id: string): Promise<boolean>;
}