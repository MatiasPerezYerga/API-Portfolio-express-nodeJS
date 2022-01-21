'use strict'
var multer=require('multer');
var express = require('express');
var bodyParser = require('body-parser');
const path = require("path"); 
var app = express();

// cargar archivos rutas
var project_routes = require('./routes/project');

// middlewares
//EL EXTEDEND FALSE SIGNIFICA QUE NO LE ENVIAMOS FORMATOS AVANZADOS.(EJ IMAGENES)
app.use(bodyParser.urlencoded({extended:false}));//procesa datos, no los archivos pesados
app.use(bodyParser.json());//procesa los JSON 

//MIDDLEWARE ALMACENAMIENTO
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'), //indico el directorio. No hace falta que cree la carpeta
    filename:(req,file,cb)=>{
    cb(null, new Date().getTime()+path.extname(file.originalname));

    }
});
app.use(multer(({storage})).single('image'));//el single identifica el campo del formulario.

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/api', project_routes);


// exportar
module.exports = app;

