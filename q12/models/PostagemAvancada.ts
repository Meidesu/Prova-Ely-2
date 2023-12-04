import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";

export class PostagemAvancada extends Postagem {
  private _hashtags: string[];
  private _visualizacoesRestantes: number;

  constructor(id: string, texto: string, curtidas: number, descrurtidas: number, data: string, perfil: Perfil, hashtags: string[], visualizacoesRestantes: number){
    super(id, texto, curtidas, descrurtidas, data, perfil);
    this._hashtags = hashtags;
    this._visualizacoesRestantes = visualizacoesRestantes;
  }

  get hashtags(): string[]{
    return this._hashtags;
  }

  get visualizacoesRestantes(): number{
    return this._visualizacoesRestantes;
  } 

  public adicionarHashtag(hashtag: string): void{
    this._hashtags.push(hashtag);
  }

  public existeHashtag(hashtag: string): boolean{
    return this._hashtags.includes(hashtag);
  }

  // public existeHashtag2(hashtag: string): boolean{
  //   for (let hashtag of this._hashtags){
  //     if (hashtag == hashtag){
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  public decrementarVisualizacoes(): void{ 
    if ( this._visualizacoesRestantes > 0){
      this._visualizacoesRestantes--;
    }

  }

  public toString(): string {
    let out: string = super.toString();
    
    out += `
    Hashtags: #${this._hashtags}

    Visualizações Restantes: ${this._visualizacoesRestantes}`;

    return out; 
  }

}