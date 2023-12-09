"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPerfisBD = void 0;
var Perfil_1 = require("../models/Perfil");
var pg_1 = require("pg");
var RepositorioPerfisBD = /** @class */ (function () {
    function RepositorioPerfisBD() {
        this.pool = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'POO',
            password: '12345',
            port: 5432,
        });
        this.pool.query('CREATE TABLE IF NOT EXISTS PERFIL (ID INT PRIMARY KEY, NOME VARCHAR(255), EMAIL VARCHAR(255))').then().catch(function (error) {
            console.error('Erro ao criar tabela:', error.message);
        });
    }
    RepositorioPerfisBD.prototype.incluir = function (perfil) {
        var id = perfil.id;
        var nome = perfil.nome;
        var email = perfil.email;
        this.pool.query('INSERT INTO PERFIL VALUES ($1, $2, $3)', [id, nome, email]).then().catch(function (error) {
            console.error('Erro ao inserir perfil:', error.message);
        });
    };
    RepositorioPerfisBD.prototype.existeNome = function (nome) {
        var existe = false;
        this.pool.query('SELECT NOME FROM PERFIL WHERE NOME = $1', [nome]).then(function (res) {
            if (res.rowCount) {
                existe = res.rowCount > 0;
            }
        }).catch(function (error) { });
        return existe;
    };
    RepositorioPerfisBD.prototype.consultar = function (id, nome, email) {
        throw new Error("Method not implemented.");
    };
    RepositorioPerfisBD.prototype.perfis = function () {
        throw new Error("Method not implemented.");
    };
    return RepositorioPerfisBD;
}());
exports.RepositorioPerfisBD = RepositorioPerfisBD;
var repo = new RepositorioPerfisBD();
var perfil = new Perfil_1.Perfil("2", "João", "jhygfd@@gmail.com");
// repo.incluir(perfil);
console.log(repo.existeNome('João'));
