"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postagem = void 0;
var Postagem = /** @class */ (function () {
    function Postagem(id, texto, curtidas, descrurtidas, data, perfil) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descrurtidas = descrurtidas;
        this._data = data;
        this._perfil = perfil;
    }
    Object.defineProperty(Postagem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "texto", {
        get: function () {
            return this._texto;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "curtidas", {
        get: function () {
            return this._curtidas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "descrurtidas", {
        get: function () {
            return this._descrurtidas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "perfil", {
        get: function () {
            return this._perfil;
        },
        enumerable: false,
        configurable: true
    });
    Postagem.prototype.curtir = function () {
        this._curtidas++;
    };
    Postagem.prototype.descurtir = function () {
        this._descrurtidas++;
    };
    Postagem.prototype.ehPopular = function () {
        return this._curtidas > this._descrurtidas * 1.5;
    };
    Postagem.prototype.toString = function () {
        var out = "\n---------------------------------------------------------------------------------------------    \n    ID: ".concat(this._id, "\n\n    Perfil: ").concat(this._perfil.nome, "\t\t\tData: ").concat(this._data, "\n    Texto: ").concat(this._texto, "\n\n    Curtidas\uD83D\uDC4D: ").concat(this._curtidas, "  \uD83D\uDC4E: ").concat(this._descrurtidas);
        return out;
    };
    return Postagem;
}());
exports.Postagem = Postagem;
