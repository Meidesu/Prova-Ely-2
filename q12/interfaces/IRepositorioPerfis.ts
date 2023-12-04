import { Perfil } from "../models/Perfil";

export interface IRepositorioPerfis {
  incluir(perfil: Perfil): void;
  existeNome(nome: string): boolean;
  consultar(id?: string, nome?: string, email?: string): Perfil;
  perfis(): Perfil[];
}
