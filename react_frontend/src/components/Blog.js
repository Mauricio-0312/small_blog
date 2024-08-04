import React, {Component} from "react";
import Sidebar from "./Sidebar";
import Slider from "./Slider";
import Article from "./Article";
import axios from "axios";
import {global} from "../global";
import loader from "../assets/images/loader.gif"

class Blog extends Component{
    state ={
        articles: [],
        status: null
    }

    componentWillMount(){
        this.getArticles();
    }
    
    getArticles(){
        if(!this.props.match.params.search){
            axios.get(global.url+"articles")
            .then(res =>{
                this.setState({
                    articles: res.data.articles
                });
            })
        }else{
            var search = this.props.match.params.search;
            axios.get(global.url+"search/"+search)
                .then(res=>{
                    this.setState({
                        articles: res.data.articles
                    });
                }, err=>{
                    this.setState({
                        status: false
                    });
                });
        }
        
    }
    render(){
        return (
            <React.Fragment>
                <Slider
                    text="Blog"
                    size="small-slider"
                />
                <div id="main">
                    <section id="articles">
                        {this.state.articles.length >= 1 &&
                            this.state.articles.map((article, index)=>{
                                return (<Article
                                    key={index}
                                    article={article}
                                />)
                            })
                        }

                    {this.state.articles.length === 0 && this.state.status === null &&
                        <img src={loader} className="loader"/>
                    }

                    </section>
                    <Sidebar/>
                </div>
            </React.Fragment>
        );

        
    }
}

export default Blog;