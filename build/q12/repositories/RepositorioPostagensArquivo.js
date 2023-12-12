"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPostagemArquivo = void 0;
var RepositorioPostagemArquivo = /** @class */ (function () {
    function RepositorioPostagemArquivo() {
    }
    RepositorioPostagemArquivo.prototype.incluir = function (postagem) {
        throw new Error("Method not implemented.");
    };
    RepositorioPostagemArquivo.prototype.consultar = function (id, texto, hashtag, perfil) {
        throw new Error("Method not implemented.");
    };
    RepositorioPostagemArquivo.prototype.consultarId = function (id) {
        throw new Error("Method not implemented.");
    };
    RepositorioPostagemArquivo.prototype.consultarPorHashtag = function (hashtag) {
        throw new Error("Method not implemented.");
    };
    RepositorioPostagemArquivo.prototype.consultarPorPerfil = function (perfil) {
        throw new Error("Method not implemented.");
    };
    RepositorioPostagemArquivo.prototype.existeId = function (id) {
        throw new Error("Method not implemented.");
    };
    RepositorioPostagemArquivo.prototype.obterPostagens = function () {
        throw new Error("Method not implemented.");
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
