"use strict";
/*Não podemos aplicar o operador new em FiguraGeometrica, mas porque então
podemos realizar o seguinte código de instanciação:
abstract class FiguraGeometrica {
//...
}
let figuras: FiguraGeometrica[] = new Array();
*/
//Resposta:
/*
O código let figuras: FiguraGeometrica[] = new Array(); está criando uma nova instância de um array
que pode conter objetos do tipo FiguraGeometrica.
O operador new está sendo aplicado ao Array e não está instanciando a classe abstrata FiguraGeometrica.
*/ 
