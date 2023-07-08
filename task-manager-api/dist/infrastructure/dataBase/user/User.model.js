"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    userName: { type: String },
    password: { type: String },
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("users", exports.UserSchema);
//# sourceMappingURL=User.model.js.map