"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
var Postagem_1 = require("./Postagem");
var Perfil_1 = require("./Perfil");
var PostagemAvancada_1 = require("./PostagemAvancada");
var RepositorioPostagens_1 = require("./RepositorioPostagens");
var RepositorioPerfis_1 = require("./RepositorioPerfis");
var RedeSocial = /** @class */ (function () {
    function RedeSocial() {
        this._repositorioPerfis = new RepositorioPerfis_1.RepositorioPerfis();
        this._repositorioPostagens = new RepositorioPostagens_1.RepositorioPostagens();
    }
    RedeSocial.prototype.criarPerfil = function (id, nome, email) {
        var novoPerfil = new Perfil_1.Perfil(id, nome, email);
        this.incluirPerfil(novoPerfil);
    };
    RedeSocial.prototype.incluirPerfil = function (perfil) {
        if (perfil.id && perfil.nome && perfil.email) {
            this._repositorioPerfis.incluir(perfil);
        }
    };
    RedeSocial.prototype.consultarPerfil = function (id, nome, email) {
        return this._repositorioPerfis.consultar(id, nome, email);
    };
    RedeSocial.prototype.criarPostagem = function (id, texto, data, perfil, curtidas, descrurtidas, hashtags, visuRestantes) {
        if (curtidas === void 0) { curtidas = 0; }
        if (descrurtidas === void 0) { descrurtidas = 0; }
        var postagem;
        if (hashtags && visuRestantes) {
            postagem = new PostagemAvancada_1.PostagemAvancada(id, texto, curtidas, descrurtidas, data, perfil, hashtags, visuRestantes);
            this.incluirPostagem(postagem);
            return;
        }
        postagem = new Postagem_1.Postagem(id, texto, curtidas, descrurtidas, data, perfil);
        this.incluirPostagem(postagem);
    };
    RedeSocial.prototype.incluirPostagem = function (postagem) {
        if (!postagem.id || this._repositorioPostagens.existeId(postagem.id)) {
            return;
        }
        if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
            if (postagem.hashtags.length == 0) {
                return;
            }
        }
        if (!postagem.texto || postagem.texto.length == 0) {
            return;
        }
        if (!postagem.perfil) {
            return;
        }
        this._repositorioPostagens.incluir(postagem);
    };
    RedeSocial.prototype.consultarPostagens = function (id, texto, hashtag, perfil) {
        var postagens = this._repositorioPostagens.consultar(id, texto, hashtag, perfil);
        if (postagens) {
            // postagens = postagens.filter(postagem => { if (postagem instanceof PostagemAvancada) {
            //     return postagem.visualizacoesRestantes > 0;
            // }});
            this.decrementarVisualizacoes(postagens);
            return postagens;
        }
        return null;
    };
    RedeSocial.prototype.curtir = function (idPostagem) {
        var postagem = this._repositorioPostagens.consultarId(idPostagem);
        if (postagem) {
            postagem.curtir();
        }
    };
    RedeSocial.prototype.descurtir = function (idPostagem) {
        var postagem = this._repositorioPostagens.consultarId(idPostagem);
        if (postagem) {
            postagem.descurtir();
        }
    };
    RedeSocial.prototype.decrementarVisualizacoes = function (postagens) {
        for (var _i = 0, postagens_1 = postagens; _i < postagens_1.length; _i++) {
            var postagem = postagens_1[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                postagem.decrementarVisualizacoes();
            }
        }
    };
    RedeSocial.prototype.exibirPostagensPorPerfil = function (id) {
        var perfil = this._repositorioPerfis.consultar(id);
        var postagens = [];
        if (!perfil) {
            return null;
        }
        postagens = this._repositorioPostagens.consultarPorPerfil(perfil);
        if (postagens) {
            this.decrementarVisualizacoes(postagens);
            return postagens;
        }
        return null;
    };
    RedeSocial.prototype.exibirPostagensPorHashtag = function (hashtag) {
        var postagens = this._repositorioPostagens.consultarPorHashtag(hashtag);
        if (!postagens) {
            return null; // Retorna um array vazio se não houver postagens com a hashtag
        }
        this.decrementarVisualizacoes(postagens); // decrementa as visualizações das postagens
        return postagens; // Retorna o array com as postagens que possuem a hashtag
    };
    RedeSocial.prototype.existePerfil = function (nome) {
        return this._repositorioPerfis.existeNome(nome);
    };
    RedeSocial.prototype.obterPerfis = function () {
        return this._repositorioPerfis.perfis;
    };
    RedeSocial.prototype.obterPostagens = function () {
        return this._repositorioPostagens.obterPostagens();
    };
    RedeSocial.prototype.obterPostagensPopular = function () {
        var postagens = this.obterPostagens();
        var postagensPop = [];
        if (!postagens) {
            return null;
        }
        for (var _i = 0, postagens_2 = postagens; _i < postagens_2.length; _i++) {
            var post = postagens_2[_i];
            if (post.ehPopular()) {
                postagensPop.push(post);
            }
        }
        if (!postagensPop)
            return null;
        return postagensPop;
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;
