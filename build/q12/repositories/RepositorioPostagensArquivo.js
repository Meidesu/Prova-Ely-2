"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPostagemArquivo = void 0;
var fs_utils_1 = require("../../utils/fs_utils");
var io_utils_1 = require("../../utils/io_utils");
var AppException_1 = require("../exceptions/AppException");
var Postagem_1 = require("../models/Postagem");
var PostagemAvancada_1 = require("../models/PostagemAvancada");
var RepositorioPostagemArquivo = /** @class */ (function () {
    function RepositorioPostagemArquivo(repoPerfil) {
        this._linhasPost = [];
        this._postagens = [];
        this._repoPerfil = repoPerfil;
        this._carregarArquivo();
    }
    RepositorioPostagemArquivo.prototype.incluir = function (postagem) {
        this._postagens.push(postagem);
        this._salvarArquivo();
    };
    RepositorioPostagemArquivo.prototype.consultar = function (id, texto, hashtag, perfil) {
        var posts = [];
        // Retorna imediatamente o post encontrado se o id for informado
        if (id) {
            var post = this.consultarId(id);
            posts.push(post);
            return posts;
        }
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
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
                if (post.perfil.id == perfil.id) {
                    console.log('São iguais');
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
    RepositorioPostagemArquivo.prototype.consultarId = function (id) {
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
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
    RepositorioPostagemArquivo.prototype.consultarPorHashtag = function (hashtag) {
        var posts = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
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
    RepositorioPostagemArquivo.prototype.consultarPorPerfil = function (perfil) {
        var posts = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
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
    RepositorioPostagemArquivo.prototype.existeId = function (id) {
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                return true;
            }
        }
        return false;
    };
    RepositorioPostagemArquivo.prototype.obterPostagens = function () {
        var posts = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
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
    RepositorioPostagemArquivo.prototype._salvarArquivo = function () {
        // let dados: string = this._linhasPost.join('\n');
        // TODO: adicionar aqui partindo do array de postagens
        var dados = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            var novoPost = "".concat(postagem.id, "#").concat(postagem.texto, "#").concat(postagem.curtidas, "#").concat(postagem.descrurtidas, "#").concat(postagem.data, "#").concat(postagem.perfil.id);
            var tipo = 'P';
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                tipo = 'PA';
                var hastags = postagem.hashtags.join('-');
                novoPost += "#".concat(tipo, "#").concat(hastags, "#").concat(postagem.visualizacoesRestantes);
            }
            else {
                novoPost += "#".concat(tipo);
            }
            dados.push(novoPost);
        }
        (0, fs_utils_1.escreverArquivo)('../../q12/DataBase/postagens.txt', dados.join('\n'));
    };
    RepositorioPostagemArquivo.prototype._carregarArquivo = function () {
        var linhas = (0, fs_utils_1.lerArquivo)('../../q12/DataBase/postagens.txt');
        for (var _i = 0, linhas_1 = linhas; _i < linhas_1.length; _i++) {
            var linha = linhas_1[_i];
            if (linha == '') {
                continue;
            }
            this._postagens.push(this._instanciarPostagem(linha));
        }
    };
    RepositorioPostagemArquivo.prototype._instanciarPostagem = function (dados) {
        var partes = dados.split('#');
        var id = partes[0];
        var texto = partes[1];
        var curtidas = Number(partes[2]);
        var descurtidas = Number(partes[3]);
        var data = partes[4];
        var idPerfil = partes[5];
        var tipo = partes[6];
        var hashtags;
        var visuRestantes;
        var perfil;
        if (!(0, io_utils_1.idValido)(id) || !(0, io_utils_1.idValido)(idPerfil)) {
            throw new AppException_1.PerfilInvalidoException("Ids do post não são validos!");
        }
        try {
            perfil = this._repoPerfil.consultar(idPerfil);
        }
        catch (e) {
            throw new AppException_1.PerfilInvalidoException("Dados do post não são validos!");
        }
        if (tipo == 'PA') {
            hashtags = partes[7].split('-');
            visuRestantes = Number(partes[8]);
            return new PostagemAvancada_1.PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtags, visuRestantes);
        }
        else {
            return new Postagem_1.Postagem(id, texto, curtidas, descurtidas, data, perfil);
        }
    };
    return RepositorioPostagemArquivo;
}());
exports.RepositorioPostagemArquivo = RepositorioPostagemArquivo;
/*
  public carregarPostagens(): void {
    let linhasPostagem: string[] = lerArquivo('../../q12/DataBase/postagens.txt');

    let ocorrencias: number = 0;

    for (let linha of linhasPostagem){
      if ( linha == ''){
        continue;
      }

      let dados: string[] = linha.split("#");
      
//01HEJ8RK0P54BCKAD3BPQ1XDG7#exemplo sem tags#exemplo sem tags#0#0#06/11/2023 09:12:21#01HEH3A28CNFF0SKG9PYB4ZERNP

      let id: string = dados[0];
      let texto: string = dados[1];
      let curtidas: number = Number(dados[2]);
      let descurtidas: number = Number(dados[3]);
      let data: string = dados[4];
      let idPerfil: string = dados[5];
      let tipo: string = dados[6];
      let hashtags: string[]|undefined;
      let visuRestantes: number|undefined;
      let perfil: Perfil

      if ( tipo == 'PA' ){
        
        hashtags = dados[7].split('-');
        visuRestantes = Number(dados[8]);
      }

      if ( !idValido(id) || !idValido(idPerfil)){
        ocorrencias++;
        continue;
      }

      try {
        perfil = this._redeSocial.consultarPerfil(idPerfil);

      } catch (e: any) {
        ocorrencias++;
        continue;
      }

      this._redeSocial.criarPostagem(id, texto, data, perfil, curtidas, descurtidas, hashtags, visuRestantes);
    }

    print('\nPostagens carregados com sucesso!');
    print(`Total de ocorrencias: ${ocorrencias}`);
    
  }
  
  public salvarPostagens(): void {
    // 3456YGDE3456Y#texto#curtidas#descurtidas#data#idPerfil#P/PA#hash-hash2-hash3#visurestantes
    let postagens: Postagem[];

    try {

      postagens = this._redeSocial.obterPostagens();
    }catch(e: any){

      print('\nNenhuma postagem para salvar!');
      return;
    }

    let dados: string = '';

    for ( let post of postagens ){
      let tipo: string = 'P'
      
      dados += `${post.id}#${post.texto}#${post.curtidas}#${post.descrurtidas}#${post.data}#${post.perfil.id}`;
      
      if ( post instanceof PostagemAvancada) {
        tipo = 'PA';
        let hastags: string = '';
        // Dividir as hashtags

        for ( let tag of post.hashtags ){
          hastags += `${tag}-`;
        }

        hastags = hastags.slice(0, -1);
        
        dados += `#${tipo}#${hastags}#${post.visualizacoesRestantes}\n`;
        
      } else {
        dados += `#${tipo}\n`;

      }
    }
    
    dados = dados.slice(0, -1);
    escreverArquivo('../../q12/DataBase/postagens.txt', dados);
  }
*/
