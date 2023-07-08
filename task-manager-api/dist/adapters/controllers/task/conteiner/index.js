"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskUseCase = exports.updateTaskUseCase = exports.createTaskUseCase = exports.getTasksByUserUseCase = exports.getTaskByIdUseCase = void 0;
const getTasksByUser_1 = require("../../../../application/modules/task/useCases/getTasksByUser");
const getTaskById_1 = require("../../../../application/modules/task/useCases/getTaskById");
const createTask_1 = require("../../../../application/modules/task/useCases/createTask");
const deleteTask_1 = require("../../../../application/modules/task/useCases/deleteTask");
const updateTask_1 = require("../../../../application/modules/task/useCases/updateTask");
const TaskRepository_1 = require("../../../repositories/task/TaskRepository");
const taskRepository = new TaskRepository_1.TaskRepository();
const getTasksByUserUseCase = new getTasksByUser_1.GetTasksByUserUseCase(taskRepository);
exports.getTasksByUserUseCase = getTasksByUserUseCase;
const getTaskByIdUseCase = new getTaskById_1.GetTasksByIdUseCase(taskRepository);
exports.getTaskByIdUseCase = getTaskByIdUseCase;
const createTaskUseCase = new createTask_1.CreateTaskUseCase(taskRepository);
exports.createTaskUseCase = createTaskUseCase;
const updateTaskUseCase = new updateTask_1.UpdateTaskUseCase(taskRepository);
exports.updateTaskUseCase = updateTaskUseCase;
const deleteTaskUseCase = new deleteTask_1.DeleteTaskUseCase(taskRepository);
exports.deleteTaskUseCase = deleteTaskUseCase;
//# sourceMappingURL=index.js.map