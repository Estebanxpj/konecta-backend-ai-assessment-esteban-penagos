"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TaskSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    tittle: { type: String },
    description: { type: String },
    userId: { type: String },
    completed: { type: Boolean, default: false },
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("tasks", exports.TaskSchema);
//# sourceMappingURL=Task.model.js.map