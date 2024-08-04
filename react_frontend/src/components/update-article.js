import React, {Component} from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {global} from "../global";
import { Redirect } from "react-router";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

class UpdateArticle extends Component{
    title = React.createRef();
    content = React.createRef();
    form = new FormData();

    state = {
        article: {},
        status: null
    }
    componentWillMount(){
        this.validator = new SimpleReactValidator();
        this.getArticle();
    }

    onChange = ()=>{
        this.setState({
            article: {
                title: this.title.current.value,
                content: this.content.current.value,
                image: this.state.article.image,
                _id: this.state.article._id,
                date: this.state.article.date
            }
        })
    }

    getArticle(){
        if(this.props.match.params.id){
            var id = this.props.match.params.id;
            axios.get(global.url+"article/"+id)
                .then(res=>{
                    this.setState({
                        article: res.data.article,
                    }, ()=>{
                        this.title.current.value = this.state.article.title;
                        this.content.current.value = this.state.article.content;
                    });
                }, err=>{
                    this.setState({
                        status: false
                    });
                })
                
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.form.append("title", this.title.current.value);
        this.form.append("content", this.content.current.value);

        if(this.validator.allValid()){ 
            axios.put(global.url+"article/"+this.state.article._id, this.form)
                .then(res=>{
                    this.setState({
                        status: "success"
                    });
                    swal("Articulo actualizado exitosamente", 
                    "Esperamos que este disfrutando de nuestros servicios",
                     "success");
                }, err=>{
                    this.setState({
                        status: "error"
                    });
                });
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    getImage = (e)=>{
        var file = e.target.files[0];
        this.form.append("image", file);
    }
    render(){

        if(this.state.status === "success"){
            return  <Redirect to={"/article/"+this.state.article._id}/>
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
                            {this.state.article != null && this.state.article.image != null &&
                                <img id="articleImage" src={global.url+"image/"+this.state.article.image} alt="" />
                            }

                            <input type="submit" value="Enviar" className="btn"/>
                        </form>
                    </section>
                    <Sidebar/>
                </div>
            </React.Fragment>
        );

        
    }
}

export default UpdateArticle;