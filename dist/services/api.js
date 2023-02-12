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
const node_fetch_1 = __importDefault(require("node-fetch"));
const http_method_enum_1 = require("../enum/http-method.enum");
const utils_1 = __importDefault(require("../utils"));
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
function fetchApi(path, method, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchOptions = {
            method,
            headers: Object.assign({}, headers),
        };
        if (options.headers) {
            fetchOptions.headers = Object.assign(Object.assign({}, fetchOptions.headers), options.headers);
        }
        if (options.body) {
            fetchOptions.body = JSON.stringify(options.body);
        }
        const res = yield (0, node_fetch_1.default)(`${utils_1.default.env.dummyDataURL}${path}`, fetchOptions);
        const json = (yield res.json());
        return utils_1.default.error.handleFetchError(json);
    });
}
;
const api = {
    headers,
    setHeader: (key, value) => {
        headers[key] = value;
    },
    get(path, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetchApi(path, http_method_enum_1.HttpMethod.GET, options);
        });
    },
    post(path, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetchApi(path, http_method_enum_1.HttpMethod.POST, options);
        });
    },
    put(path, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetchApi(path, http_method_enum_1.HttpMethod.PUT, options);
        });
    },
    patch(path, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetchApi(path, http_method_enum_1.HttpMethod.PATCH, options);
        });
    },
    delete(path, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetchApi(path, http_method_enum_1.HttpMethod.DELETE, options);
        });
    },
    auth: {
        get(path, options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fetchApi(`/auth${path}`, http_method_enum_1.HttpMethod.GET, options);
            });
        },
        post(path, options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fetchApi(`/auth${path}`, http_method_enum_1.HttpMethod.POST, options);
            });
        },
        put(path, options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fetchApi(`/auth${path}`, http_method_enum_1.HttpMethod.PUT, options);
            });
        },
        patch(path, options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fetchApi(`/auth${path}`, http_method_enum_1.HttpMethod.PATCH, options);
            });
        },
        delete(path, options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fetchApi(`/auth${path}`, http_method_enum_1.HttpMethod.DELETE, options);
            });
        },
    }
};
exports.default = api;
//# sourceMappingURL=api.js.map