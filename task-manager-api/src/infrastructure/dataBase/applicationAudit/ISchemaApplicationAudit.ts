import { AuditActions } from "../../../domain/enums/AuditActions";
import { Schema, Document } from "mongoose";

export interface ISchemaApplicationAudit extends Document {
  _id: Schema.Types.ObjectId;
  date: string;
  ip: string;
  client: string;
  device: string;
  personId: string;
  data: string;
  success: boolean;
  description: string;
  action: AuditActions;
}
