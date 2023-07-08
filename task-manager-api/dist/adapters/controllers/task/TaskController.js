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
exports.TaskController = void 0;
const container_1 = require("../shared/container");
const BaseController_1 = require("../shared/BaseController");
const conteiner_1 = require("./conteiner");
class TaskController extends BaseController_1.default {
    constructor() {
        super(container_1.applicationAuditRepository);
        this.getTasksByUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const session = request.session;
                this.handleResult(response, yield conteiner_1.getTasksByUserUseCase.execute(session, this.getClientAudit(request)));
            }
            catch (error) {
                next(error);
            }
        });
        this.getTaskById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const session = request.session;
                const taskId = request.params.id;
                this.handleResult(response, yield conteiner_1.getTaskByIdUseCase.execute(taskId, session, this.getClientAudit(request)));
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const session = request.session;
                const taskDto = request.body;
                this.handleResult(response, yield conteiner_1.createTaskUseCase.execute(taskDto, session, this.getClientAudit(request)));
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const session = request.session;
                const taskId = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id;
                const taskDto = request.body;
                taskDto.id = taskId;
                this.handleResult(response, yield conteiner_1.updateTaskUseCase.execute(taskDto, session, this.getClientAudit(request)));
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const session = request.session;
                const taskId = request.params.id;
                this.handleResult(response, yield conteiner_1.deleteTaskUseCase.execute(taskId, this.getClientAudit(request)));
            }
            catch (error) {
                next(error);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/v1/tasks", [this.checkUserSession, this.getTasksByUser]);
        this.router.get("/v1/tasks/:id", [this.checkUserSession, this.getTaskById]);
        this.router.post("/v1/tasks", [this.checkUserSession, this.create]);
        this.router.put("/v1/tasks/:id", [this.checkUserSession, this.update]);
        this.router.delete("/v1/tasks/:id", [this.checkUserSession, this.delete]);
    }
}
exports.TaskController = TaskController;
exports.default = new TaskController();
;
//# sourceMappingURL=TaskController.js.map