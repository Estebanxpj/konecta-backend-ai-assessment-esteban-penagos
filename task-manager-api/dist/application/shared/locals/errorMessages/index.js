"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceKeys = void 0;
const lib_1 = require("resources-tsk/lib");
const esLocal = require("./es.json");
const enLocal = require("./en.json");
const localKeys = require("./keys.json");
const locals = {
    es: esLocal,
    en: enLocal,
};
const resourceKeys = localKeys;
exports.resourceKeys = resourceKeys;
const resources = new lib_1.Resources(locals, resourceKeys);
exports.default = resources;
//# sourceMappingURL=index.js.map