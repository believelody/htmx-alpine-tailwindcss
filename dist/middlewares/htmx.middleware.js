"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkHTMXRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers['hx-request']) {
        req.ctx = Object.assign(Object.assign({}, req.ctx), { layout: null, fromHTMX: true });
    }
    // await new Promise(r => setTimeout(r, 2000));
    next();
});
exports.default = { checkHTMXRequest };
//# sourceMappingURL=htmx.middleware.js.map