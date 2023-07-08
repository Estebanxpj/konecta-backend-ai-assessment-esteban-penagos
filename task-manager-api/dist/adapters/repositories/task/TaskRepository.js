"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const Task_model_1 = require("../../../infrastructure/dataBase/task/Task.model");
const TaskMapping_1 = require("./TaskMapping");
const mongoose_1 = require("mongoose");
class TaskRepository {
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Task_model_1.default.create({
                _id: new mongoose_1.Types.ObjectId(),
                userId: task.userId,
                tittle: task.tittle,
                description: task.description,
                completed: task.completed,
            });
            return TaskMapping_1.default.mapModelFromSchema(result === null || result === void 0 ? void 0 : result.toJSON());
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Task_model_1.default.find({ userId: userId }).exec();
            if (!result) {
                return null;
            }
            return result.map((task) => TaskMapping_1.default.mapModelFromSchema(task));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Task_model_1.default.findOne({ _id: id }).exec();
            return TaskMapping_1.default.mapModelFromSchema(result === null || result === void 0 ? void 0 : result.toJSON());
        });
    }
    update(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield Task_model_1.default.findOne({ _id: task.id }).exec();
            model.tittle = task.tittle || model.tittle;
            model.description = task.description || model.description;
            model.completed = task.completed || model.completed;
            model.save();
            return TaskMapping_1.default.mapModelFromSchema(model === null || model === void 0 ? void 0 : model.toJSON());
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Task_model_1.default.deleteOne({ _id: id });
            return (result === null || result === void 0 ? void 0 : result.deletedCount) > 0 ? true : false;
        });
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=TaskRepository.js.map