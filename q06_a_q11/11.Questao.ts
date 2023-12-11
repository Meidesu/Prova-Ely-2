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

class Conta {
    private nome: string = "";
    private saldo: number = 0;

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    getSaldo(): number {
        return this.saldo;
    }

    setSaldo(saldo: number): void {
        this.saldo = saldo;
    }
}

interface Tributavel {
    calculaTributos(): number;
}

class ContaCorrente extends Conta implements Tributavel {
    calculaTributos(): number {
        return this.getSaldo() * 0.1;
    }
}

class SeguroDeVida implements Tributavel {
    calculaTributos(): number {
        return 60;
    }
}


class AuditoriaInterna {
    private tributaveis: Tributavel[] = [];

    adicionar(tributavel: Tributavel): void {
        this.tributaveis.push(tributavel);
    }

    calcularTributos(): number {
        let totalTributos = 0;
        for (let tributavel of this.tributaveis) {
            totalTributos += tributavel.calculaTributos();
        }
        return totalTributos;
    }
}


class TesteAuditoria {
    public static executarTestes(): void {
        let auditoria = new AuditoriaInterna();

        let conta1 = new ContaCorrente();
        conta1.setSaldo(1000);
        auditoria.adicionar(conta1);
        console.log(`Tributo da Conta 1: ${conta1.calculaTributos()}`);

        let conta2 = new ContaCorrente();
        conta2.setSaldo(2000);
        auditoria.adicionar(conta2);
        console.log(`Tributo da Conta 2: ${conta2.calculaTributos()}`);

        let conta3 = new ContaCorrente();
        conta3.setSaldo(3000);
        auditoria.adicionar(conta3);
        console.log(`Tributo da Conta 3: ${conta3.calculaTributos()}`);

        let conta4 = new ContaCorrente();
        conta4.setSaldo(4000);
        auditoria.adicionar(conta4);
        console.log(`Tributo da Conta 4: ${conta4.calculaTributos()}`);

        let conta5 = new ContaCorrente();
        conta5.setSaldo(5000);
        auditoria.adicionar(conta5);
        console.log(`Tributo da Conta 5: ${conta5.calculaTributos()}`);

        let seguro1 = new SeguroDeVida();
        auditoria.adicionar(seguro1);
        console.log(`Tributo do Seguro 1: ${seguro1.calculaTributos()}`);

        let seguro2 = new SeguroDeVida();
        auditoria.adicionar(seguro2);
        console.log(`Tributo do Seguro 2: ${seguro2.calculaTributos()}`);

        let seguro3 = new SeguroDeVida();
        auditoria.adicionar(seguro3);
        console.log(`Tributo do Seguro 3: ${seguro3.calculaTributos()}`);

        let seguro4 = new SeguroDeVida();
        auditoria.adicionar(seguro4);
        console.log(`Tributo do Seguro 4: ${seguro4.calculaTributos()}`);

        let seguro5 = new SeguroDeVida();
        auditoria.adicionar(seguro5);
        console.log(`Tributo do Seguro 5: ${seguro5.calculaTributos()}`);

        console.log(`Total de tributos: ${auditoria.calcularTributos()}`);
    }
}

TesteAuditoria.executarTestes();