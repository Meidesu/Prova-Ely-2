"use strict";
/*
Crie uma classe chamada AuditoriaInterna que tenha dois métodos que tenha um
array de Tributaveis e os métodos:
a. adicionar(Tributável);
b. calcularTributos(): retorna um double que representa a soma de todos os
cálculos dos tributos de todos os tributáveis;
c. Crie uma classe de testes que instancie várias classes ContaCorrente e
SeguroDeVida, adicione-as na classe AuditoriaInterna e exiba o resultado

do método calculaTributos. Perceba que a classe de auditoria não se
preocupa que tipo de classe está sendo passada.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Conta = /** @class */ (function () {
    function Conta() {
        this.nome = "";
        this.saldo = 0;
    }
    Conta.prototype.getNome = function () {
        return this.nome;
    };
    Conta.prototype.setNome = function (nome) {
        this.nome = nome;
    };
    Conta.prototype.getSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    return Conta;
}());
var ContaCorrente = /** @class */ (function (_super) {
    __extends(ContaCorrente, _super);
    function ContaCorrente() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContaCorrente.prototype.calculaTributos = function () {
        return this.getSaldo() * 0.1;
    };
    return ContaCorrente;
}(Conta));
var SeguroDeVida = /** @class */ (function () {
    function SeguroDeVida() {
    }
    SeguroDeVida.prototype.calculaTributos = function () {
        return 60;
    };
    return SeguroDeVida;
}());
var AuditoriaInterna = /** @class */ (function () {
    function AuditoriaInterna() {
        this.tributaveis = [];
    }
    AuditoriaInterna.prototype.adicionar = function (tributavel) {
        this.tributaveis.push(tributavel);
    };
    AuditoriaInterna.prototype.calcularTributos = function () {
        var totalTributos = 0;
        for (var _i = 0, _a = this.tributaveis; _i < _a.length; _i++) {
            var tributavel = _a[_i];
            totalTributos += tributavel.calculaTributos();
        }
        return totalTributos;
    };
    return AuditoriaInterna;
}());
var TesteAuditoria = /** @class */ (function () {
    function TesteAuditoria() {
    }
    TesteAuditoria.executarTestes = function () {
        var auditoria = new AuditoriaInterna();
        var conta1 = new ContaCorrente();
        conta1.setSaldo(1000);
        auditoria.adicionar(conta1);
        console.log("Tributo da Conta 1: ".concat(conta1.calculaTributos()));
        var conta2 = new ContaCorrente();
        conta2.setSaldo(2000);
        auditoria.adicionar(conta2);
        console.log("Tributo da Conta 2: ".concat(conta2.calculaTributos()));
        var conta3 = new ContaCorrente();
        conta3.setSaldo(3000);
        auditoria.adicionar(conta3);
        console.log("Tributo da Conta 3: ".concat(conta3.calculaTributos()));
        var conta4 = new ContaCorrente();
        conta4.setSaldo(4000);
        auditoria.adicionar(conta4);
        console.log("Tributo da Conta 4: ".concat(conta4.calculaTributos()));
        var conta5 = new ContaCorrente();
        conta5.setSaldo(5000);
        auditoria.adicionar(conta5);
        console.log("Tributo da Conta 5: ".concat(conta5.calculaTributos()));
        var seguro1 = new SeguroDeVida();
        auditoria.adicionar(seguro1);
        console.log("Tributo do Seguro 1: ".concat(seguro1.calculaTributos()));
        var seguro2 = new SeguroDeVida();
        auditoria.adicionar(seguro2);
        console.log("Tributo do Seguro 2: ".concat(seguro2.calculaTributos()));
        var seguro3 = new SeguroDeVida();
        auditoria.adicionar(seguro3);
        console.log("Tributo do Seguro 3: ".concat(seguro3.calculaTributos()));
        var seguro4 = new SeguroDeVida();
        auditoria.adicionar(seguro4);
        console.log("Tributo do Seguro 4: ".concat(seguro4.calculaTributos()));
        var seguro5 = new SeguroDeVida();
        auditoria.adicionar(seguro5);
        console.log("Tributo do Seguro 5: ".concat(seguro5.calculaTributos()));
        console.log("Total de tributos: ".concat(auditoria.calcularTributos()));
    };
    return TesteAuditoria;
}());
TesteAuditoria.executarTestes();
