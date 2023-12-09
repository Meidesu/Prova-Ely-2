import { Perfil } from "../models/Perfil";
import { IRepositorioPerfis } from "../interfaces/IRepositorioPerfis";

import { Pool } from 'pg';

export class RepositorioPerfisBD implements IRepositorioPerfis {

  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'POO',
      password: '12345',
      port: 5432,
    });

    this.pool.query('CREATE TABLE IF NOT EXISTS PERFIL (ID INT PRIMARY KEY, NOME VARCHAR(255), EMAIL VARCHAR(255))');
  }

  public incluir(perfil: Perfil): void{
    let id = perfil.id;
    let nome = perfil.nome;
    let email = perfil.email;

    this.pool.query('INSERT INTO PERFIL VALUES ($1, $2, $3)', [id, nome, email]).then().catch((error) => {
      console.error('Erro ao inserir perfil:', error.message);
    });;
  }

  public existeNome(nome: string): boolean {
    throw new Error("Method not implemented.");
  }

  public consultar(id?: string | undefined, nome?: string | undefined, email?: string | undefined): Perfil {
    throw new Error("Method not implemented.");
  }
  public perfis(): Perfil[] {
    throw new Error("Method not implemented.");
  }
}

let repo = new RepositorioPerfisBD();
let perfil = new Perfil("1", "João", "jhygfd@@gmail.com");

repo.incluir(perfil);