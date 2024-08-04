const validator = require("validator");
const Article = require("../models/article");
const fs = require("fs");
const path = require("path");
const { exists } = require("../models/article");


var postController = {
    prueba: function(req, res){
        return res.send("<h1>This server keeps working</h1>");
    },

    save: function(req, res){
        //Get data
        var params = req.body;
        //Validate data
        if(params.title && params.content && params.title.length > 0 && params.content.length > 0){
            var article = new Article();
            article.title = params.title;
            article.content = params.content;
            article.date = Date.now();

            //Save article
            article.save((err, savedArticle)=>{
                if(err){
                    return res.status(500).send({
                        status: "error",
                        message: "Error con el servidor"
                    });
                }

                if(!savedArticle){
                    return res.status(400).send({
                        status: "error",
                        message: "No se ha guardado el articulo"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    message: "Articulo guardado exitosamente",
                    article: savedArticle
                });
            });

        }else{
            return res.status(400).send({
                status: "error",
                message: "No ha enviado los datos correctamente"
            });
        }
    },

    findAll: function(req, res){
        getArticles(req, res);
    },
    
    findLatest: function(req, res){
        getArticles(req, res, 5);
    },
    
    findOne: function(req, res){
        var id = req.params;
        if(req.params.id){
            var id = req.params.id;

            Article.findById(id, (err, article)=>{
                if(err){
                    return res.status(500).send({
                        status: "error",
                        message: "Error con el servidor"
                    });
                }
        
                if(!article){
                    return res.status(400).send({
                        status: "error",
                        message: "No se han conseguido el articulo"
                    });
                }
        
                return res.status(200).send({
                    status: "success",
                    message: "Articulo conseguido exitosamente",
                    article: article
                });
            });
        }else{
            return res.status(400).send({
                status: "error",
                message: "No envio el id del articulo"
            });
        }
        
    },
    
    update: function(req, res){
        //Get data
        var params = req.body;
        var id = req.params.id;

        //Delete current image and save new image 
        if(req.files && req.files.image){
            Article.findOne({_id: id}, (err, articleFound)=>{
                if(articleFound && !err){
                    deleteImage(articleFound.image);
                    uploadImage(req, res, articleFound._id);
                }
            });
        }


        //Validate data
        if(params.title && params.content && params.title.length > 0 && params.content.length > 0){
            
            var update = {
                title: params.title,
                content: params.content
            }

            //Update article
            Article.findByIdAndUpdate(id, update, {new: true}, (err, updatedArticle)=>{

                if(!updatedArticle || err){
                    if(req.files && req.files.image){

                        //Delete image if article doesn't exist
                        var image = req.files.image;
    
                        var file_path = image.path;
                        var filename = file_path.split("\\")[1];
                        var type = filename.split(".")[1];
                        deleteImage(filename);
                    }
                    return res.status(400).send({
                        status: "error",
                        message: "No se ha actualizado el articulo"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    message: "Articulo actualizado exitosamente",
                    article: updatedArticle
                });
            });

        }else{
            return res.status(400).send({
                status: "error",
                message: "No ha enviado los datos correctamente"
            });
        }
    },
    
    delete: function(req, res){
        var id = req.params.id;

        Article.findByIdAndRemove(id, (err, articleDeleted)=>{
            if(err){
                return res.status(500).send({
                    status: "error",
                    message: "Error con el servidor"
                });
            }

            if(!articleDeleted){
                return res.status(400).send({
                    status: "error",
                    message: "No se ha borrado el articulo"
                });
            }

            //Delete image of the article
            if(articleDeleted.image){
                var file_path = "./images/"+articleDeleted.image;
                fs.unlink(file_path, error=>{});
            }

            return res.status(200).send({
                status: "success",
                message: "Articulo borrado exitosamente",
                article: articleDeleted
            });
        })
    },
    
    uploadImage: function(req, res){
        var image = req.files.image;
        var articleId = req.params.articleId;

        var file_path = image.path;
        var filename = file_path.split("\\")[1];
        var type = filename.split(".")[1];

        if(type != "jpg" && type != "jpeg" && type != "png" && type != "gif"){
            fs.unlink(file_path, (error)=>{
                    return res.status(400).send({
                        status: "error",
                        message: "La imagen no tiene la extension correcta"
                    });
            });
        }else{
            Article.findOneAndUpdate({_id: articleId}, {image: filename}, {new: true}, (err, articleFound)=>{
                if(err){
                    return res.status(500).send({
                        status: "error",
                        message: "Error con el servidor"
                    });
                }
    
                if(!articleFound){
                    return res.status(400).send({
                        status: "error",
                        message: "No se ha actualizado el articulo"
                    });
                }
    
                return res.status(200).send({
                    status: "success",
                    message: "Imagen guardada exitosamente"
                });
            });
        }

    },
    
    getImage: function(req, res){
        var filename = req.params.image;
        var file_path = "./images/"+filename;
        fs.exists(file_path, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(file_path));
            }else{
                return res.status(400).send({
                    status: "error",
                    message: "La imagen no existe"
                });
            }
        });
    },

    search: function(req, res){
        var search = req.params.search;
        Article.find({
            $or: [
                {title: {$regex: search, $options: "i"}},
                {content: {$regex: search, $options: "i"}},
            ]
        }).sort([["date", "descending"]]).exec((err, articles)=>{
            if(err){
                return res.status(500).send({
                    status: "error",
                    message: "Error con el servidor"
                });
            }
    
            if(!articles || articles.length == 0){
                return res.status(400).send({
                    status: "error",
                    message: "No se ha conseguido el articulo"
                });
            }
    
            return res.status(200).send({
                status: "success",
                message: "Articulo conseguido exitosamente",
                articles: articles
            });
        });
    },

    deleteImage: function(req, res){
        var filename = req.params.filename;
        var file_path = "./images/"+filename;

        fs.unlink(file_path, (error)=>{
            if(!error){
                return res.status(200).send({
                    status: "success",
                    message: "Imagen eliminada correctamente"
                });
            }else{
                return res.status(400).send({
                    status: "error",
                    message: "La imagen no existe"
                });
            }
        });
    }
}

function getArticles(req, res, amount = 0){
    Article.find().sort([["date", "descending"]]).exec((err, articles)=>{
        if(err){
            return res.status(500).send({
                status: "error",
                message: "Error con el servidor"
            });
        }

        if(!articles){
            return res.status(400).send({
                status: "error",
                message: "No se han conseguido los articulos"
            });
        }

        if(amount != 0){
            articles = articles.slice(0, amount);
        }

        return res.status(200).send({
            status: "success",
            message: "Articulos conseguidos exitosamente",
            articles: articles
        });
    });
}

function deleteImage(filename){
    var file_path = "./images/"+filename;
        
    fs.unlink(file_path, (error)=>{

    });
    
}

function uploadImage(req, res, articleId){
    if(req.files && req.files.image){
        var image = req.files.image;
    
        var file_path = image.path;
        var filename = file_path.split("\\")[1];
        var type = filename.split(".")[1];
    
        if(type != "jpg" && type != "jpeg" && type != "png" && type != "gif"){
            fs.unlink(file_path, (error)=>{
                    return res.status(400).send({
                        status: "error",
                        message: "La imagen no tiene la extension correcta"
                    });
            });
        }else{
            Article.findOneAndUpdate({_id: articleId}, {image: filename}, {new: true}, (err, articleUpdated)=>{});
        }
    }
}

module.exports = postController