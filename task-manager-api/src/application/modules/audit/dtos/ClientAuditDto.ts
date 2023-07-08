import { AuditApplication } from "../../../../domain/audit/AuditApplication";
import { AuditActions } from "../../../../domain/enums/AuditActions";

export class ClientAuditDto {
    ip: string;
    userAgent: string;
    userId: string;
    api: string;
  
    public static mapToDomain(
      clientAuditDto: ClientAuditDto,
      action: AuditActions,
      description?: string,
      isSuccess = false,
      data?: unknown,
    ): AuditApplication {

      const audit = new AuditApplication(
        clientAuditDto?.ip,
        clientAuditDto?.userAgent,
        clientAuditDto?.userId,
        action,
        description,
      );
  
      if (data) {
        audit.setResponse({ message: description, response: data });
      }
  
      if (isSuccess) {
        audit.setSuccess();
      }
      return audit;
    }
  }
  