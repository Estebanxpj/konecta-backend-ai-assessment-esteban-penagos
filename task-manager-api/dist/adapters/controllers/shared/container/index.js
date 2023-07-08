"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.applicationAuditRepository = void 0;
const ApplicationAuditRepository_1 = require("../../../repositories/audit/ApplicationAuditRepository");
const UserRepository_1 = require("../../../repositories/user/UserRepository");
const applicationAuditRepository = new ApplicationAuditRepository_1.ApplicationAuditRepository();
exports.applicationAuditRepository = applicationAuditRepository;
const userRepository = new UserRepository_1.UserRepository();
exports.userRepository = userRepository;
//# sourceMappingURL=index.js.map