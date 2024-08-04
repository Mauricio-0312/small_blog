const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var app = require("./app");

mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true}).then(()=>{
    console.log("Database connected successfully");
    
    app.listen(8080, ()=>{
        console.log("LocalServer displayed successfully on port 8080");
    });
}).catch(err=>{
    console.log("Error");
});