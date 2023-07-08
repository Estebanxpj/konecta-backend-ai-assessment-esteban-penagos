"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError {
    constructor(message, errorCode, applicationAudit, stack) {
        this.message = message;
        this.name = "ApplicationError";
        this.errorCode = errorCode;
        this.stack = stack;
        this._applicationAudit = applicationAudit;
    }
    get applicationAudit() {
        return this._applicationAudit;
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=ApplicationError.js.map