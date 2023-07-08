"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(_userName, _password) {
        this._userName = _userName;
        this._password = _password;
    }
    get id() {
        return this._id;
    }
    get userName() {
        return this._userName;
    }
    get password() {
        return this._password;
    }
    setId(id) {
        if (this._id) {
            throw new ReferenceError();
        }
        this._id = id;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map