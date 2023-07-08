"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../../../domain/task/Task");
class TaskMapping {
    static mapModelFromSchema(model) {
        if (!model)
            return null;
        const task = new Task_1.Task(model.userId, model.tittle, model.description, model.completed);
        task.setId("1");
        return task;
    }
}
exports.default = TaskMapping;
//# sourceMappingURL=TaskMapping.js.map