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
exports.CreateUserUseCase = void 0;
const UserMap_1 = require("../../common/UserMap");
const BaseUseCase_1 = require("../../../../shared/useCase/BaseUseCase");
class CreateUserUseCase extends BaseUseCase_1.BaseUseCase {
    constructor(userRepository) {
        super();
        this.userRepository = userRepository;
    }
    execute(userDto, clientAudit) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new BaseUseCase_1.ResultT();
            const audit = BaseUseCase_1.ClientAuditDto.mapToDomain(clientAudit, BaseUseCase_1.AuditActions.CreateUser);
            try {
                if (!this.validator.isValidEntry(result, {
                    Password: userDto === null || userDto === void 0 ? void 0 : userDto.password,
                    UserName: userDto === null || userDto === void 0 ? void 0 : userDto.userName,
                }))
                    return result;
                const user = yield this.userRepository.create(UserMap_1.default.mapToDomain(userDto));
                if (!user) {
                    result.setError(this.resources.get(this.resourceKeys.ERROR_SAVING_USER), this.applicationStatus.INTERNAL_SERVER_ERROR);
                    return result;
                }
                result.setData({ id: user === null || user === void 0 ? void 0 : user.id }, this.applicationStatus.SUCCESS, this.resources.get(this.resourceKeys.SUCCESSFUL_PROCESS));
                audit.setSuccess();
                result.setMetadata(audit);
            }
            catch (error) {
                result.setMetadata(audit);
                this.handleError(error, result);
            }
            return result;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=index.js.map