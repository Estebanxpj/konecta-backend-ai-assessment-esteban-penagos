"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUseCase = exports.ClientAuditDto = exports.Result = exports.ResultT = exports.AuditActions = void 0;
const index_1 = require("../locals/errorMessages/index");
const applicationStatus = require("../settings/httpStatusCodes.json");
const ApplicationError_1 = require("../errors/ApplicationError");
const validator_tsk_1 = require("validator-tsk");
var AuditActions_1 = require("../../../domain/enums/AuditActions");
Object.defineProperty(exports, "AuditActions", { enumerable: true, get: function () { return AuditActions_1.AuditActions; } });
var result_tsk_1 = require("result-tsk");
Object.defineProperty(exports, "ResultT", { enumerable: true, get: function () { return result_tsk_1.ResultT; } });
Object.defineProperty(exports, "Result", { enumerable: true, get: function () { return result_tsk_1.Result; } });
var ClientAuditDto_1 = require("../../modules/audit/dtos/ClientAuditDto");
Object.defineProperty(exports, "ClientAuditDto", { enumerable: true, get: function () { return ClientAuditDto_1.ClientAuditDto; } });
class BaseUseCase {
    constructor() {
        this.resources = index_1.default;
        this.resourceKeys = index_1.resourceKeys;
        this.applicationStatus = applicationStatus;
        this.initValidator();
    }
    initValidator() {
        this.validator = new validator_tsk_1.Validator(index_1.default, index_1.resourceKeys.SOME_PARAMETERS_ARE_MISSING, Number(applicationStatus.BAD_REQUEST));
    }
    handleError(error, result) {
        if (error instanceof ApplicationError_1.ApplicationError) {
            result.setError(error.message, result.statusCode);
        }
        else {
            throw error;
        }
    }
}
exports.BaseUseCase = BaseUseCase;
//# sourceMappingURL=BaseUseCase.js.map