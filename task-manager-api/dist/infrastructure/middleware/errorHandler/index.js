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
exports.ErrorHandlerMiddleware = void 0;
const ApplicationAuditRepository_1 = require("../../../adapters/repositories/audit/ApplicationAuditRepository");
const HttpResponse_1 = require("../../../adapters/controllers/shared/httpResponse/HttpResponse");
const errorMessages_1 = require("../../../application/shared/locals/errorMessages");
const ConfigResources_1 = require("../../server/ConfigResources");
const result_tsk_1 = require("result-tsk");
class ErrorHandlerMiddleware {
    handler(error, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new result_tsk_1.Result();
            if ((error === null || error === void 0 ? void 0 : error.name) === "ApplicationError") {
                console.log("Controlled application error:", error.message);
                //ErrorLog.captureException(error);
                result.setError(error.message, error.errorCode);
                result.setMetadata(error.applicationAudit);
            }
            else {
                console.log("No controlled application error:", error);
                result.setError(errorMessages_1.default.get(ConfigResources_1.default.defaultError.message), ConfigResources_1.default.defaultError.code);
                //ErrorLog.captureException(error);
            }
            if (res.headersSent) {
                return next(result);
            }
            if (error.applicationAudit) {
                this.applicationAuditRepository = new ApplicationAuditRepository_1.ApplicationAuditRepository();
                this.applicationAuditRepository.createLog(error.applicationAudit);
            }
            res
                .status(result.statusCode)
                .json(HttpResponse_1.default.createResponse(result));
        });
    }
}
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
exports.default = new ErrorHandlerMiddleware();
//# sourceMappingURL=index.js.map