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
        resolve([
            {
                name: 'Holden Caulfield',
                job: 'UI Designer',
                image: { src: 'https://dummyimage.com/80x80', alt: 'team' }
            },
            {
                name: 'Henry Letham',
                job: 'CTO',
                image: { src: 'https://dummyimage.com/84x84', alt: 'team' }
            },
            {
                name: 'Oskar Blinde',
                job: 'Blinde',
                image: { src: 'https://dummyimage.com/88x88', alt: 'team' }
            },
            {
                name: 'John Doe',
                job: 'DevOps',
                image: { src: 'https://dummyimage.com/94x94', alt: 'team' }
            },
            {
                name: 'Martin Eden',
                job: 'Software Engineer',
                image: { src: 'https://dummyimage.com/98x98', alt: 'team' }
            },
            {
                name: 'Boris Kitua',
                job: 'UX Researcher',
                image: { src: 'https://dummyimage.com/100x90', alt: 'team' }
            },
            {
                name: 'Atticus Finch',
                job: 'QA Engineer',
                image: { src: 'https://dummyimage.com/80x80', alt: 'team' }
            },
            {
                name: 'Alper Kamu',
                job: 'System',
                image: { src: 'https://dummyimage.com/104x94', alt: 'team' }
            },
            {
                name: 'Rodrigo Monchi',
                job: 'Product Manager',
                image: { src: 'https://dummyimage.com/108x98', alt: 'team' }
            },
        ]);
    });
});
exports.default = { fetchAll };
//# sourceMappingURL=index.js.map