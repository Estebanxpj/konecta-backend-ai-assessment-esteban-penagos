"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(userId, tittle, description, completed) {
        this._userId = userId;
        this._tittle = tittle;
        this._description = description;
        this._completed = completed;
    }
    get id() {
        return this._id;
    }
    get userId() {
        return this._userId;
    }
    get tittle() {
        return this._tittle;
    }
    get description() {
        return this._description;
    }
    get completed() {
        return this._completed;
    }
    setId(id) {
        if (this._id) {
            throw new ReferenceError();
        }
        this._id = id;
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map