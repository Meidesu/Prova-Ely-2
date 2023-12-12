"use strict";
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
Explique o que é necessário para que a compilação da ClasseConcreta ocorra
sem erros:
*/
var ClasseAbstrata = /** @class */ (function () {
    function ClasseAbstrata() {
    }
    return ClasseAbstrata;
}());
/*
class ClasseConcreta extends
ClasseAbstrata {
}
*/
// Resposta:
/*
Para que a compilação da ClasseConcreta ocorra sem erros, ela precisa implementar
todos os métodos abstratos da classe abstrata que está estendendo.
Nesse caso, a ClasseConcreta precisa implementar o método imprimaAlgo() da ClasseAbstrata.

Ficaria assim:
*/
var ClasseConcreta = /** @class */ (function (_super) {
    __extends(ClasseConcreta, _super);
    function ClasseConcreta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClasseConcreta.prototype.imprimaAlgo = function () {
        console.log("Hello World!");
    };
    return ClasseConcreta;
}(ClasseAbstrata));
