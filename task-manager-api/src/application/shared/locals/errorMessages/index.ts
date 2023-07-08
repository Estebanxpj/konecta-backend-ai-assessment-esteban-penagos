import { Resources } from "resources-tsk/lib";
import * as esLocal from "./es.json";
import * as enLocal from "./en.json";

import * as localKeys from "./keys.json";

const locals = {
  es: esLocal as Record<string, string>,
  en: enLocal as Record<string, string>,
};

const resourceKeys = localKeys as Record<string, string>;

const resources = new Resources(locals, resourceKeys);

export { resourceKeys };

export default resources;