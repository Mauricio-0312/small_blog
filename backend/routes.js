const express = require("express");
var router = express.Router();
var postController = require("./controllers/postController");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({uploadDir: "./images"});

router.get("/prueba", postController.prueba);
router.post("/save", postController.save);
router.get("/articles", postController.findAll);
router.get("/latest-articles", postController.findLatest);
router.get("/article/:id", postController.findOne);
router.put("/article/:id", multipartMiddleware, postController.update);
router.delete("/article/:id", postController.delete);
router.post("/upload/image/:articleId", multipartMiddleware ,postController.uploadImage);
router.get("/image/:image", postController.getImage);
router.delete("/delete/image/:filename", postController.deleteImage);
router.get("/search/:search", postController.search);


module.exports = router;