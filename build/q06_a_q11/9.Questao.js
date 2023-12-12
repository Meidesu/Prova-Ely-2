"use strict";
/*
Crie uma classe para testar os exemplos anteriores. Instancie várias formas
diferentes. Pegue duas formas chame em uma delas o método comparar
passando a outra como parâmetro e exiba o resultado. Repita para outras formas.
*/
var Quadrado = /** @class */ (function () {
    function Quadrado(lado) {
        this.lado = lado;
    }
    Quadrado.prototype.calcularArea = function () {
        return this.lado * this.lado;
    };
    Quadrado.prototype.calcularPerimetro = function () {
        return this.lado * 4;
    };
    Quadrado.prototype.comparar = function (figura) {
        var area = this.calcularArea();
        var areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    };
    return Quadrado;
}());
var Triangulo = /** @class */ (function () {
    function Triangulo(base, altura, lado1, lado2) {
        this.base = base;
        this.altura = altura;
        this.lado1 = lado1;
        this.lado2 = lado2;
    }
    Triangulo.prototype.calcularArea = function () {
        return (this.base * this.altura) / 2;
    };
    Triangulo.prototype.calcularPerimetro = function () {
        return this.base + this.lado1 + this.lado2;
    };
    Triangulo.prototype.comparar = function (figura) {
        var area = this.calcularArea();
        var areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    };
    return Triangulo;
}());
var Circunferencia = /** @class */ (function () {
    function Circunferencia(raio) {
        this.raio = raio;
    }
    Circunferencia.prototype.calcularArea = function () {
        return Math.PI * this.raio * this.raio;
    };
    Circunferencia.prototype.calcularPerimetro = function () {
        return 2 * Math.PI * this.raio;
    };
    Circunferencia.prototype.comparar = function (figura) {
        var area = this.calcularArea();
        var areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    };
    return Circunferencia;
}());
var Trapezio = /** @class */ (function () {
    function Trapezio(baseMaior, baseMenor, lado1, lado2, altura) {
        this.baseMaior = baseMaior;
        this.baseMenor = baseMenor;
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.altura = altura;
    }
    Trapezio.prototype.calcularArea = function () {
        return ((this.baseMaior + this.baseMenor) * this.altura) / 2;
    };
    Trapezio.prototype.calcularPerimetro = function () {
        return this.baseMaior + this.baseMenor + this.lado1 + this.lado2;
    };
    Trapezio.prototype.comparar = function (figura) {
        var area = this.calcularArea();
        var areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    };
    return Trapezio;
}());
var TesteFormas = /** @class */ (function () {
    function TesteFormas() {
    }
    TesteFormas.executarTestes = function () {
        var quadrado1 = new Quadrado(5);
        var quadrado2 = new Quadrado(6);
        console.log("Compara\u00E7\u00E3o entre a \u00E1rea dos quadrados: ".concat(quadrado1.comparar(quadrado2))); // -1
        var triangulo1 = new Triangulo(5, 6, 7, 8);
        var triangulo2 = new Triangulo(6, 7, 8, 9);
        console.log("Compara\u00E7\u00E3o entre a \u00E1rea dos tri\u00E2ngulos: ".concat(triangulo1.comparar(triangulo2))); // -1
        var circunferencia1 = new Circunferencia(3);
        var circunferencia2 = new Circunferencia(4);
        console.log("Compara\u00E7\u00E3o entre a \u00E1rea das circunfer\u00EAncias: ".concat(circunferencia1.comparar(circunferencia2))); // -1
        var trapezio1 = new Trapezio(5, 3, 4, 4, 4);
        var trapezio2 = new Trapezio(6, 4, 5, 5, 5);
        console.log("Compara\u00E7\u00E3o entre a \u00E1rea dos trap\u00E9zios: ".concat(trapezio1.comparar(trapezio2))); // -1
    };
    return TesteFormas;
}());
TesteFormas.executarTestes();
