import React, {Component} from "react";
import {global} from "../global";
import emptyImage from "../assets/images/empty-image.jpg";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import swal from "sweetalert";

class ArticleDetail extends Component{
    url = global.url;
    state = {
        article: null,
        status: null
    }

    componentWillMount(){
        this.getArticle();
    }

    getArticle(){
        if(this.props.match.params.id){
            var id = this.props.match.params.id;
            axios.get(global.url+"article/"+id)
                .then(res=>{
                    this.setState({
                        article: res.data.article,
                        status: true
                    });
                    
                }, err=>{
                    this.setState({
                        status: false
                    });
                })
                
        }
    }

    delete = ()=>{
        swal({
            title: "Estas seguro?",
            text: "Una vez que elimines este articulo, no lo podras recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(global.url+"article/"+this.state.article._id)
                    .then(res=>{
                        this.setState({
                            status: "success"
                        });
                    }, err=>{
                        this.setState({
                            status: "error"
                        });
                    });
              swal("Articulo eliminado exitosamente", {
                icon: "success",
              });
            } else {
              swal("Articulo salvado exitosamente");
            }
          });
        
    }
    render(){
        if(this.state.status === "success"){
            return  <Redirect to={"/blog"}/>
        }

        return (
            <React.Fragment>
                <div id="main">
                    <section id="article">
                        {this.state.status === true && 
                            <React.Fragment>
                                {this.state.article.image ?
                                    <img src={global.url+"image/"+this.state.article.image} alt="" />
                                    :
                                    <img src={emptyImage} alt="" />
                                }
                                <h2>{this.state.article.title}</h2>
                                <p>
                                    {this.state.article.content}
                                </p>
                                <NavLink to={"/update/article/"+this.state.article._id} className="btn btn-warning">Editar</NavLink>
                                <button className="btn btn-danger" onClick={this.delete}>Eliminar</button>
                            </React.Fragment>
                        }
                        {this.state.status === false && 
                            <React.Fragment>
                                <p className="alert alert-danger">
                                    Este articulo no existe
                                </p>
                            </React.Fragment>
                        }
                        
                    </section>
                    <Sidebar/>
                </div>
            </React.Fragment>
        );
    }
}

export default ArticleDetail;
