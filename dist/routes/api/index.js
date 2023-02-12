"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscription_1 = __importDefault(require("./subscription"));
const user_1 = __importDefault(require("./user"));
const comment_1 = __importDefault(require("./comment"));
const reaction_1 = __importDefault(require("./reaction"));
const auth_1 = __importDefault(require("./auth"));
const contact_1 = __importDefault(require("./contact"));
const products_1 = __importDefault(require("./products"));
const router = express_1.default.Router();
router.use('/subscription', subscription_1.default);
router.use('/users', user_1.default);
router.use('/comments', comment_1.default);
router.use('/reaction', reaction_1.default);
router.use('/auth', auth_1.default);
router.use('/contact', contact_1.default);
router.use('/products', products_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map