"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionUserDto = void 0;
const SessionDto_1 = require("./SessionDto");
class SessionUserDto extends SessionDto_1.SessionDto {
    constructor(userId, userName, domain) {
        super(domain);
        this.userId = userId;
        this.userName = userName;
    }
}
exports.SessionUserDto = SessionUserDto;
//# sourceMappingURL=SessionUserDto.js.map