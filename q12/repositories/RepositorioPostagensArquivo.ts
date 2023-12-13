import { escreverArquivo, lerArquivo } from "../../utils/fs_utils";
import { ehEmail, idValido } from "../../utils/io_utils";
import { PerfilInvalidoException, PostagemInvalidaException, PostagemNaoEncontradaException } from "../exceptions/AppException";
import { IRepositorioPerfis } from "../interfaces/IRepositorioPerfis";
import { IRepositorioPostagens } from "../interfaces/IRepositorioPostagens";
import { Perfil } from "../models/Perfil";
import { Postagem } from "../models/Postagem";
import { PostagemAvancada } from "../models/PostagemAvancada";

export class RepositorioPostagemArquivo implements IRepositorioPostagens {

  private _linhasPost: string[] = [];
  private _postagens: Postagem[] = [];
  private _repoPerfil: IRepositorioPerfis;

  constructor(repoPerfil: IRepositorioPerfis){
    this._repoPerfil = repoPerfil;
    this._carregarArquivo();
    
  }

  public incluir(postagem: Postagem): void {

    this._postagens.push(postagem);
    this._salvarArquivo();
  }

  public consultar(id?: string | undefined, texto?: string | undefined, hashtag?: string | undefined, perfil?: Perfil | undefined): Postagem[] {
    let posts: Postagem[] = [];

    // Retorna imediatamente o post encontrado se o id for informado
    if ( id ){
      let post = this.consultarId(id);
      
      posts.push(post);
      return posts;
    }

    for ( let post of this._postagens){

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
        if ( post.perfil.id == perfil.id){
          console.log('São iguais');
          
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
    for (let postagem of this._postagens){

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

    for (let postagem of this._postagens){
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

  public consultarPorPerfil(perfil: Perfil): Postagem[] {
    let posts: Postagem[] = [];

    for (let postagem of this._postagens){
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

  public existeId(id: string): boolean {
    for (let postagem of this._postagens){
      if (postagem.id == id){
        return true;
      }
    }

    return false;
  }

  public obterPostagens(): Postagem[] {
    let posts: Postagem[] = [];

    for (let postagem of this._postagens){
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

  private _salvarArquivo(): void {
    // let dados: string = this._linhasPost.join('\n');
    // TODO: adicionar aqui partindo do array de postagens

    let dados: string[] = [];

    for ( let postagem of this._postagens ){
      let novoPost: string = `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descrurtidas}#${postagem.data}#${postagem.perfil.id}`;

      let tipo: string = 'P';
        
      if ( postagem instanceof PostagemAvancada) {
        tipo = 'PA';
        let hastags: string = postagem.hashtags.join('-');
        
        novoPost += `#${tipo}#${hastags}#${postagem.visualizacoesRestantes}`;
        
      } else {

        novoPost += `#${tipo}`;
      }

      dados.push(novoPost);

    }
      
    escreverArquivo('../../q12/DataBase/postagens.txt', dados.join('\n'));
  }

  private _carregarArquivo(): void {
    let linhas = lerArquivo('../../q12/DataBase/postagens.txt');

    for ( let linha of linhas ){
      if ( linha == ''){
        continue;
      }

      this._postagens.push(this._instanciarPostagem(linha));
    }
  }

  private _instanciarPostagem(dados: string): Postagem {
    let partes: string[] = dados.split('#');

    let id: string = partes[0];
    let texto: string = partes[1]; 
    let curtidas: number = Number(partes[2]); 
    let descurtidas: number = Number(partes[3]); 
    let data: string = partes[4]; 
    let idPerfil: string = partes[5];
    let tipo: string = partes[6];
    let hashtags: string[]|undefined;
    let visuRestantes: number|undefined;
    let perfil: Perfil;

    if ( !idValido(id) || !idValido(idPerfil)){
      throw new PerfilInvalidoException("Ids do post não são validos!");
    }

    try {
      perfil = this._repoPerfil.consultar(idPerfil);

    } catch (e: any) {
      throw new PerfilInvalidoException("Dados do post não são validos!");
    }

    if ( tipo == 'PA' ){
      
      hashtags = partes[7].split('-');
      visuRestantes = Number(partes[8]);

      return new PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtags, visuRestantes );
    }else{

      return new Postagem(id, texto, curtidas, descurtidas, data, perfil);
    }

  }
}

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
