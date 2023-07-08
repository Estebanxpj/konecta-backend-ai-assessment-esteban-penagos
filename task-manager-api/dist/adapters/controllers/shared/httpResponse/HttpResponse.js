"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseData_1 = require("./ResponseData");
const Header_1 = require("./Header");
const Status_1 = require("./Status");
class HttpResponse {
    static createResponse(result) {
        return new ResponseData_1.ResponseData(new Header_1.Header(new Status_1.Status(result.statusCode.toString(), result.message || result.error)), (result === null || result === void 0 ? void 0 : result.data) || result.message || result.error);
    }
}
exports.default = HttpResponse;
//# sourceMappingURL=HttpResponse.js.map