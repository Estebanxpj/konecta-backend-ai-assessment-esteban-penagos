"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuditDto = void 0;
const AuditApplication_1 = require("../../../../domain/audit/AuditApplication");
class ClientAuditDto {
    static mapToDomain(clientAuditDto, action, description, isSuccess = false, data) {
        const audit = new AuditApplication_1.AuditApplication(clientAuditDto === null || clientAuditDto === void 0 ? void 0 : clientAuditDto.ip, clientAuditDto === null || clientAuditDto === void 0 ? void 0 : clientAuditDto.userAgent, clientAuditDto === null || clientAuditDto === void 0 ? void 0 : clientAuditDto.userId, action, description);
        if (data) {
            audit.setResponse({ message: description, response: data });
        }
        if (isSuccess) {
            audit.setSuccess();
        }
        return audit;
    }
}
exports.ClientAuditDto = ClientAuditDto;
//# sourceMappingURL=ClientAuditDto.js.map