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
exports.ApplicationAuditRepository = void 0;
const ApplicationAudit_model_1 = require("../../../infrastructure/dataBase/applicationAudit/ApplicationAudit.model");
const mongoose_1 = require("mongoose");
class ApplicationAuditRepository {
    createLog(auditApplication) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ApplicationAudit_model_1.default.create({
                _id: new mongoose_1.Types.ObjectId(),
                date: auditApplication.date,
                userId: auditApplication.userId,
                ip: auditApplication.ip,
                client: auditApplication.userAgent,
                data: auditApplication.data,
                action: auditApplication.action,
                description: auditApplication.description,
                success: auditApplication.success,
            });
            return result ? true : false;
        });
    }
}
exports.ApplicationAuditRepository = ApplicationAuditRepository;
//# sourceMappingURL=ApplicationAuditRepository.js.map