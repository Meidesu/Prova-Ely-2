import { Perfil } from "./Perfil";

export class RepositorioPerfis {
  private _perfis: Perfil[] = [];

  public incluir(perfil: Perfil): void{
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

  public consultar(id?: string, nome?: string, email?: string): Perfil | null{ 

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

    return null;
  }

  get perfis(): Perfil[] {
    return this._perfis
  }

}