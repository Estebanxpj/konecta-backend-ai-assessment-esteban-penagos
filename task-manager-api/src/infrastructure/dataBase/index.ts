import * as statusCodes from "../../application/shared/settings/httpStatusCodes.json";
import { ApplicationError } from "../../application/shared/errors/ApplicationError";
import config from "../server/ConfigResources";
import * as mongoose from "mongoose";

class ConnexionDataBase {
  private initialized = false;

  initialize = async (): Promise<boolean> => {
    try {
      if (this.initialized) {
        return this.initialized;
      }

      await mongoose.connect(config.database.host);

      console.log("\x1b[33mTransactions DB status: \x1b[32m ✔️ Online \x1b[0m");

      mongoose.connection
        .on("error", (error) => {
          this.initialized = false;
          console.log("\x1b[33mMongo status: \x1b[31m ✘ Error \x1b[0m", error);
          throw new ApplicationError(
            "Error on Mongo",
            statusCodes.INTERNAL_SERVER_ERROR,
            null,
            JSON.stringify(error)
          );
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
    } catch (error) {
      this.initialized = false;
      console.log("\x1b[33mMONGO DATABASE: \x1b[31m ✘ ERROR \x1b[0m", error);
      throw new ApplicationError(
        "MONGO DATABASE ERROR",
        statusCodes.INTERNAL_SERVER_ERROR,
        null,
        JSON.stringify(error)
      );
    }
    return this.initialized;
  };

  public getDbStatus(): boolean {
    return mongoose.connection.readyState == 1;
  }
}

export default new ConnexionDataBase();
