import { Perfil } from "../models/Perfil";
import { Postagem } from "../models/Postagem";
import { PostagemAvancada } from "../models/PostagemAvancada";

export interface IRepositorioPostagens {
  incluir(postagem: Postagem): void;
  consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[];
  consultarId(id: string): Postagem;
  consultarPorHashtag(hashtag: string): PostagemAvancada[];
  consultarPorPerfil(perfil: Perfil): Postagem[];
  existeId(id: string): boolean;
  obterPostagens(): Postagem[];
}