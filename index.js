const http = require("http");
require('dotenv').config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

let server = http.createServer((req, res) => {
    console.log("I received a request to" + req.url);
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<b>Hello world</b>");
});

//////PRUEBAS

/*var miVariable = "texto";
console.log(miVariable);
let miVariableLet = "otroTexto";
console.log(miVariableLet);

function varTest(){
    var a = 100;
    if(true) {
        var a = 99;
        console.log(a);
    }
    console.log(a);
}

function letTest(){
    let a = 100;
    if(true) {
        let a = 99;
        console.log(a);
    }
    console.log(a);
}

varTest();
letTest();

var unaVariableRepetidaVar = "es var";
var unaVariableRepetidaVar = "es otra var";
console.log(unaVariableRepetidaVar);

let unaVariableRepetida = 10;
//No puedo crear dos variables let porque el motor me devuelve un error
//let unaVariableRepetida = 100;

function hacerAlgo(){
    console.log(variableUno);
    console.log(variableDos);
    var variableUno;
    //let variableDos;
}

hacerAlgo();

const unValorConstante = 100;
console.log(unValorConstante);
// No puedo reasignar el valor a una constante
// unValorConstante = 20;
function unaFuncion(){
    const unValorConstante = 200;
    console.log(unValorConstante);
}
unaFuncion();

/*
 (parametro1,parametro2,...,parametroN) => 
 { 
     sentenciaUno; 
     sentenciaDos; 
     return "resultado";
 }

 (parametro1,parametro2,...,parametroN) => expresion;

 parametroUnico => expresion;
*/

/*let otraFuncion = function() { return "Hola" };
console.log(otraFuncion());

let miSaludo = nombre => "Hola " + nombre;
let resultado = miSaludo("Paola");
console.log(resultado);*/

/////PRUEBAS

//server.listen(PORT);

server.listen(PORT, () => {
    console.log(`Started at port ${PORT} in ${NODE_ENV} environment`);
});