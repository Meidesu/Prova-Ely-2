"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var RedeSocial_1 = require("./RedeSocial");
var io_utils_1 = require("../utils/io_utils");
var fs_utils_1 = require("../utils/fs_utils");
var PostagemAvancada_1 = require("./models/PostagemAvancada");
var App = /** @class */ (function () {
    function App(repoPerfil, repoPost) {
        this._redeSocial = new RedeSocial_1.RedeSocial(repoPerfil, repoPost);
    }
    App.prototype.rodarAplicacao = function () {
        this.carregarPerfis();
        this.carregarPostagens();
        (0, io_utils_1.limparConsole)();
        (0, io_utils_1.exibirTitulo)();
        var menu = [
            'Incluir perfil',
            'Consultar perfil',
            'Incluir Postagem',
            'Consultar postagem',
            'Exibir postagens do perfil',
            'Curtir/descurtir postagem',
            'Exibir postagens populares'
        ];
        var opcao = (0, io_utils_1.selecao)(menu);
        while (opcao != 0) {
            try {
                switch (opcao) {
                    case 1:
                        this.incluirPerfil();
                        break;
                    case 2:
                        this.consultarPerfil();
                        break;
                    case 3:
                        this.incluirPostagem();
                        break;
                    case 4:
                        this.consultarPostagem();
                        break;
                    case 5:
                        this.exibirPostagensPorPerfil();
                        break;
                    case 6:
                        this.curtirDescurtirPostagem();
                        break;
                    case 7:
                        this.exibirPostagensPopulares();
                        break;
                }
            }
            catch (e) {
                (0, io_utils_1.print)(e.message);
            }
            this.salvarPerfis();
            this.salvarPostagens();
            (0, io_utils_1.continuar)();
            (0, io_utils_1.exibirTitulo)();
            opcao = (0, io_utils_1.selecao)(menu);
        }
        (0, io_utils_1.print)('Fim do programa!');
        this.salvarPerfis();
        this.salvarPostagens();
    };
    App.prototype.incluirPerfil = function () {
        var id = (0, io_utils_1.gerarId)();
        var nome = (0, io_utils_1.input)('Nome do perfil: ');
        var email = (0, io_utils_1.inputEmail)('Email valido: ');
        this._redeSocial.criarPerfil(id, nome, email);
    };
    App.prototype.consultarPerfil = function () {
        var menu = ['Pesquisar por ID', 'Pesquisar por nome', 'Pesquisar por email'];
        var opcao = (0, io_utils_1.selecao)(menu);
        var id;
        var nome;
        var email;
        switch (opcao) {
            case 1:
                id = (0, io_utils_1.inputId)('Informe o ID: ');
                break;
            case 2:
                nome = (0, io_utils_1.input)('Informe o nome: ');
                break;
            case 3:
                email = (0, io_utils_1.inputEmail)('Informe o email: ');
                break;
        }
        var perfil = this._redeSocial.consultarPerfil(id, nome, email);
        if (perfil) {
            (0, io_utils_1.print)(perfil.toString());
        }
        else {
            (0, io_utils_1.print)("Perfil não encontrado!");
        }
    };
    App.prototype.incluirPostagem = function () {
        var perfil = this.selecionarPerfil();
        if (!perfil) {
            (0, io_utils_1.print)('Nao e possivel criar uma postagem, pois nao ha perfis cadastrados');
            return;
        }
        var id = (0, io_utils_1.gerarId)();
        var texto = (0, io_utils_1.input)('Texto: ');
        var data = new Date().toLocaleString();
        var hashtags;
        var visualizacoesRestantes;
        var ehAvancada = (0, io_utils_1.simOuNao)('Deseja adicionar hashtags?');
        if (ehAvancada) {
            hashtags = [];
            visualizacoesRestantes = 1;
            var opcao = void 0;
            do {
                hashtags.push((0, io_utils_1.input)('#'));
                opcao = (0, io_utils_1.selecao)(['Adicionar outra']);
            } while (opcao != 0);
        }
        this._redeSocial.criarPostagem(id, texto, data, perfil, 0, 0, hashtags, visualizacoesRestantes);
        (0, io_utils_1.print)('\nPostagem criada com sucesso!');
    };
    App.prototype.consultarPostagem = function () {
        var menu = ['Pesquisar por ID', 'Pesquisar por texto', 'Pesquisar por hashtag', 'Pesquisar por perfil'];
        var opcao = (0, io_utils_1.selecao)(menu);
        var id;
        var texto;
        var hashtags;
        var perfil;
        switch (opcao) {
            case 1:
                id = (0, io_utils_1.inputId)('Informe o ID: ');
                break;
            case 2:
                texto = (0, io_utils_1.input)('Informe o texto: ');
                break;
            case 3:
                hashtags = (0, io_utils_1.input)('Informe a hashtag: #');
                break;
            case 4:
                var perfilSelecionado = this.selecionarPerfil();
                perfil = perfilSelecionado;
                break;
        }
        var postagem = this._redeSocial.consultarPostagens(id, texto, hashtags, perfil);
        postagem.forEach(function (post) {
            (0, io_utils_1.print)(post.toString());
        });
    };
    App.prototype.selecionarPerfil = function () {
        var perfis = this._redeSocial.obterPerfis();
        var nomesPerfis = [];
        for (var _i = 0, perfis_1 = perfis; _i < perfis_1.length; _i++) {
            var perfil_1 = perfis_1[_i];
            nomesPerfis.push(perfil_1.nome);
        }
        (0, io_utils_1.print)('Escolha o perfil associado: ');
        var indice = (0, io_utils_1.selecao)(nomesPerfis);
        var perfil = perfis[indice - 1];
        return perfil;
    };
    App.prototype.exibirPostagensPorPerfil = function () {
        var perfil = this.selecionarPerfil();
        var postagens = this._redeSocial.exibirPostagensPorPerfil(perfil.id);
        postagens.forEach(function (post) {
            (0, io_utils_1.print)(post.toString());
        });
    };
    App.prototype.carregarPerfis = function () {
        var linhasPerfil = (0, fs_utils_1.lerArquivo)('../../q12/DataBase/perfis.txt');
        var ocorrencias = 0;
        for (var _i = 0, linhasPerfil_1 = linhasPerfil; _i < linhasPerfil_1.length; _i++) {
            var linha = linhasPerfil_1[_i];
            if (linha == '') {
                continue;
            }
            var dados = linha.split("#");
            var id = dados[0];
            var nome = dados[1];
            var email = dados[2];
            if (!(0, io_utils_1.idValido)(id) || !(0, io_utils_1.ehEmail)(email)) {
                ocorrencias++;
                continue;
            }
            this._redeSocial.criarPerfil(id, nome, email);
        }
        (0, io_utils_1.print)('Dados carregados com sucesso!');
        (0, io_utils_1.print)("Total de ocorrencias: ".concat(ocorrencias));
    };
    App.prototype.salvarPerfis = function () {
        var perfis = this._redeSocial.obterPerfis();
        if (perfis.length == 0) {
            (0, io_utils_1.print)('\nNenhum perfil para salvar!');
            return;
        }
        var dados = '';
        for (var _i = 0, perfis_2 = perfis; _i < perfis_2.length; _i++) {
            var perfil = perfis_2[_i];
            dados += "".concat(perfil.id, "#").concat(perfil.nome, "#").concat(perfil.email, "\n");
        }
        dados = dados.slice(0, -1);
        (0, fs_utils_1.escreverArquivo)('../../q12/DataBase/perfis.txt', dados);
    };
    App.prototype.carregarPostagens = function () {
        var linhasPostagem = (0, fs_utils_1.lerArquivo)('../../q12/DataBase/postagens.txt');
        var ocorrencias = 0;
        for (var _i = 0, linhasPostagem_1 = linhasPostagem; _i < linhasPostagem_1.length; _i++) {
            var linha = linhasPostagem_1[_i];
            if (linha == '') {
                continue;
            }
            var dados = linha.split("#");
            //01HEJ8RK0P54BCKAD3BPQ1XDG7#exemplo sem tags#exemplo sem tags#0#0#06/11/2023 09:12:21#01HEH3A28CNFF0SKG9PYB4ZERNP
            var id = dados[0];
            var texto = dados[1];
            var curtidas = Number(dados[2]);
            var descurtidas = Number(dados[3]);
            var data = dados[4];
            var idPerfil = dados[5];
            var tipo = dados[6];
            var hashtags = void 0;
            var visuRestantes = void 0;
            var perfil = void 0;
            if (tipo == 'PA') {
                hashtags = dados[7].split('-');
                visuRestantes = Number(dados[8]);
            }
            if (!(0, io_utils_1.idValido)(id) || !(0, io_utils_1.idValido)(idPerfil)) {
                ocorrencias++;
                continue;
            }
            try {
                perfil = this._redeSocial.consultarPerfil(idPerfil);
            }
            catch (e) {
                ocorrencias++;
                continue;
            }
            this._redeSocial.criarPostagem(id, texto, data, perfil, curtidas, descurtidas, hashtags, visuRestantes);
        }
        (0, io_utils_1.print)('\nPostagens carregados com sucesso!');
        (0, io_utils_1.print)("Total de ocorrencias: ".concat(ocorrencias));
    };
    App.prototype.salvarPostagens = function () {
        // 3456YGDE3456Y#texto#curtidas#descurtidas#data#idPerfil#P/PA#hash-hash2-hash3#visurestantes
        var postagens;
        try {
            postagens = this._redeSocial.obterPostagens();
        }
        catch (e) {
            (0, io_utils_1.print)('\nNenhuma postagem para salvar!');
            return;
        }
        var dados = '';
        for (var _i = 0, postagens_1 = postagens; _i < postagens_1.length; _i++) {
            var post = postagens_1[_i];
            var tipo = 'P';
            dados += "".concat(post.id, "#").concat(post.texto, "#").concat(post.curtidas, "#").concat(post.descrurtidas, "#").concat(post.data, "#").concat(post.perfil.id);
            if (post instanceof PostagemAvancada_1.PostagemAvancada) {
                tipo = 'PA';
                var hastags = '';
                // Dividir as hashtags
                for (var _a = 0, _b = post.hashtags; _a < _b.length; _a++) {
                    var tag = _b[_a];
                    hastags += "".concat(tag, "-");
                }
                hastags = hastags.slice(0, -1);
                dados += "#".concat(tipo, "#").concat(hastags, "#").concat(post.visualizacoesRestantes, "\n");
            }
            else {
                dados += "#".concat(tipo, "\n");
            }
        }
        dados = dados.slice(0, -1);
        (0, fs_utils_1.escreverArquivo)('../../q12/DataBase/postagens.txt', dados);
    };
    App.prototype.selecionarPostagem = function () {
        var postagens = this._redeSocial.obterPostagens();
        var opcoes = [];
        for (var _i = 0, postagens_2 = postagens; _i < postagens_2.length; _i++) {
            var post_1 = postagens_2[_i];
            opcoes.push(post_1.toString());
        }
        (0, io_utils_1.print)('Escolha o perfil associado: ');
        var indice = (0, io_utils_1.selecao)(opcoes);
        var post = postagens[indice - 1];
        return post;
    };
    App.prototype.curtirDescurtirPostagem = function () {
        var postagem = this.selecionarPostagem();
        var opcao = (0, io_utils_1.selecao)(['Curtir', 'Descurtir']);
        switch (opcao) {
            case 1:
                this._redeSocial.curtir(postagem.id);
                break;
            case 2:
                this._redeSocial.descurtir(postagem.id);
                break;
        }
        (0, io_utils_1.print)(postagem.toString());
    };
    App.prototype.exibirPostagensPopulares = function () {
        var postagensPop = this._redeSocial.obterPostagensPopular();
        if (postagensPop.length == 0) {
            (0, io_utils_1.print)('Nenhuma postagem popular para exibir!');
            return;
        }
        postagensPop.forEach(function (post) {
            (0, io_utils_1.print)(post.toString());
        });
    };
    return App;
}()); // final da classe 
exports.App = App;
