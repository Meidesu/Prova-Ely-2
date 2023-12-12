"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPostagensArray = void 0;
var PostagemAvancada_1 = require("../models/PostagemAvancada");
var AppException_1 = require("../exceptions/AppException");
var RepositorioPostagensArray = /** @class */ (function () {
    function RepositorioPostagensArray() {
        this._postagem = [];
    }
    RepositorioPostagensArray.prototype.incluir = function (postagem) {
        this._postagem.push(postagem);
    };
    RepositorioPostagensArray.prototype.consultar = function (id, texto, hashtag, perfil) {
        var posts = [];
        // Retorna imediatamente o post encontrado se o id for informado
        if (id) {
            var post = this.consultarId(id);
            posts.push(post);
            return posts;
        }
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var post = _a[_i];
            if (hashtag) {
                if (post instanceof PostagemAvancada_1.PostagemAvancada) {
                    if (post.existeHashtag(hashtag)) {
                        posts.push(post);
                        continue;
                    }
                }
            }
            if (texto) {
                if (post.texto.includes(texto)) {
                    posts.push(post);
                    continue;
                }
            }
            if (perfil) {
                if (post.perfil == perfil) {
                    posts.push(post);
                    continue;
                }
            }
        }
        if (posts.length == 0) {
            throw new AppException_1.PostagemNaoEncontradaException("N\u00E3o foi encontrada uma postagem com os dados informados.");
        }
        return posts;
    };
    RepositorioPostagensArray.prototype.consultarId = function (id) {
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            // Verifica se o id é igual
            if (postagem.id == id) {
                // Se for uma postagem avançada, verifica se ainda tem visualizações
                if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                    if (postagem.visualizacoesRestantes > 0) {
                        return postagem;
                    }
                    throw new AppException_1.PostagemInvalidaException("Postagem n\u00E3o pode ser visualizada pois n\u00E3o possui mais visualiza\u00E7\u00F5es dispon\u00EDveis.");
                }
                // Se não for uma postagem avançada, retorna a postagem
                return postagem;
            }
        }
        throw new AppException_1.PostagemNaoEncontradaException("N\u00E3o foi encontrada uma postagem com o id informado.");
    };
    RepositorioPostagensArray.prototype.consultarPorHashtag = function (hashtag) {
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                // Se não tiver mais visualizações, não adiciona
                if (postagem.visualizacoesRestantes <= 0) {
                    continue;
                }
                // Se tiver a hashtag, adiciona
                if (postagem.existeHashtag(hashtag)) {
                    posts.push(postagem);
                }
            }
        }
        if (posts.length == 0) {
            throw new AppException_1.PostagemNaoEncontradaException("N\u00E3o foi encontrada uma postagem com a hashtag informada.");
        }
        return posts;
    };
    RepositorioPostagensArray.prototype.consultarPorPerfil = function (perfil) {
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.perfil == perfil) {
                // Se for uma postagem avançada, verifica se ainda tem visualizações
                if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                    // Se não tiver mais visualizações, não adiciona
                    if (postagem.visualizacoesRestantes <= 0) {
                        continue;
                    }
                }
                posts.push(postagem);
            }
        }
        if (posts.length == 0) {
            throw new AppException_1.PostagemNaoEncontradaException("N\u00E3o foi encontrada uma postagem com o perfil informado.");
        }
        return posts;
    };
    RepositorioPostagensArray.prototype.existeId = function (id) {
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                return true;
            }
        }
        return false;
    };
    RepositorioPostagensArray.prototype.obterPostagens = function () {
        // Obter apenas os perfis com visualizações resdtantes
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.visualizacoesRestantes <= 0) {
                    continue;
                }
            }
            posts.push(postagem);
        }
        if (posts.length == 0) {
            throw new AppException_1.PostagemNaoEncontradaException("N\u00E3o foi encontrada nenhuma postagem.");
        }
        return posts;
    };
    return RepositorioPostagensArray;
}());
exports.RepositorioPostagensArray = RepositorioPostagensArray;
