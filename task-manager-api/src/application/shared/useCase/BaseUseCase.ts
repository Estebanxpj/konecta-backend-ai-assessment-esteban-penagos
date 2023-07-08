import resources, { resourceKeys } from "../locals/errorMessages/index";
import * as applicationStatus from "../settings/httpStatusCodes.json";
import { ApplicationError } from "../errors/ApplicationError";
import { Validator } from "validator-tsk";
import { IResult } from "result-tsk";

export { AuditActions } from "../../../domain/enums/AuditActions"; 
export { IResultT, ResultT, IResult, Result } from "result-tsk";
export { ClientAuditDto } from "../../modules/audit/dtos/ClientAuditDto";

export class BaseUseCase {
  public resources;
  public resourceKeys;
  public applicationStatus;
  public validator: Validator;

  constructor() {
    this.resources = resources;
    this.resourceKeys = resourceKeys;
    this.applicationStatus = applicationStatus;

    this.initValidator();
  }

  private initValidator() {
    this.validator = new Validator(
      resources,
      resourceKeys.SOME_PARAMETERS_ARE_MISSING,
      Number(applicationStatus.BAD_REQUEST)
    );
  }

  handleError(error: Error, result: IResult): void {
    if (error instanceof ApplicationError) {
      result.setError(error.message, result.statusCode);
    } else {
      throw error;
    }
  }
}
