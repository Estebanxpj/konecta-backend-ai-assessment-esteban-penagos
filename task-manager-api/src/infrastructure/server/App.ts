import BaseController from "../../adapters/controllers/shared/BaseController";
import { Application, ErrorRequestHandler, Server } from "./CoreServer";
import resources from "../../application/shared/locals/errorMessages";
import authorizationMiddleware from "../middleware/authorization";
import clientRequestInfo from "../middleware/clientRequestInfo";
import errorHandlerMiddleware from "../middleware/errorHandler";
import Cipher from "../../application/shared/utils/Cipher";
import regionMiddleware from "../middleware/region";
import ConnexionDataBase from "../dataBase";
import config from "./ConfigResources";
import Jwt from "../security/jwt";
import AppSettings from "../../application/shared/settings/AppSettings";

export default class App {
  public app: Application;

  constructor(controllers: BaseController[]) {
    this.app = Server();
    this.app.set("trust proxy", true);
    this.loadMiddleware();
    this.loadControllers(controllers);
    this.loadErrorHandler();
    this.loadSettings();
  }

  public start(): void {
    this.runServices();
  }

  private runServices(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const notariesInitResult = await ConnexionDataBase.initialize();
      const errorMessage = "Database services could not be initialized";
      if (!notariesInitResult) reject(errorMessage);
      this.listen();
      resolve();
    });
  }

  private listen(): void {
    this.app.listen(config.server.port, () => {
      console.log(
        `Server running on ${config.server.host}:${config.server.port}${config.server.root}`
      );
    });
  }

  private loadMiddleware(): void {
    //this.app.use(cors());
    this.app.use(Server.json());
    //this.app.use(helmet());
    this.app.use(regionMiddleware.handler);
    this.app.use(authorizationMiddleware.handler);
    this.app.use(clientRequestInfo.handler);
    //this.app.use(awsDecryptMiddleware.handler);
  }

  private loadControllers(controllers: BaseController[]): void {
    controllers.forEach((controller) => {
      this.app.use(config.server.root, controller.router);
    });
  }

  private loadErrorHandler(): void {
    this.app.use(errorHandlerMiddleware.handler);
  }

  private loadSettings(): void {
    resources.setDefaultLanguage(config.region.defaultLanguage);
    Jwt.init(config.jwt);
    Cipher.init(config.security.defaultKeyPassword);
    AppSettings.init(config.security.defaultApiKey, config.env);
  }
}
