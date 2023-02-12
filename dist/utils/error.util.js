"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code500 = "Error: something went wrong.";
const handleFetchError = (data) => {
    if (data.message) {
        console.log("Error message : ", data.message);
        throw data.message;
    }
    if (data.name) {
        console.log("Error code : ", data.code);
        throw data.name;
    }
    return data;
};
const handleHttpError = (req, next, cb) => {
    try {
        cb();
    }
    catch (error) {
        console.log(`In ${req.originalUrl} route : ${error}`);
        next(error);
    }
};
exports.default = { code500, handleFetchError, handleHttpError };
//# sourceMappingURL=error.util.js.map