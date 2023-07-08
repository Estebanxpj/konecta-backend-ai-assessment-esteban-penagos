"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./infrastructure/server/App");
const SecurityController_1 = require("./adapters/controllers/security/SecurityController");
const UserController_1 = require("./adapters/controllers/user/UserController");
const TaskController_1 = require("./adapters/controllers/task/TaskController");
const appControllers = [
    SecurityController_1.default,
    UserController_1.default,
    TaskController_1.default,
];
const app = new App_1.default(appControllers);
app.start();
//# sourceMappingURL=index.js.map