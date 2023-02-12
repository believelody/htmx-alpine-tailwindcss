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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../../../middlewares"));
const services_1 = __importDefault(require("../../../services"));
const utils_1 = __importDefault(require("../../../utils"));
const router = express_1.default.Router();
router.get('/post/:id', middlewares_1.default.http.numericParamsValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const { comments, total, limit } = yield services_1.default.post.fetchPostComments(Number(req.params.id));
    return res.render("partials/comment/list", Object.assign(Object.assign({}, req.ctx), { postId: req.params.id, comments, meta: { total, limit } }));
})));
router.post('/post', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    const post = JSON.parse(req.body.post);
    const { userId, comment } = req.body;
    // await new Promise(resolve => setTimeout(resolve, 3000));
    yield services_1.default.user.me.commentPost({
        userId,
        postId: post.id,
        body: comment
    });
    res.setHeader('HX-Trigger', 'add-comment');
    return res.render("partials/form/comment", Object.assign(Object.assign({}, req.ctx), { post }));
})));
exports.default = router;
//# sourceMappingURL=index.js.map