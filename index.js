require('dotenv').config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const app = express();
//const saludo = require('./saludo');

let file;

// fs https://www.tutorialesprogramacionya.com/javascriptya/nodejsya/detalleconcepto.php?punto=4&codigo=4&inicio=0 
const loadFile = () => file = JSON.parse(fs.readFileSync(process.env.DB, 'utf-8'));
const saveFile = () => file = fs.writeFileSync(process.env.DB, JSON.stringify(file));

//console.log(saludo);

//Middleware

/**
 * El cuerpo de una peticion contiene información desde una petición tipo POST cuando un cliente
 * desea crear una nueva entidad/registro o actualizar uno existente mediante PUT.
 * Para accesar a la información del cuerpo de dicha petición usamos el modulo npm body-parser,
 * que permite realizar esta tarea. No es necesario programarla. Solo se require instalar body-parser 
 * y habilitar json() asi como url-encode como middlewares para convertir datos a JSON.
 */
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({}))

//Mètodos HTTP https://developer.mozilla.org/es/docs/Web/HTTP/Methods 

app.get('/', (req, res) =>{
    loadFile();
    res.send(file);
});

//http://localhost:2000/query?id=nuestraID

app.get('/query', (req,res) => {
    res.send(req.query.id)
});

app.get('/:id', (req,res) => {
    loadFile();
    const result = file.find(obj => parseInt(obj._id) === parseInt(req.params.id));
    res.send(result)
});

app.put('/:id', (req,res) => {
    loadFile();
    const result = file.find(obj => parseInt(obj._id) === parseInt(req.params.id));
    //Object.assign copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino. 
    //Devuelve el objeto destino.
    //reemplazo lo que tengo (result) con lo que viene (req.body)
    Object.assign(result,req.body);
    saveFile();
    res.sendStatus(200);
});

app.delete('/:id', (req,res,next) => {
    loadFile();

    /**
     * con el == antes de hacer la comparación se convierten ambos datos a un tipo común.
     * Con === ninguno de estos valores se convierte de manera implícita antes de ser comparado.
     * Por eso aunque el valor del dato sea igual, si el tipo de dato no coincide el operador responde que no son iguales.
     */

    const result = file.find(obj => parseInt(obj._id) === parseInt(req.params.id));

    //reemplazo lo que tengo (result) con el borrado lógico
    Object.assign(result,{deleted:true, deletedAt: new Date()});
    saveFile();
    res.sendStatus(200);
});

app.post('/', (req,res,next) =>{
    /**
     * try...catch señala un bloque de instrucciones a intentar (try), 
     * y especifica una respuesta si se produce una excepción (catch).
    */
    try{
        loadFile();
        const object = req.body;
        const _id = file.length + 1;
        file.push({
            ... object,
            _id
        });
        saveFile();
        res.send({success: true});
    }catch (err){
        next(err);
    }
});

app.listen(PORT, () => console.log(`Started at port ${PORT} in ${NODE_ENV} environment`));

/*app.listen(PORT, () => {
    console.log(`Started at port ${PORT} in ${NODE_ENV} environment`);
});*/