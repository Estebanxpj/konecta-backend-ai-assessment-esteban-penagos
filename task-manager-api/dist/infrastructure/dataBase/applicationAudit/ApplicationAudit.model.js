"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationAuditSchema = void 0;
const AuditActions_1 = require("../../../domain/enums/AuditActions");
const mongoose_1 = require("mongoose");
exports.ApplicationAuditSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    date: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    userId: { type: String },
    data: { type: String },
    action: { type: String, enum: Object.values(AuditActions_1.AuditActions) },
    success: { type: Boolean },
    description: { type: String },
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("applicationaudit", exports.ApplicationAuditSchema);
//# sourceMappingURL=ApplicationAudit.model.js.map