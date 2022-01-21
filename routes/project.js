'use strict'
var path = require('path');
var express = require('express');
var ProjectController = require('../controllers/project');
require("dotenv").config();
var router = express.Router();

const fs=require('fs-extra'); /// se debe instalar el modulo con un npm i fs-extra
// permite trabajar con los archivos.fs es un modulo nativo . 
//como utilizamos codigo moderno usamos "extra" que tiene soporte en las promesas
//****PERMITE LA GESTION DE LOS ARCHIVOS".


//var uploads = {};
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart({ uploadDir: './uploads' }); //aca le decis con el multiparty que estas subiendo imagenes



var multer= require('./multer');
//var uploads= multer({storage, fileFilter});

//var storage=upload.diskStorage({});


const Project=require('../models/project');
//const cloudinary=require('cloudinary');
var cloudinary = require('cloudinary').v2;

 
// SET STORAGE
/*var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

*/
 

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
//router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
//router.get('/get-image/:image', ProjectController.getImageFile);

router.get('/get-image/:image', async(req,res)=>{
const projects = await Project.find();
res.render('image',{ projects })

});





router.post('/upload-image/:id', async (req,res)=>{

    var projectId = req.params.id;
	 try { 
	/* console.log("1"+Object(req.files));
	 //console.log("2"+req.files.image);
     console.log("3"+req.file);
	 const file= req.files;
	var filePath = req.files.image.path;*/
if(req.body.files=null){console.log("no hay FILE");


}else{console.log("HAY FILE");}
console.log(req);
console.log(req.files);
console.log(req.file.path);

	 const filePath=req.file.path; //la ruta entera del archivo que se envie y debe coincidir
console.log(filePath);	 

//console.log(upload.single("image"));
  const result = await cloudinary.uploader.upload(filePath,(err,result)=>{
console.log(result);
		
	//	waitForAllUploads("couple2", err, result);
 	}

	);
 

         await  Project.findByIdAndUpdate(projectId, {image: result.url}, {new: true}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });


       /*      console.log(result);
              console.log(result.url); 
        console.log(result.secure_url);
                const newProject = new Project({  //INSTANCIO UN PROYECTO NUEVO 
                    //Y AL ATRIBUTO IMAGE LE PASO EL ATRIBUTO DE LA RESPUESTA DE 
                    //CLOUDINARY.
                image: result.url,

                })
       await newProject.save(); ///OJO ES PARA GUARDAR EN LA BASE DE DATOS guarda en la base de datos pero no ingresa el nombre a la imagen
*/
console.log("La url de la imagen es : "+result.url,);
//res.status(200).json({message:"SUBIDO EXITOSAMENTE PERRY"});
	} catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });

        console.log(req.body);
        console.log(req.files);
    }
});


/*function waitForAllUploads(id, err, image) {
  uploads[id] = image;
  var ids = Object.keys(uploads);
  if (ids.length === 6) {
    console.log();
    console.log('**  uploaded all files (' + ids.join(',') + ') to cloudinary');
    performTransformations();
  }
}*/
/*
	await cloudinary.uploader
		.upload(req.files.image)
		.then((result)=>{
			console.log("succes",JSON.stringify(result,null,2));
		})
		.catch((error)=>{console.log("error",JSON.stringify(error,null,2));
		});
*/



/*router.post('/api/upload/:id', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {});
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});*/

module.exports = router;