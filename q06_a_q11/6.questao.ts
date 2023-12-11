//Lembrando que estou me baseando no diagrama da página 9 do material poo_09_ts_abstratas_interfaces

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

abstract class Funcionario {
    constructor(protected salario: number) {}

    abstract getBonificacao(): number;
}

class Gerente extends Funcionario {
    getBonificacao(): number {
        return this.salario * 0.4;
    }
}

class Diretor extends Funcionario {
    getBonificacao(): number {
        return this.salario * 0.6;
    }
}

class Presidente extends Funcionario {
    getBonificacao(): number {
        return this.salario + 1000;
    }
}