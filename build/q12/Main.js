"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_utils_1 = require("../utils/io_utils");
var App_1 = require("./App");
var RepositorioPerfisArquivo_1 = require("./repositories/RepositorioPerfisArquivo");
var RepositorioPerfisArray_1 = require("./repositories/RepositorioPerfisArray");
var RepositorioPostagensArquivo_1 = require("./repositories/RepositorioPostagensArquivo");
var RepositorioPostagensArray_1 = require("./repositories/RepositorioPostagensArray");
function main() {
    (0, io_utils_1.print)('\nSelecione uma opção de persistência: ');
    var opcao = (0, io_utils_1.selecao)(['Array', 'Arquivo']);
    var repoPerfil;
    var repoPostagem;
    do {
        switch (opcao) {
            case 1:
                repoPerfil = new RepositorioPerfisArray_1.RepositorioPerfisArray();
                repoPostagem = new RepositorioPostagensArray_1.RepositorioPostagensArray();
                break;
            case 2:
                repoPerfil = new RepositorioPerfisArquivo_1.RepositorioPerfisArquivo();
                repoPostagem = new RepositorioPostagensArquivo_1.RepositorioPostagemArquivo(repoPerfil);
                break;
            case 0:
                console.log('Saindo...');
                return;
            default:
                (0, io_utils_1.print)('Opcao invalida');
                break;
        }
    } while (!repoPerfil || !repoPostagem);
    var app = new App_1.App(repoPerfil, repoPostagem);
    app.rodarAplicacao();
}
main();
