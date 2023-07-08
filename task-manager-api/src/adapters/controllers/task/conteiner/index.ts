import { GetTasksByUserUseCase } from "../../../../application/modules/task/useCases/getTasksByUser";
import { GetTasksByIdUseCase } from "../../../../application/modules/task/useCases/getTaskById";
import { CreateTaskUseCase } from "../../../../application/modules/task/useCases/createTask";
import { DeleteTaskUseCase } from "../../../../application/modules/task/useCases/deleteTask";
import { UpdateTaskUseCase } from "../../../../application/modules/task/useCases/updateTask";
import { TaskRepository } from "../../../repositories/task/TaskRepository";

const taskRepository = new TaskRepository();

const getTasksByUserUseCase = new GetTasksByUserUseCase(taskRepository);
const getTaskByIdUseCase = new GetTasksByIdUseCase(taskRepository);
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

export {
    getTaskByIdUseCase,
    getTasksByUserUseCase,
    createTaskUseCase,
    updateTaskUseCase,
    deleteTaskUseCase,
}