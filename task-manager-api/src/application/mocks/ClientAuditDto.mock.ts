import { ClientAuditDto } from "../modules/audit/dtos/ClientAuditDto";
import { IEntityBuilder } from "./contracts/IEntityBuilder";

class ClientAuditDtoMock implements IEntityBuilder<ClientAuditDto> {
  private auditApplicationDto: ClientAuditDto;
  constructor() {
    this.auditApplicationDto = new ClientAuditDto();
  }
  reset(): ClientAuditDto {
    this.auditApplicationDto = new ClientAuditDto();
    return this.auditApplicationDto;
  }
  build(): ClientAuditDto {
    return this.auditApplicationDto;
  }
  withIp(ip: string = "1.1.1.1"): ClientAuditDtoMock {
    this.auditApplicationDto.ip = ip;
    return this;
  }
  withUserAgent(userAgent: string = "prueba"): ClientAuditDtoMock {
    this.auditApplicationDto.userAgent = userAgent;
    return this;
  }
}

export { ClientAuditDtoMock };