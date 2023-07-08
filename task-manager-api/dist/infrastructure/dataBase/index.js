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
const statusCodes = require("../../application/shared/settings/httpStatusCodes.json");
const ApplicationError_1 = require("../../application/shared/errors/ApplicationError");
const ConfigResources_1 = require("../server/ConfigResources");
const mongoose = require("mongoose");
class ConnexionDataBase {
    constructor() {
        this.initialized = false;
        this.initialize = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.initialized) {
                    return this.initialized;
                }
                yield mongoose.connect(ConfigResources_1.default.database.host);
                console.log("\x1b[33mTransactions DB status: \x1b[32m ✔️ Online \x1b[0m");
                mongoose.connection
                    .on("error", (error) => {
                    this.initialized = false;
                    console.log("\x1b[33mMongo status: \x1b[31m ✘ Error \x1b[0m", error);
                    throw new ApplicationError_1.ApplicationError("Error on Mongo", statusCodes.INTERNAL_SERVER_ERROR, null, JSON.stringify(error));
                })
                    .on("close", () => {
                    this.initialized = false;
                    console.log("\x1b[33mMongo status: \x1b[31m ✘ Closed \x1b[0m");
                })
                    .on("disconnected", () => {
                    this.initialized = false;
                    console.log("\x1b[33mMongo status: \x1b[31m ✘ Disconnected \x1b[0m");
                });
                this.initialized = true;
            }
            catch (error) {
                this.initialized = false;
                console.log("\x1b[33mMONGO DATABASE: \x1b[31m ✘ ERROR \x1b[0m", error);
                throw new ApplicationError_1.ApplicationError("MONGO DATABASE ERROR", statusCodes.INTERNAL_SERVER_ERROR, null, JSON.stringify(error));
            }
            return this.initialized;
        });
    }
    getDbStatus() {
        return mongoose.connection.readyState == 1;
    }
}
exports.default = new ConnexionDataBase();
//# sourceMappingURL=index.js.map