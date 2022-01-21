'use strict'

const fileUpload=require('express-fileupload');
require("dotenv").config();

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

app.use(fileUpload({
        useTempFiles:true,
        tempFileDir : '/tmp/'
}));


//MongooDB connection
/*
mongoose 
.connect(process.env.MONGODB_URI,{useNewUrlParser: true})
.then(()=>console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));
app.listen(port,()=>console.log("SE HA ESTABLECIDO LA CONEXIÓN AL SERVIDOR MONGO ATLAS."));
*/

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio')
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente...");

        	// Creacion del servidor
        	app.listen(port, () => {
        		console.log("Servidor corriendo correctamente en la url: localhost:3700");
        	});

        })
        .catch(err => console.log(err));