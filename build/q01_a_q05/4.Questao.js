"use strict";
/*
Imagine que você deve modelar várias figuras geométricas em TypeScript e que
cada uma tem sua forma específica de calcular área e perímetro. Proponha e
implemente uma hierarquia de classes usando uma classe abstrata chamada
FiguraGeometrica e outras concretas: Quadrado, Triangulo, etc.
*/
/*
abstract class FiguraGeometrica {
    abstract calcularArea(): number;
    abstract calcularPerimetro(): number;
}

class Quadrado extends FiguraGeometrica {
    constructor(private lado: number) {
        super();
    }

    calcularArea(): number {
        return this.lado * this.lado;
    }

    calcularPerimetro(): number {
        return this.lado * 4;
    }
}

//Levando em consideração que o triângulo pode ser equilátero, isósceles ou escaleno.

class Triangulo extends FiguraGeometrica {
    constructor(private lado1: number, private lado2: number, private base: number, private altura: number) {
        super();
    }

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }

    calcularPerimetro(): number {

        return this.lado1 + this.lado2 + this.base;
    }
}

class Circunferencia extends FiguraGeometrica {
    constructor(private raio: number) {
        super();
    }

    calcularArea(): number {
        return Math.PI * this.raio * this.raio;
    }

    calcularPerimetro(): number {
        return 2 * Math.PI * this.raio;
    }
}

class Trapezio extends FiguraGeometrica {
    constructor(private baseMaior: number, private baseMenor: number, private lado1: number, private lado2: number, private altura: number) {
        super();
    }

    calcularArea(): number {
        return ((this.baseMaior + this.baseMenor) * this.altura) / 2;
    }

    calcularPerimetro(): number {
        return this.baseMaior + this.baseMenor + this.lado1 + this.lado2;
    }
}
*/ 
