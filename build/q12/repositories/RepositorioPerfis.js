"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPerfis = void 0;
var AppException_1 = require("../exceptions/AppException");
var RepositorioPerfis = /** @class */ (function () {
    function RepositorioPerfis() {
        this._perfis = [];
    }
    RepositorioPerfis.prototype.incluir = function (perfil) {
        if (this.existeNome(perfil.nome)) {
            throw new AppException_1.PerfilExistenteException("Um perfil com o nome \"".concat(perfil.nome, "\" j\u00E1 existe."));
        }
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
        // return null;
        throw new AppException_1.PerfilNaoEncontradoException("N\u00E3o foi encontrado um perfil com os dados informados.");
    };
    RepositorioPerfis.prototype.perfis = function () {
        if (this._perfis.length == 0) {
            throw new AppException_1.PerfisNaoEncontradosException("N\u00E3o foram encontrados perfis.");
        }
        return this._perfis;
    };
    return RepositorioPerfis;
}());
exports.RepositorioPerfis = RepositorioPerfis;
