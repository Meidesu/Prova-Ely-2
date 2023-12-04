import { Postagem } from "../models/Postagem";
import { Perfil } from "../models/Perfil";
import { PostagemAvancada } from "../models/PostagemAvancada";
import { IRepositorioPostagens } from "../interfaces/IRepositorioPostagens";
import { PostagemInvalidaException, PostagemNaoEncontradaException } from "../exceptions/AppException";

export class RepositorioPostagens implements IRepositorioPostagens{
  private _postagem: Postagem[] = [];

  public incluir(postagem: Postagem): void{
    this._postagem.push(postagem);
  }

  public consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[]{ 
    let posts: Postagem[] = [];

    // Retorna imediatamente o post encontrado se o id for informado
    if ( id ){
      let post = this.consultarId(id);
      
      posts.push(post);
      return posts;
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
      throw new PostagemNaoEncontradaException(`Não foi encontrada uma postagem com os dados informados.`);
    }

    return posts;
  }

  public consultarId(id: string): Postagem {

    for (let postagem of this._postagem){

      // Verifica se o id é igual
      if (postagem.id == id){

        // Se for uma postagem avançada, verifica se ainda tem visualizações
        if ( postagem instanceof PostagemAvancada ){
          if (postagem.visualizacoesRestantes > 0){
            return postagem;
          }

          throw new PostagemInvalidaException(`Postagem não pode ser visualizada pois não possui mais visualizações disponíveis.`);
        }
        
        // Se não for uma postagem avançada, retorna a postagem
        return postagem;
      }
    }

    throw new PostagemNaoEncontradaException(`Não foi encontrada uma postagem com o id informado.`);
  }

  public consultarPorHashtag(hashtag: string): PostagemAvancada[] {

    let posts: PostagemAvancada[] = [];

    for (let postagem of this._postagem){
      if (postagem instanceof PostagemAvancada){

        // Se não tiver mais visualizações, não adiciona
        if (postagem.visualizacoesRestantes <= 0){
          continue;
        }

        // Se tiver a hashtag, adiciona
        if ( ( <PostagemAvancada> postagem).existeHashtag(hashtag)){
          posts.push(postagem);
        }
      }
    }

    if (posts.length == 0){
      throw new PostagemNaoEncontradaException(`Não foi encontrada uma postagem com a hashtag informada.`);
    }

    return posts;
  }

  public consultarPorPerfil(perfil: Perfil): Postagem[]{
    let posts: Postagem[] = [];

    for (let postagem of this._postagem){
      if (postagem.perfil == perfil){

        // Se for uma postagem avançada, verifica se ainda tem visualizações
        if (postagem instanceof PostagemAvancada){

          // Se não tiver mais visualizações, não adiciona
          if (postagem.visualizacoesRestantes <= 0){
            continue;
          }
        }

        posts.push(postagem);
      }
    }

    if (posts.length == 0){
      throw new PostagemNaoEncontradaException(`Não foi encontrada uma postagem com o perfil informado.`);
    }
    
    return posts;
  }

  public existeId(id: string): boolean{
    for (let postagem of this._postagem){
      if (postagem.id == id){
        return true;
      }
    }

    return false;
  }

  public obterPostagens(): Postagem[]{
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
      throw new PostagemNaoEncontradaException(`Não foi encontrada nenhuma postagem.`);
    }

    return posts;
  }
}