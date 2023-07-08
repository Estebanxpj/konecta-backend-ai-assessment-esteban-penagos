"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsDto = void 0;
class CredentialsDto {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
    static userNameToLowerCase(credentials) {
        if (credentials.userName) {
            credentials.userName = credentials.userName.toLowerCase();
        }
    }
}
exports.CredentialsDto = CredentialsDto;
//# sourceMappingURL=CredentialsDto.js.map