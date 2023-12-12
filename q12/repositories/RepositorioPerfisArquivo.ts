import { IRepositorioPerfis } from "../interfaces/IRepositorioPerfis";
import { Perfil } from "../models/Perfil";

export class RepositorioPerfisArquivo implements IRepositorioPerfis {
  incluir(perfil: Perfil): void {
    throw new Error("Method not implemented.");
  }
  existeNome(nome: string): boolean {
    throw new Error("Method not implemented.");
  }
  consultar(id?: string | undefined, nome?: string | undefined, email?: string | undefined): Perfil {
    throw new Error("Method not implemented.");
  }
  perfis(): Perfil[] {
    throw new Error("Method not implemented.");
  }

}