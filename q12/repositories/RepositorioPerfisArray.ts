import { Perfil } from "../models/Perfil";
import { IRepositorioPerfis } from "../interfaces/IRepositorioPerfis";
import { PerfilExistenteException, PerfilNaoEncontradoException, PerfisNaoEncontradosException } from "../exceptions/AppException";

export class RepositorioPerfisArray implements IRepositorioPerfis {
  private _perfis: Perfil[] = [];

  public incluir(perfil: Perfil): void{
    if (this.existeNome(perfil.nome)){
      throw new PerfilExistenteException(`Um perfil com o nome "${perfil.nome}" já existe.`);
    }

    this._perfis.push(perfil);
  }

  public existeNome(nome: string): boolean {
    for ( let perfil of this._perfis ){
      if ( perfil.nome == nome ){
        return true;
      }
    }

    return false;
  }

  public consultar(id?: string, nome?: string, email?: string): Perfil{ 

    for (let perfil of this._perfis){
      if ( id ){
        if ( perfil.id == id ){
          return perfil;
        }
      }

      if ( nome ){
        if ( perfil.nome == nome ){
          return perfil;
        }
      } 

      if ( email ){
        if ( perfil.email == email ){
          return perfil;
        }
      }
    }

    // return null;
    throw new PerfilNaoEncontradoException(`Não foi encontrado um perfil com os dados informados.`);
  }

  public perfis(): Perfil[] {
    if ( this._perfis.length == 0 ){
      throw new PerfisNaoEncontradosException(`Não foram encontrados perfis.`);
    }

    return this._perfis;
  }

}