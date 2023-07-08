"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../../domain/user/User");
class UserMap {
    static mapToDomain(userDto) {
        return new User_1.User(userDto.userName, userDto.password);
    }
}
exports.default = UserMap;
//# sourceMappingURL=UserMap.js.map