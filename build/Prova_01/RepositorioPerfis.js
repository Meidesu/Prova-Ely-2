"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPerfis = void 0;
var RepositorioPerfis = /** @class */ (function () {
    function RepositorioPerfis() {
        this._perfis = [];
    }
    RepositorioPerfis.prototype.incluir = function (perfil) {
        this._perfis.push(perfil);
    };
    RepositorioPerfis.prototype.existeNome = function (nome) {
        for (var _i = 0, _a = this._perfis; _i < _a.length; _i++) {
            var perfil = _a[_i];
            if (perfil.nome == nome) {
                return true;
            }
        }
        return false;
    };
    RepositorioPerfis.prototype.consultar = function (id, nome, email) {
        for (var _i = 0, _a = this._perfis; _i < _a.length; _i++) {
            var perfil = _a[_i];
            if (id) {
                if (perfil.id == id) {
                    return perfil;
                }
            }
            if (nome) {
                if (perfil.nome == nome) {
                    return perfil;
                }
            }
            if (email) {
                if (perfil.email == email) {
                    return perfil;
                }
            }
        }
        return null;
    };
    Object.defineProperty(RepositorioPerfis.prototype, "perfis", {
        get: function () {
            return this._perfis;
        },
        enumerable: false,
        configurable: true
    });
    return RepositorioPerfis;
}());
exports.RepositorioPerfis = RepositorioPerfis;
