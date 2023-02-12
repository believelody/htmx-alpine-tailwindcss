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
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        resolve([...Array(12)].map((_, index) => ({
            src: `https://dummyimage.com/72${index}x40${index}`,
            alt: "content " + (index + 1),
            title: "Chichen Itza",
            subtitle: "SUBTITLE",
            content: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche."
        })));
    });
});
exports.default = { fetchAll };
//# sourceMappingURL=index.js.map