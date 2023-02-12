"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
const numericParamsValidator = (req, res, next) => {
    Object.values(req.params).forEach(value => {
        if (!value.match(/[0-9]/g)) {
            throw new Error("id params is not a numeric value");
        }
    });
    next();
};
const error500Handler = (error, req, res, next) => {
    var _a;
    console.log("error 500 : ", error);
    switch (error) {
        case 'TokenExpiredError':
            (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(err => {
                if (err) {
                    throw err;
                }
            });
            ["session_user", "session_token", "session_remember"].forEach((sessionItem) => res.clearCookie(sessionItem));
            return res.redirect('/login');
        default:
            return res.status(500).send({ '500': true });
    }
};
const error404NotFound = (req, res, next) => {
    return res.status(404).send({ 'not-found': true });
};
const popupalteCurrentURLInContext = (req, res, next) => {
    if (!req.originalUrl.includes("/api")) {
        if (req.session) {
            req.session.currentURLPathname = req.originalUrl;
        }
        ;
        req.ctx = Object.assign(Object.assign({}, req.ctx), { currentURLPathname: `${req.originalUrl}` });
    }
    next();
};
const limitQueryValidator = (req, res, next) => {
    var _a;
    if (req.query.limit && !utils_1.default.http.limitQueryArray.includes(Number(req.query.limit))) {
        if ((_a = req === null || req === void 0 ? void 0 : req.ctx) === null || _a === void 0 ? void 0 : _a.fromHTMX) {
            throw new Error("There is a problem with limit value");
        }
        if (req.ctx) {
            req.ctx.error = utils_1.default.error.code500;
        }
        res.statusCode = 500;
    }
    next();
};
exports.default = { numericParamsValidator, error500Handler, error404NotFound, limitQueryValidator, popupalteCurrentURLInContext };
//# sourceMappingURL=http.middleware.js.map