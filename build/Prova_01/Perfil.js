"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
var Perfil = /** @class */ (function () {
    function Perfil(id, nome, email) {
        this._id = id;
        this._nome = nome;
        this._email = email;
    }
    Object.defineProperty(Perfil.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Perfil.prototype.toString = function () {
        var out = "\n  ID: ".concat(this._id, "\n  Nome: ").concat(this._nome, "\n  Email: ").concat(this._email);
        return out;
    };
    return Perfil;
}());
exports.Perfil = Perfil;
