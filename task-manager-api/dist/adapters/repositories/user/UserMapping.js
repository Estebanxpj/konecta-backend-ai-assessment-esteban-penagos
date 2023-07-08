"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../domain/user/User");
class UserMapping {
    static mapModelFromSchema(model) {
        if (!model)
            return null;
        const user = new User_1.User(model.userName, model.password);
        user.setId(model._id.toString());
        return user;
    }
}
exports.default = UserMapping;
//# sourceMappingURL=UserMapping.js.map