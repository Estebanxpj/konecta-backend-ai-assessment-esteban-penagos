"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../../../../domain/task/Task");
const TaskDetailDto_1 = require("../dtos/TaskDetailDto");
const TaskDto_1 = require("../dtos/TaskDto");
class TaskMap {
    static mapToDomain(taskDto, userId) {
        return new Task_1.Task(userId, taskDto.tittle, taskDto.description, taskDto.completed);
    }
    static mapToTaskDetailDto(task) {
        return new TaskDetailDto_1.TaskDetailDto(task.description, task.completed, task.id, task.tittle);
    }
    static mapToDto(task) {
        return new TaskDto_1.TaskDto(task.id, task.tittle);
    }
}
exports.default = TaskMap;
//# sourceMappingURL=TaskMap.js.map