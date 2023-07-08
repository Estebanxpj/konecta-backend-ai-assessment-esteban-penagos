import ApplicationAuditModel from "../../../infrastructure/dataBase/applicationAudit/ApplicationAudit.model";
import { IAuditApplication } from "../../../application/modules/audit/contracts/IAuditApplication";
import { AuditApplication } from "../../../domain/audit/AuditApplication";
import { Types } from "mongoose";

export class ApplicationAuditRepository implements IAuditApplication {
  async createLog(auditApplication: AuditApplication): Promise<boolean> {
    const result = await ApplicationAuditModel.create({
      _id: new Types.ObjectId(),
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
  }
}
