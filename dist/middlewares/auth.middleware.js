"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setCheckAuthAsHxTrigger = (req, res, next) => {
    if (req.method === "GET" && !req.originalUrl.includes("/api")) {
        res.setHeader('HX-Trigger', 'check-auth');
    }
    next();
};
const checkAuthenticatedUserAndRedirect = (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        return res.redirect("/");
    }
    next();
};
const checkUnauthenticatedUserAndRedirect = (req, res, next) => {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)) {
        if ((_b = req.ctx) === null || _b === void 0 ? void 0 : _b.fromHTMX) {
            res.setHeader('HX-Push', '/login');
            res.statusCode = 401;
            return res.render("pages/login", Object.assign(Object.assign({}, req.ctx), { title: "Login" }));
        }
        else {
            return res.redirect('/login');
        }
    }
    next();
};
const populateMeInContext = (req, res, next) => {
    var _a;
    if ((_a = req.ctx) === null || _a === void 0 ? void 0 : _a.isAuthenticated) {
        req.ctx = Object.assign(Object.assign({}, req.ctx), { me: true });
    }
    next();
};
exports.default = { setCheckAuthAsHxTrigger, checkAuthenticatedUserAndRedirect, checkUnauthenticatedUserAndRedirect, populateMeInContext };
//# sourceMappingURL=auth.middleware.js.map