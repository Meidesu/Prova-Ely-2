"use strict";
function stringContida(texto, subtexto) {
    return texto.includes(subtexto);
}
// Exemplo de uso:
var texto = "Esta é uma string de exemplo";
var subtexto = "sdfg";
if (stringContida(texto, subtexto)) {
    console.log("A string \"".concat(subtexto, "\" est\u00E1 contida em \"").concat(texto, "\""));
}
else {
    console.log("A string \"".concat(subtexto, "\" n\u00E3o est\u00E1 contida em \"").concat(texto, "\""));
}
