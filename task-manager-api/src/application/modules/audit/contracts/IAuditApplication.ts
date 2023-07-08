import { AuditApplication } from "../../../../domain/audit/AuditApplication";

export interface IAuditApplication {
    createLog(auditApplication: AuditApplication): Promise<boolean>;
  }
  