/*
Crie uma interface chamada IComparavel com um método chamado comparar que
receba uma forma geométrica como parâmetro e retorna um inteiro como
resultado. Implemente em cada uma das classes do exemplo anterior a interface
retornando -1, 0 e 1 caso a área da forma seja menor, igual ou maior que a
passada via parâmetro.
*/

/*
interface FiguraGeometrica {
    calcularArea(): number;
    calcularPerimetro(): number;
}

interface IComparavel {
    comparar(figura: FiguraGeometrica): number;
}

class Quadrado implements FiguraGeometrica, IComparavel {
    constructor(private lado: number) {}

    calcularArea(): number {
        return this.lado * this.lado;
    }

    calcularPerimetro(): number {
        return this.lado * 4;
    }

    comparar(figura: FiguraGeometrica): number {
        let area = this.calcularArea();
        let areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    }
}

class Triangulo implements FiguraGeometrica, IComparavel {
    constructor(private base: number, private altura: number, private lado1: number, private lado2: number) {}

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }

    calcularPerimetro(): number {
        return this.base + this.lado1 + this.lado2;
    }

    comparar(figura: FiguraGeometrica): number {
        let area = this.calcularArea();
        let areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    }
}

class Circunferencia implements FiguraGeometrica, IComparavel {
    constructor(private raio: number) {}

    calcularArea(): number {
        return Math.PI * this.raio * this.raio;
    }

    calcularPerimetro(): number {
        return 2 * Math.PI * this.raio;
    }

    comparar(figura: FiguraGeometrica): number {
        let area = this.calcularArea();
        let areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    }
}

class Trapezio implements FiguraGeometrica, IComparavel {
    constructor(private baseMaior: number, private baseMenor: number, private lado1: number, private lado2: number, private altura: number) {}

    calcularArea(): number {
        return ((this.baseMaior + this.baseMenor) * this.altura) / 2;
    }

    calcularPerimetro(): number {
        return this.baseMaior + this.baseMenor + this.lado1 + this.lado2;
    }

    comparar(figura: FiguraGeometrica): number {
        let area = this.calcularArea();
        let areaFigura = figura.calcularArea();
        return area < areaFigura ? -1 : area > areaFigura ? 1 : 0;
    }
}

// Exemplos

let quadrado1 = new Quadrado(5);
let quadrado2 = new Quadrado(6);
console.log(`Área do Quadrado1: ${quadrado1.calcularArea()}`); // 25
console.log(`Área do Quadrado2: ${quadrado2.calcularArea()}`); // 36
console.log(`Comparação entre a área dos Quadrados: ${quadrado1.comparar(quadrado2)}`); // -1

let triangulo1 = new Triangulo(5, 6, 7, 8);
let triangulo2 = new Triangulo(6, 6, 7, 8);
console.log(`Área do Triângulo1: ${triangulo1.calcularArea()}`); // 15
console.log(`Área do Triângulo2: ${triangulo2.calcularArea()}`); // 18
console.log(`Comparação entre a área dos Triângulos: ${triangulo1.comparar(triangulo2)}`); // -1

let circunferencia1 = new Circunferencia(3);
let circunferencia2 = new Circunferencia(4);
console.log(`Área da circunferencia: ${circunferencia1.calcularArea()}`); // Aproximadamente 28.27
console.log(`Área da circunferencia: ${circunferencia2.calcularArea()}`); // Aproximadamente 50.27
console.log(`Comparação entre a área dos Triângulos: ${circunferencia1.comparar(circunferencia2)}`); // -1

let trapezio1 = new Trapezio(5, 3, 4, 4, 4);
let trapezio2 = new Trapezio(6, 4, 4, 4, 5);
console.log(`Área do Trappézio: ${trapezio1.calcularArea()}`); // 16
console.log(`Área do Trappézio: ${trapezio2.calcularArea()}`); // 25
console.log(`Comparação entre a área dos Triângulos: ${trapezio1.comparar(trapezio2)}`); // -1
*/