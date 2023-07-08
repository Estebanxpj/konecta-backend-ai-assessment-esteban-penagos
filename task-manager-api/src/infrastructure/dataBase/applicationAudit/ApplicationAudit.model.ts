import { ISchemaApplicationAudit } from "./ISchemaApplicationAudit";
import { AuditActions } from "../../../domain/enums/AuditActions";
import { Schema, model } from "mongoose";

export const ApplicationAuditSchema: Schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    date: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    userId: { type: String },
    data: { type: String },
    action: { type: String, enum: Object.values(AuditActions) },
    success: { type: Boolean },
    description: { type: String },
  },
  { versionKey: false },
);

export default model<ISchemaApplicationAudit>("applicationaudit", ApplicationAuditSchema);
