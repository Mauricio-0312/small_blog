import React, {Component} from "react";
import Sidebar from "./Sidebar";
import Slider from "./Slider";
import axios from "axios";
import {global} from "../global";
import {Redirect} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

class Home extends Component{
    title = React.createRef();
    content = React.createRef();
    image = new FormData();

    componentWillMount(){
        this.validator = new SimpleReactValidator();
    }

    state = {
        status: null,
        article: {}
    }

    onChange = ()=>{
        this.setState({
            article: {
                title: this.title.current.value,
                content: this.content.current.value
            }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        var article = {
            title: this.title.current.value,
            content: this.content.current.value
        }
        if(this.validator.allValid()){ 
            console.log(article);
            axios.post(global.url+"save", article)
                .then(res=>{
                    if(this.image.has("image")){
                        axios.post(global.url+"upload/image/"+ res.data.article._id, this.image)
                            .then(res=>{
                                    this.setState({
                                        status: "success"
                                    });
                                    
                            }, err=>{
                                this.setState({
                                    status: "error"
                                });
                            });
                    }else{
                        this.setState({
                            status: "success"
                        })
                    }

                    swal("Articulo guardado exitosamente", 
                    "Esperamos que este disfrutando de nuestros servicios",
                     "success");
                });
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    getImage = (e)=>{
        var file = e.target.files[0];
        this.image.append("image", file);
    }
    render(){
         if(this.state.status === "success"){
            return  <Redirect to={"/home"}/>
        }
        return (
            <React.Fragment>
                <div id="main">
                    <section id="form">
                        <h2>Formulario</h2>
                        {this.state.status === "success" &&
                            <p className="alert alert-success">Articulo guardado exitosamente</p>
                        }
                        {this.state.status === "error" &&
                            <p className="alert alert-danger">No se ha guardado el articulo exitosamente</p>
                        }
                        <form action="#" onSubmit={this.onSubmit} onChange={this.onChange}> 
                            <label htmlFor="title">Titulo:</label>
                            <input type="text" name="title" ref={this.title}/>
                            {this.validator.message("title", this.state.article.title, "required|alpha_num_space")}

                            <label htmlFor="content">Contenido:</label>
                            <textarea name="content" ref={this.content}></textarea>
                            {this.validator.message("content", this.state.article.content, "required|alpha_num_space")}

                            <label htmlFor="image">Nombre:</label>
                            <input type="file" name="image" onChange={this.getImage}/>
                            <input type="submit" value="Enviar" className="btn"/>
                        </form>
                    </section>
                    <Sidebar/>
                </div>
            </React.Fragment>
        );

        
    }
}

export default Home;