import BaseController from "./adapters/controllers/shared/BaseController";
import App from "./infrastructure/server/App";

import SecurityController from "./adapters/controllers/security/SecurityController";
import UserController from "./adapters/controllers/user/UserController";
import TaskController from "./adapters/controllers/task/TaskController";

const appControllers: BaseController[] = [
    SecurityController,
    UserController,
    TaskController,
]

const app = new App(appControllers);

app.start();
