"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dummyDataURL = process.env.DUMMY_DATA_URL;
const port = process.env.PORT || 8000;
exports.default = { dummyDataURL, port };
//# sourceMappingURL=env.util.js.map