import * as dotenv from "dotenv";

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  server: {
    root: process.env.SERVER_ROOT,
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
  security: {
    defaultKeyPassword: process.env.DEFAULT_KEY_PASSWORD,
    defaultApiKey: process.env.DEFAULT_API_KEY,
  },
  defaultError: {
    code: 500,
    message: "SOMETHING_WENT_WRONG",
  },
  region: {
    defaultLanguage: process.env.DEFAULT_LANGUAGE || "en",
    appSupportedLanguages: ["es", "en"],
  },
  jwt: {
    secretKey: process.env.DEFAULT_API_KEY,
    expiresIn: "8h",
  },
};

