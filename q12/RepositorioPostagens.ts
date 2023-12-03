import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { PostagemAvancada } from "./PostagemAvancada";

export class RepositorioPostagens {
  private _postagem: Postagem[] = [];

  public incluir(postagem: Postagem): void{
    this._postagem.push(postagem);
  }

  public consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null{ 
    let posts: Postagem[] = [];

    if ( id ){
      let post = this.consultarId(id);
      if ( post != null){
        posts.push(post);

        return posts;
      }
    }

    for ( let post of this._postagem){
      if ( hashtag){
          if ( post instanceof PostagemAvancada){
            if ( ( <PostagemAvancada> post).existeHashtag(hashtag)){
              posts.push(post);
              continue;
            }
          }
      }

      if ( texto ){
        console.log("1ele ta puxando por texto dd");
        if ( post.texto.includes(texto)){
          posts.push(post);
          continue;
        }
      }
      
      if ( perfil ){
        if ( post.perfil == perfil){
          posts.push(post);
          continue;
        }
      }
    }

    if (posts.length == 0){
      return null;
    }

    return posts;
  }

  public consultarId(id: string): Postagem | null {

    for (let postagem of this._postagem){
      if (postagem.id == id){
        if ( postagem instanceof PostagemAvancada ){
          if (postagem.visualizacoesRestantes <= 0){
            return null;
          }
        }

        return postagem;
      }
    }

    return null;
  }

  public consultarPorHashtag(hashtag: string): PostagemAvancada[] | null{

    let posts: PostagemAvancada[] | null = [];

    for (let postagem of this._postagem){
      if (postagem instanceof PostagemAvancada){

        if (postagem.visualizacoesRestantes <= 0){
          continue;
        }

        if ( ( <PostagemAvancada> postagem).existeHashtag(hashtag)){
          posts.push(postagem);
        }
      }
    }

    return posts;
  }

  public consultarPorPerfil(perfil: Perfil): Postagem[] | null{
    let posts: Postagem[] | null = [];

    for (let postagem of this._postagem){
      if (postagem.perfil == perfil){
        if (postagem instanceof PostagemAvancada){

          if (postagem.visualizacoesRestantes <= 0){
            continue;
          }
        }

        posts.push(postagem);
      }
    }

    return posts;
  }

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

  public existeId(id: string): boolean{
    for (let postagem of this._postagem){
      if (postagem.id == id){
        return true;
      }
    }

    return false;
  }

  public obterPostagens(): Postagem[] | null{
    // Obter apenas os perfis com visualizações resdtantes

    let posts: Postagem[] = [];

    for (let postagem of this._postagem){
      if (postagem instanceof PostagemAvancada){
        if (postagem.visualizacoesRestantes <= 0){
          continue;
        }
      }

      posts.push(postagem);
    }

    if (posts.length == 0){
      return null;
    }

    return posts;
  }
}
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