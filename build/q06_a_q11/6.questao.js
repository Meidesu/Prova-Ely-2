"use strict";
//Lembrando que estou me baseando no diagrama da página 9 do material poo_09_ts_abstratas_interfaces
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
/*
Implemente as classes Funcionario, Gerente e Diretor conforme o diagrama
exposto em sala:
a. A classe funcionário deve ser abstrata e o método getBonificacao()
abstrato;
b. Na classe gerente o método bonificação deve retornar 40% do salário;
c. Em Diretor a bonificação deve ser 60% do salário.
d. Por fim, na classe presidente o método deve retornar 100% do salário + R$
1.000,00.
*/
var Funcionario = /** @class */ (function () {
    function Funcionario(salario) {
        this.salario = salario;
    }
    return Funcionario;
}());
var Gerente = /** @class */ (function (_super) {
    __extends(Gerente, _super);
    function Gerente() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gerente.prototype.getBonificacao = function () {
        return this.salario * 0.4;
    };
    return Gerente;
}(Funcionario));
var Diretor = /** @class */ (function (_super) {
    __extends(Diretor, _super);
    function Diretor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Diretor.prototype.getBonificacao = function () {
        return this.salario * 0.6;
    };
    return Diretor;
}(Funcionario));
var Presidente = /** @class */ (function (_super) {
    __extends(Presidente, _super);
    function Presidente() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Presidente.prototype.getBonificacao = function () {
        return this.salario + 1000;
    };
    return Presidente;
}(Funcionario));
