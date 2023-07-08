import { AuditApplication } from "../../../../domain/audit/AuditApplication";
import { IResult } from "result-tsk";

export interface IApplicationError extends Error {
    name: string;
    errorCode: number | string;
    result: IResult;
    applicationAudit: AuditApplication;
  }