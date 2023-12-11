/*Refaça a questão 04 do exercício usando interfaces com os métodos propostos
em vez de herança. Crie também um script que instancie e teste diferentes formas
geométricas.
*/
/*
interface FiguraGeometrica {
    calcularArea(): number;
    calcularPerimetro(): number;
}

class Quadrado implements FiguraGeometrica {
    constructor(private lado: number) {}

    calcularArea(): number {
        return this.lado * this.lado;
    }

    calcularPerimetro(): number {
        return this.lado * 4;
    }
}

class Triangulo implements FiguraGeometrica {
    constructor(private base: number, private altura: number, private lado1: number, private lado2: number) {}

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }

    calcularPerimetro(): number {
        return this.base + this.lado1 + this.lado2;
    }
}

class Circunferencia implements FiguraGeometrica {
    constructor(private raio: number) {}

    calcularArea(): number {
        return Math.PI * this.raio * this.raio;
    }

    calcularPerimetro(): number {
        return 2 * Math.PI * this.raio;
    }
}

class Trapezio implements FiguraGeometrica {
    constructor(private baseMaior: number, private baseMenor: number, private lado1: number, private lado2: number, private altura: number) {}

    calcularArea(): number {
        return ((this.baseMaior + this.baseMenor) * this.altura) / 2;
    }

    calcularPerimetro(): number {
        return this.baseMaior + this.baseMenor + this.lado1 + this.lado2;
    }
}

// Exemplos

let quadrado = new Quadrado(5);
console.log(`Área do Quadrado: ${quadrado.calcularArea()}`); // 25
console.log(`Perimetero do Quadrado: ${quadrado.calcularPerimetro()}`); // 20

let triangulo = new Triangulo(5, 6, 7, 8);
console.log(`Área do Triângulo: ${triangulo.calcularArea()}`); // 15
console.log(`Perímetro do Triângulo: ${triangulo.calcularPerimetro()}`); // 20

let circunferencia = new Circunferencia(3);
console.log(`Área da circunferencia: ${circunferencia.calcularArea()}`); // Aproximadamente 28.27
console.log(`Perimetro da circunferencia: ${circunferencia.calcularPerimetro()}`); // Aproximadamente 18.85

let trapezio = new Trapezio(5, 3, 4, 4, 4);
console.log(`Área do Trappézio: ${trapezio.calcularArea()}`); // 16
console.log(`Perimetro do Trapézio: ${trapezio.calcularPerimetro()}`); // 16
*/