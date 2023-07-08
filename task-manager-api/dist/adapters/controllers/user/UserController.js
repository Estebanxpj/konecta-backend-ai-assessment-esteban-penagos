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
exports.UserController = void 0;
const BaseController_1 = require("../shared/BaseController");
const container_1 = require("../shared/container");
const container_2 = require("./container");
class UserController extends BaseController_1.default {
    constructor() {
        super(container_1.applicationAuditRepository);
        this.create = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDto = request.body;
                this.handleResult(response, yield container_2.createUserUseCase.execute(userDto, this.getClientAudit(request)));
            }
            catch (error) {
                next(error);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/v1/users/register", [
            this.checkSession,
            this.create,
        ]);
    }
}
exports.UserController = UserController;
exports.default = new UserController();
;
//# sourceMappingURL=UserController.js.map