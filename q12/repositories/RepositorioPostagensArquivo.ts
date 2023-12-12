import { IRepositorioPostagens } from "../interfaces/IRepositorioPostagens";
import { Perfil } from "../models/Perfil";
import { Postagem } from "../models/Postagem";
import { PostagemAvancada } from "../models/PostagemAvancada";

export class RepositorioPostagemArquivo implements IRepositorioPostagens {
  incluir(postagem: Postagem): void {
    throw new Error("Method not implemented.");
  }
  consultar(id?: string | undefined, texto?: string | undefined, hashtag?: string | undefined, perfil?: Perfil | undefined): Postagem[] {
    throw new Error("Method not implemented.");
  }
  consultarId(id: string): Postagem {
    throw new Error("Method not implemented.");
  }
  consultarPorHashtag(hashtag: string): PostagemAvancada[] {
    throw new Error("Method not implemented.");
  }
  consultarPorPerfil(perfil: Perfil): Postagem[] {
    throw new Error("Method not implemented.");
  }
  existeId(id: string): boolean {
    throw new Error("Method not implemented.");
  }
  obterPostagens(): Postagem[] {
    throw new Error("Method not implemented.");
  }


}