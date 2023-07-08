"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDetailDto = void 0;
const TaskDto_1 = require("./TaskDto");
class TaskDetailDto extends TaskDto_1.TaskDto {
    constructor(description, completed, id, tittle) {
        super(id, tittle);
        this.description = description;
        this.completed = completed;
    }
}
exports.TaskDetailDto = TaskDetailDto;
//# sourceMappingURL=TaskDetailDto.js.map