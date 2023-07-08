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
exports.AuthorizeUseCase = void 0;
const AppSettings_1 = require("../../../../shared/settings/AppSettings");
const Cipher_1 = require("../../../../shared/utils/Cipher");
const SessionDto_1 = require("../../dtos/SessionDto");
const BaseUseCase_1 = require("../../../../shared/useCase/BaseUseCase");
class AuthorizeUseCase extends BaseUseCase_1.BaseUseCase {
    constructor(authorize) {
        super();
        this.authorize = authorize;
    }
    execute(apiKey, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new BaseUseCase_1.ResultT();
            if (!this.validator.isValidEntry(result, { domain: domain, apiKey: apiKey })) {
                return result;
            }
            if (!this.isValidCredentials(apiKey, domain)) {
                result.setError(this.resources.get(this.resourceKeys.UNAUTHORIZED), this.applicationStatus.UNAUTHORIZED);
                return result;
            }
            const token = this.authorize.generate(new SessionDto_1.SessionDto(domain));
            if (!token) {
                result.setError(this.resources.get(this.resourceKeys.UNAUTHORIZED), this.applicationStatus.UNAUTHORIZED);
                return result;
            }
            result.setData(token, this.applicationStatus.SUCCESS);
            return result;
        });
    }
    isValidCredentials(apiKey, domain) {
        const keyDecrypt = Cipher_1.default.decrypt(apiKey);
        return AppSettings_1.default.defaultApiKey === keyDecrypt && !!domain;
    }
}
exports.AuthorizeUseCase = AuthorizeUseCase;
//# sourceMappingURL=index.js.map