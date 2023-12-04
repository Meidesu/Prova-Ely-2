"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfisNaoEncontradosException = exports.PerfilExistenteException = exports.PerfilInvalidoException = exports.PerfilNaoEncontradoException = exports.PostagemInvalidaException = exports.PostagemNaoEncontradaException = exports.AppException = void 0;
var AppException = /** @class */ (function (_super) {
    __extends(AppException, _super);
    function AppException(message) {
        return _super.call(this, message) || this;
    }
    return AppException;
}(Error));
exports.AppException = AppException;
var PostagemNaoEncontradaException = /** @class */ (function (_super) {
    __extends(PostagemNaoEncontradaException, _super);
    function PostagemNaoEncontradaException(message) {
        return _super.call(this, message) || this;
    }
    return PostagemNaoEncontradaException;
}(AppException));
exports.PostagemNaoEncontradaException = PostagemNaoEncontradaException;
var PostagemInvalidaException = /** @class */ (function (_super) {
    __extends(PostagemInvalidaException, _super);
    function PostagemInvalidaException(message) {
        return _super.call(this, message) || this;
    }
    return PostagemInvalidaException;
}(AppException));
exports.PostagemInvalidaException = PostagemInvalidaException;
var PerfilNaoEncontradoException = /** @class */ (function (_super) {
    __extends(PerfilNaoEncontradoException, _super);
    function PerfilNaoEncontradoException(message) {
        return _super.call(this, message) || this;
    }
    return PerfilNaoEncontradoException;
}(AppException));
exports.PerfilNaoEncontradoException = PerfilNaoEncontradoException;
var PerfilInvalidoException = /** @class */ (function (_super) {
    __extends(PerfilInvalidoException, _super);
    function PerfilInvalidoException(message) {
        return _super.call(this, message) || this;
    }
    return PerfilInvalidoException;
}(AppException));
exports.PerfilInvalidoException = PerfilInvalidoException;
var PerfilExistenteException = /** @class */ (function (_super) {
    __extends(PerfilExistenteException, _super);
    function PerfilExistenteException(message) {
        return _super.call(this, message) || this;
    }
    return PerfilExistenteException;
}(AppException));
exports.PerfilExistenteException = PerfilExistenteException;
var PerfisNaoEncontradosException = /** @class */ (function (_super) {
    __extends(PerfisNaoEncontradosException, _super);
    function PerfisNaoEncontradosException(message) {
        return _super.call(this, message) || this;
    }
    return PerfisNaoEncontradosException;
}(AppException));
exports.PerfisNaoEncontradosException = PerfisNaoEncontradosException;
