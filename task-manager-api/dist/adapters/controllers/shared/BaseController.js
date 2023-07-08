"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const applicationStatus = require("../../../application/shared/settings/httpStatusCodes.json");
const CipherDataDto_1 = require("../../../application/modules/security/dtos/CipherDataDto");
const Cipher_1 = require("../../../application/shared/utils/Cipher");
const HttpResponse_1 = require("./httpResponse/HttpResponse");
const errorMessages_1 = require("../../../application/shared/locals/errorMessages");
const CoreServer_1 = require("../../../infrastructure/server/CoreServer");
const result_tsk_1 = require("result-tsk");
class BaseController {
    constructor(auditApplication) {
        this.auditApplication = auditApplication;
        this.checkUserSession = (request, response, next) => {
            const session = request.session;
            if (!(session === null || session === void 0 ? void 0 : session.userId)) {
                const result = new result_tsk_1.ResultT();
                result.setError(errorMessages_1.default.get(errorMessages_1.resourceKeys.AUTHORIZATION_REQUIRED), applicationStatus.UNAUTHORIZED);
                return this.handleResult(response, result);
            }
            else {
                return next();
            }
        };
        this.checkSession = (request, response, next) => {
            const session = request.session;
            if (!(session === null || session === void 0 ? void 0 : session.domain)) {
                const result = new result_tsk_1.ResultT();
                result.setError(errorMessages_1.default.get(errorMessages_1.resourceKeys.AUTHORIZATION_REQUIRED), applicationStatus.UNAUTHORIZED);
                return this.handleResult(response, result);
            }
            else {
                return next();
            }
        };
        this.router = (0, CoreServer_1.Router)();
    }
    handleResult(response, result) {
        if (result.getMetadata()) {
            this.auditApplication.createLog(result.getMetadata());
        }
        response
            .status(result.statusCode)
            .json(HttpResponse_1.default.createResponse(result));
    }
    decryptData(request) {
        try {
            const encryptRequest = new CipherDataDto_1.CipherDataDto(request.body.data, request.body.key);
            return JSON.parse(Cipher_1.default.decrypt(encryptRequest.data, encryptRequest.key));
        }
        catch (error) {
            return request.body;
        }
    }
    getClientAudit(req) {
        var _a, _b;
        return JSON.parse((_b = (_a = req === null || req === void 0 ? void 0 : req.headers["clientInfo"]) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
    }
}
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map