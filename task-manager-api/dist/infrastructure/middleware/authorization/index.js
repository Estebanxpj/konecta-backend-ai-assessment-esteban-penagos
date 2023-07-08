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
exports.AuthorizationMiddleware = void 0;
const statusCodes = require("../../../application/shared/settings/httpStatusCodes.json");
const ApplicationError_1 = require("../../../application/shared/errors/ApplicationError");
const errorMessages_1 = require("../../../application/shared/locals/errorMessages");
const jwt_1 = require("../../security/jwt");
const ConfigResources_1 = require("../../server/ConfigResources");
const TOKEN_PARTS = 2;
const TOKEN_VALUE_POSITION = 1;
const PATH_WHITE_LIST = [
    `${ConfigResources_1.default.server.root}/ping`,
    `${ConfigResources_1.default.server.root}/v1/authorize`,
];
class AuthorizationMiddleware {
    handler(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (PATH_WHITE_LIST.some((path) => path === req.path)) {
                    return next();
                }
                const auth = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                const parts = auth.split(/\s+/);
                if ((parts === null || parts === void 0 ? void 0 : parts.length) !== TOKEN_PARTS) {
                    throw new ApplicationError_1.ApplicationError(errorMessages_1.default.get(errorMessages_1.resourceKeys.AUTHORIZATION_REQUIRED), statusCodes.UNAUTHORIZED, null);
                }
                const token = parts[TOKEN_VALUE_POSITION];
                const session = (_c = jwt_1.default.verify(token)) === null || _c === void 0 ? void 0 : _c.session;
                if (!session) {
                    throw new ApplicationError_1.ApplicationError(errorMessages_1.default.get(errorMessages_1.resourceKeys.AUTHORIZATION_REQUIRED), statusCodes.UNAUTHORIZED, null);
                }
                req.session = session;
            }
            catch (error) {
                throw new ApplicationError_1.ApplicationError(errorMessages_1.default.get(errorMessages_1.resourceKeys.AUTHORIZATION_REQUIRED), statusCodes.UNAUTHORIZED, null);
            }
            return next();
        });
    }
}
exports.AuthorizationMiddleware = AuthorizationMiddleware;
exports.default = new AuthorizationMiddleware();
//# sourceMappingURL=index.js.map