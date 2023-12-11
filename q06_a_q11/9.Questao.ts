/*
Crie uma classe para testar os exemplos anteriores. Instancie várias formas
diferentes. Pegue duas formas chame em uma delas o método comparar
passando a outra como parâmetro e exiba o resultado. Repita para outras formas.
*/

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


class TesteFormas {
    public static executarTestes(): void {
        let quadrado1 = new Quadrado(5);
        let quadrado2 = new Quadrado(6);
        console.log(`Comparação entre a área dos quadrados: ${quadrado1.comparar(quadrado2)}`); // -1

        let triangulo1 = new Triangulo(5, 6, 7, 8);
        let triangulo2 = new Triangulo(6, 7, 8, 9);
        console.log(`Comparação entre a área dos triângulos: ${triangulo1.comparar(triangulo2)}`); // -1

        let circunferencia1 = new Circunferencia(3);
        let circunferencia2 = new Circunferencia(4);
        console.log(`Comparação entre a área das circunferências: ${circunferencia1.comparar(circunferencia2)}`); // -1

        let trapezio1 = new Trapezio(5, 3, 4, 4, 4);
        let trapezio2 = new Trapezio(6, 4, 5, 5, 5);
        console.log(`Comparação entre a área dos trapézios: ${trapezio1.comparar(trapezio2)}`); // -1
    }
}

TesteFormas.executarTestes();
