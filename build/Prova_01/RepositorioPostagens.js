"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPostagens = void 0;
var PostagemAvancada_1 = require("./PostagemAvancada");
var RepositorioPostagens = /** @class */ (function () {
    function RepositorioPostagens() {
        this._postagem = [];
    }
    RepositorioPostagens.prototype.incluir = function (postagem) {
        this._postagem.push(postagem);
    };
    RepositorioPostagens.prototype.consultar = function (id, texto, hashtag, perfil) {
        var posts = [];
        if (id) {
            var post = this.consultarId(id);
            if (post != null) {
                posts.push(post);
                return posts;
            }
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
                console.log("1ele ta puxando por texto dd");
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
            return null;
        }
        return posts;
    };
    RepositorioPostagens.prototype.consultarId = function (id) {
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                    if (postagem.visualizacoesRestantes <= 0) {
                        return null;
                    }
                }
                return postagem;
            }
        }
        return null;
    };
    RepositorioPostagens.prototype.consultarPorHashtag = function (hashtag) {
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.visualizacoesRestantes <= 0) {
                    continue;
                }
                if (postagem.existeHashtag(hashtag)) {
                    posts.push(postagem);
                }
            }
        }
        return posts;
    };
    RepositorioPostagens.prototype.consultarPorPerfil = function (perfil) {
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.perfil == perfil) {
                if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                    if (postagem.visualizacoesRestantes <= 0) {
                        continue;
                    }
                }
                posts.push(postagem);
            }
        }
        return posts;
    };
    // public consultarTexto(texto: string): Postagem[] | null{
    //   let posts: Postagem[] = [];
    //   for (let postagem of this._postagem){
    //     if (postagem.texto.includes(texto)){
    //       posts.push(postagem);
    //     }
    //   }
    //   if (posts.length == 0){
    //     return null;
    //   }
    //   return posts;
    // }
    RepositorioPostagens.prototype.existeId = function (id) {
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                return true;
            }
        }
        return false;
    };
    RepositorioPostagens.prototype.obterPostagens = function () {
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
            return null;
        }
        return posts;
    };
    return RepositorioPostagens;
}());
exports.RepositorioPostagens = RepositorioPostagens;
/*consultar(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] {
  return this.postagens.filter(
    (postagem) =>
      (!id || postagem.id === id) &&
      (!texto || postagem.texto.includes(texto)) &&
      (!hashtag || postagem.hashtag === hashtag) &&
      (!perfil || postagem.perfil.id === perfil.id)
  ); */
/*
class RepositorioDePostagens {
private postagens: Postagem[] = [];

incluir(postagem: Postagem): void {
  this.postagens.push(postagem);
}

consultar(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] {
  // Crie um array para armazenar as postagens que atendem aos critérios da consulta.
  const postagensFiltradas: Postagem[] = [];

  for (const postagem of this.postagens) {
    // Verifique se a postagem é do tipo PostagemAvancada e se ela corresponde aos critérios.
    if (postagem instanceof PostagemAvancada) {
      const postagemAvancada = postagem as PostagemAvancada;

      // Verifique os critérios de consulta
      const idMatch = id === undefined || postagemAvancada.id === id;
      const textoMatch = texto === undefined || postagemAvancada.texto.includes(texto);
      const hashtagMatch = hashtag === undefined || postagemAvancada.hashtags.includes(hashtag);
      const perfilMatch = perfil === undefined || postagemAvancada.perfil === perfil;

      // Se todos os critérios correspondem, adicione a postagem ao array de postagens filtradas.
      if (idMatch && textoMatch && hashtagMatch && perfilMatch) {
        postagensFiltradas.push(postagem);
      }
    }
  }

  return postagensFiltradas;
}
}

*/ 
