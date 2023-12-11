/*
Explique o que é necessário para que a compilação da ClasseConcreta ocorra
sem erros:
*/
abstract class ClasseAbstrata {
abstract imprimaAlgo(): void ;
}
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

class ClasseConcreta extends
ClasseAbstrata {
    imprimaAlgo(): void {
        console.log("Hello World!");
    }
}