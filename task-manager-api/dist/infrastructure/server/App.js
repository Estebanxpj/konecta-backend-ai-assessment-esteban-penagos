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
const CoreServer_1 = require("./CoreServer");
const AppSettings_1 = require("../../application/shared/settings/AppSettings");
const errorMessages_1 = require("../../application/shared/locals/errorMessages");
const authorization_1 = require("../middleware/authorization");
const clientRequestInfo_1 = require("../middleware/clientRequestInfo");
const errorHandler_1 = require("../middleware/errorHandler");
const Cipher_1 = require("../../application/shared/utils/Cipher");
const region_1 = require("../middleware/region");
const dataBase_1 = require("../dataBase");
const ConfigResources_1 = require("./ConfigResources");
const jwt_1 = require("../security/jwt");
class App {
    constructor(controllers) {
        this.app = (0, CoreServer_1.Server)();
        this.app.set("trust proxy", true);
        this.loadMiddleware();
        this.loadControllers(controllers);
        this.loadErrorHandler();
        this.loadSettings();
    }
    start() {
        this.runServices();
    }
    runServices() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const notariesInitResult = yield dataBase_1.default.initialize();
            const errorMessage = "Database services could not be initialized";
            if (!notariesInitResult)
                reject(errorMessage);
            this.listen();
            resolve();
        }));
    }
    listen() {
        this.app.listen(ConfigResources_1.default.server.port, () => {
            console.log(`Server running on ${ConfigResources_1.default.server.host}:${ConfigResources_1.default.server.port}${ConfigResources_1.default.server.root}`);
        });
    }
    loadMiddleware() {
        this.app.use(CoreServer_1.Server.json());
        this.app.use(region_1.default.handler);
        this.app.use(authorization_1.default.handler);
        this.app.use(clientRequestInfo_1.default.handler);
    }
    loadControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(ConfigResources_1.default.server.root, controller.router);
        });
    }
    loadErrorHandler() {
        this.app.use(errorHandler_1.default.handler);
    }
    loadSettings() {
        errorMessages_1.default.setDefaultLanguage(ConfigResources_1.default.region.defaultLanguage);
        jwt_1.default.init(ConfigResources_1.default.jwt);
        Cipher_1.default.init(ConfigResources_1.default.security.defaultKeyPassword);
        AppSettings_1.default.init(ConfigResources_1.default.security.defaultApiKey, ConfigResources_1.default.env);
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map