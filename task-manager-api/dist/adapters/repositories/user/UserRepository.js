"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_model_1 = require("../../../infrastructure/dataBase/user/User.model");
const Cipher_1 = require("../../../application/shared/utils/Cipher");
const UserMapping_1 = require("./UserMapping");
const mongoose_1 = require("mongoose");
class UserRepository {
    authenticate(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptPassword = this.CypherPassword(credentials.password);
            const result = yield User_model_1.default.findOne({
                userName: credentials.userName,
                password: encryptPassword,
            })
                .exec();
            return UserMapping_1.default.mapModelFromSchema(result === null || result === void 0 ? void 0 : result.toJSON());
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptPassword = this.CypherPassword(user.password);
            const result = yield User_model_1.default.create({
                _id: new mongoose_1.Types.ObjectId(),
                userName: user === null || user === void 0 ? void 0 : user.userName,
                password: encryptPassword,
            });
            return UserMapping_1.default.mapModelFromSchema(result === null || result === void 0 ? void 0 : result.toJSON());
        });
    }
    CypherPassword(password) {
        return Cipher_1.default.cypher(password);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map