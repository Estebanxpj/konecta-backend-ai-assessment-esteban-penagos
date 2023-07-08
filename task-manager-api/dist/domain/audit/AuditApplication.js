"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditApplication = void 0;
class AuditApplication {
    constructor(ip, userAgent, userId, action, description, date) {
        this._success = false;
        this._ip = ip;
        this._userAgent = userAgent;
        this._userId = userId;
        this._action = action;
        this._description = description !== null && description !== void 0 ? description : "";
        this.setDate(date);
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get date() {
        return this._date;
    }
    get ip() {
        return this._ip;
    }
    get userAgent() {
        return this._userAgent;
    }
    get userId() {
        return this._userId;
    }
    get action() {
        return this._action;
    }
    get data() {
        return this._data;
    }
    get success() {
        return this._success;
    }
    get description() {
        return this._description;
    }
    setDate(date) {
        this._date = date !== null && date !== void 0 ? date : new Date().toISOString();
    }
    setResponse(response) {
        this._data = response ? JSON.stringify(response).toString() : "";
    }
    setSuccess() {
        this._success = true;
    }
}
exports.AuditApplication = AuditApplication;
//# sourceMappingURL=AuditApplication.js.map