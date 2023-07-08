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
exports.GetTasksByUserUseCase = void 0;
const BaseUseCase_1 = require("../../../../shared/useCase/BaseUseCase");
const TaskMap_1 = require("../../common/TaskMap");
class GetTasksByUserUseCase extends BaseUseCase_1.BaseUseCase {
    constructor(taskRepository) {
        super();
        this.taskRepository = taskRepository;
    }
    execute(session, clientAudit) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = new BaseUseCase_1.ResultT();
            const audit = BaseUseCase_1.ClientAuditDto.mapToDomain(clientAudit, BaseUseCase_1.AuditActions.GetTasksById);
            try {
                const tasks = (_a = (yield this.taskRepository.getByUserId(session.userId))) !== null && _a !== void 0 ? _a : [];
                if ((tasks === null || tasks === void 0 ? void 0 : tasks.length) === 0) {
                    result.setError(this.resources.get(this.resourceKeys.TASKS_NOT_FOUND), this.applicationStatus.NOT_FOUND);
                    return result;
                }
                const data = tasks.map((task) => {
                    return TaskMap_1.default.mapToDto(task);
                });
                result.setData(data, this.applicationStatus.SUCCESS, this.resources.get(this.resourceKeys.SUCCESSFUL_PROCESS));
                audit.setSuccess();
            }
            catch (error) {
                result.setMetadata(audit);
                this.handleError(error, result);
            }
            return result;
        });
    }
}
exports.GetTasksByUserUseCase = GetTasksByUserUseCase;
//# sourceMappingURL=index.js.map