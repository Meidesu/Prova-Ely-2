import { Perfil } from "../models/Perfil";
import { Postagem } from "../models/Postagem";
import { PostagemAvancada } from "../models/PostagemAvancada";

export interface IRepositorioPostagens {
  incluir(postagem: Postagem): void;
  consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null;
  consultarId(id: string): Postagem | null;
  consultarPorHashtag(hashtag: string): PostagemAvancada[] | null;
  consultarPorPerfil(perfil: Perfil): Postagem[] | null;
  existeId(id: string): boolean;
  obterPostagens(): Postagem[] | null;
}