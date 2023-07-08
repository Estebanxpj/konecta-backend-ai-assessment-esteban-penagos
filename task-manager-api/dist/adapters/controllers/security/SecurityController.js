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
exports.SecurityController = void 0;
const container_1 = require("./container");
const container_2 = require("../shared/container");
const BaseController_1 = require("../shared/BaseController");
class SecurityController extends BaseController_1.default {
    constructor() {
        super(container_2.applicationAuditRepository);
        this.authorize = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const domain = request.body.domain;
                const apiKey = request.body.apiKey;
                this.handleResult(response, yield container_1.authorizeUseCase.execute(apiKey, domain));
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = this.decryptData(request);
                const session = request.session;
                this.handleResult(response, yield container_1.loginUseCase.execute(credentials, session, this.getClientAudit(request)));
            }
            catch (error) {
                next(error);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/v1/authorize", this.authorize);
        this.router.post("/v1/login", [this.checkSession, this.login]);
    }
}
exports.SecurityController = SecurityController;
exports.default = new SecurityController();
//# sourceMappingURL=SecurityController.js.map