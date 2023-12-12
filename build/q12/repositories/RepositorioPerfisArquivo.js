"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPerfisArquivo = void 0;
var fs_utils_1 = require("../../utils/fs_utils");
var io_utils_1 = require("../../utils/io_utils");
var AppException_1 = require("../exceptions/AppException");
var Perfil_1 = require("../models/Perfil");
var RepositorioPerfisArquivo = /** @class */ (function () {
    function RepositorioPerfisArquivo() {
        this._linhasPerfil = [];
        this._carregarArquivo();
    }
    RepositorioPerfisArquivo.prototype.incluir = function (perfil) {
        if (this.existeNome(perfil.nome)) {
            throw new AppException_1.PerfilExistenteException("Um perfil com o nome \"".concat(perfil.nome, "\" j\u00E1 existe."));
        }
        var novoPerfil = "".concat(perfil.id, "#").concat(perfil.nome, "#").concat(perfil.email);
        this._linhasPerfil.push(novoPerfil);
        this._salvarArquivo();
        //`${perfil.id}#${perfil.nome}#${perfil.email}\n`
    };
    RepositorioPerfisArquivo.prototype.existeNome = function (nome) {
        for (var _i = 0, _a = this._linhasPerfil; _i < _a.length; _i++) {
            var linha = _a[_i];
            if (linha.includes(nome)) {
                return true;
            }
        }
        return false;
    };
    RepositorioPerfisArquivo.prototype.consultar = function (id, nome, email) {
        for (var _i = 0, _a = this._linhasPerfil; _i < _a.length; _i++) {
            var linha = _a[_i];
            var perfil = this._instanciarPerfil(linha);
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
    RepositorioPerfisArquivo.prototype.perfis = function () {
        if (this._linhasPerfil.length == 0) {
            throw new AppException_1.PerfilNaoEncontradoException("N\u00E3o foram encontrados perfis.");
        }
        var perfis = [];
        for (var _i = 0, _a = this._linhasPerfil; _i < _a.length; _i++) {
            var linha = _a[_i];
            try {
                perfis.push(this._instanciarPerfil(linha));
            }
            catch (e) {
                continue;
            }
        }
        return perfis;
    };
    RepositorioPerfisArquivo.prototype._salvarArquivo = function () {
        var dados = this._linhasPerfil.join('\n');
        (0, fs_utils_1.escreverArquivo)('../../q12/DataBase/perfis.txt', dados);
    };
    RepositorioPerfisArquivo.prototype._carregarArquivo = function () {
        var linhas = (0, fs_utils_1.lerArquivo)('../../q12/DataBase/perfis.txt');
        for (var _i = 0, linhas_1 = linhas; _i < linhas_1.length; _i++) {
            var linha = linhas_1[_i];
            if (linha == '') {
                continue;
            }
            this._linhasPerfil.push(linha);
        }
    };
    RepositorioPerfisArquivo.prototype._instanciarPerfil = function (dados) {
        var partes = dados.split('#');
        var id = partes[0];
        var nome = partes[1];
        var email = partes[2];
        if (!(0, io_utils_1.idValido)(id) || !(0, io_utils_1.ehEmail)(email)) {
            throw new AppException_1.PerfilInvalidoException("Dados do perfil não são validos!");
        }
        return new Perfil_1.Perfil(id, nome, email);
    };
    return RepositorioPerfisArquivo;
}());
exports.RepositorioPerfisArquivo = RepositorioPerfisArquivo;
/*
public carregarPerfis(): void {
    let linhasPerfil: string[] = lerArquivo('../../q12/DataBase/perfis.txt');

    let ocorrencias: number = 0;

    for (let linha of linhasPerfil){
      if ( linha == ''){
        continue;
      }

      let dados: string[] = linha.split("#");

      let id: string = dados[0];
      let nome: string = dados[1];
      let email: string = dados[2];

      if ( !idValido(id) || !ehEmail(email)){
        ocorrencias++;
        continue;
      }

      this._redeSocial.criarPerfil(id, nome, email);
    }

    print('Dados carregados com sucesso!');
    print(`Total de ocorrencias: ${ocorrencias}`);

  }

  public salvarPerfis(): void {
    let perfis: Perfil[]  = this._redeSocial.obterPerfis();

    if (perfis.length == 0){
      print('\nNenhum perfil para salvar!');

      return;
    }

    let dados: string = '';

    for ( let perfil of perfis ){
      dados += `${perfil.id}#${perfil.nome}#${perfil.email}\n`
    }

    dados = dados.slice(0, -1);

    escreverArquivo('../../q12/DataBase/perfis.txt', dados);
  }
*/ 
