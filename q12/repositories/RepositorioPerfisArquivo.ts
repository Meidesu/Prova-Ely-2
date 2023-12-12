import { escreverArquivo, lerArquivo } from "../../utils/fs_utils";
import { ehEmail, idValido } from "../../utils/io_utils";
import { PerfilExistenteException, PerfilInvalidoException, PerfilNaoEncontradoException } from "../exceptions/AppException";
import { IRepositorioPerfis } from "../interfaces/IRepositorioPerfis";
import { Perfil } from "../models/Perfil";

export class RepositorioPerfisArquivo implements IRepositorioPerfis {

  private _linhasPerfil: string[] = [];

  constructor(){
    this._carregarArquivo();
  }

  public incluir(perfil: Perfil): void {

    if ( this.existeNome(perfil.nome) ){
      throw new PerfilExistenteException(`Um perfil com o nome "${perfil.nome}" já existe.`);
    }
    
    let novoPerfil: string = `${perfil.id}#${perfil.nome}#${perfil.email}`

    this._linhasPerfil.push(novoPerfil);
    this._salvarArquivo();

    //`${perfil.id}#${perfil.nome}#${perfil.email}\n`
  }

  public existeNome(nome: string): boolean {
    for ( let linha of this._linhasPerfil ){
      if ( linha.includes(nome) ){
        return true;
      }
    }

    return false;
  }

  public consultar(id?: string | undefined, nome?: string | undefined, email?: string | undefined): Perfil {
    
    for (let linha of this._linhasPerfil){

      let perfil: Perfil = this._instanciarPerfil(linha);

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

    if ( this._linhasPerfil.length == 0 ){
      throw new PerfilNaoEncontradoException(`Não foram encontrados perfis.`);
    }

    let perfis: Perfil[] = [];

    for ( let linha of this._linhasPerfil ){
      try {
        perfis.push(this._instanciarPerfil(linha));
      } catch (e: any) {
        continue;
      }
    } 

    return perfis;
  }

  private _salvarArquivo(): void {
    let dados: string = this._linhasPerfil.join('\n');

    escreverArquivo('../../q12/DataBase/perfis.txt', dados);
  }

  private _carregarArquivo(): void {
    let linhas = lerArquivo('../../q12/DataBase/perfis.txt');

    for ( let linha of linhas ){
      if ( linha == ''){
        continue;
      }

      this._linhasPerfil.push(linha);
    }
  }

  private _instanciarPerfil(dados: string): Perfil {
    let partes: string[] = dados.split('#');

    let id: string = partes[0];
    let nome: string = partes[1];
    let email: string = partes[2];

    if ( !idValido(id) || !ehEmail(email)){
      throw new PerfilInvalidoException("Dados do perfil não são validos!");
    }

    return new Perfil(id, nome, email);
  }

}

/*
public carregarPerfis(): void {
    let linhasPerfil: string[] = lerArquivo('../../q12/DataBase/perfis.txt');

    let ocorrencias: number = 0;

    for (let linha of linhasPerfil){
      if ( linha == ''){
        continue;
      }

      let dados: string[] = linha.split("#");

      let id: string = dados[0];
      let nome: string = dados[1];
      let email: string = dados[2];

      if ( !idValido(id) || !ehEmail(email)){
        ocorrencias++;
        continue;
      }

      this._redeSocial.criarPerfil(id, nome, email);
    }

    print('Dados carregados com sucesso!');
    print(`Total de ocorrencias: ${ocorrencias}`);

  }

  public salvarPerfis(): void {
    let perfis: Perfil[]  = this._redeSocial.obterPerfis();

    if (perfis.length == 0){
      print('\nNenhum perfil para salvar!');

      return;
    } 

    let dados: string = '';

    for ( let perfil of perfis ){
      dados += `${perfil.id}#${perfil.nome}#${perfil.email}\n`
    }

    dados = dados.slice(0, -1);

    escreverArquivo('../../q12/DataBase/perfis.txt', dados);
  }
*/