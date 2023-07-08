import { AuditApplication } from "../../../domain/audit/AuditApplication";
import { IApplicationError } from "./contracts/IApplicationError";
import { IResult } from "result-tsk";

export class ApplicationError implements IApplicationError {
    public constructor(
      message: string,
      errorCode: number | string,
      applicationAudit: AuditApplication,
      stack?: string,
    ) {
      this.message = message;
      this.name = "ApplicationError";
      this.errorCode = errorCode;
      this.stack = stack;
      this._applicationAudit = applicationAudit;
    }
    name: string;
    result: IResult;
    message: string;
    stack?: string;
    applicationErrorCode: string;
    errorCode: number | string;
  
    private readonly _applicationAudit: AuditApplication;
    public get applicationAudit(): AuditApplication {
      return this._applicationAudit;
    }
  }