import React, {Component} from "react";
import {global} from "../global";
import emptyImage from "../assets/images/empty-image.jpg";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";

class Article extends Component{
    url = global.url;
    state = {
        article: this.props.article
    }

    render(){
        console.log(this.state.article);
        return (
            <React.Fragment>
                <article>
                    <h3><NavLink to={"/article/"+this.state.article._id}>{this.state.article.title}</NavLink></h3>
                    <div>
                        {this.state.article.image ?
                            <img src={this.url+"image/"+this.state.article.image} alt="" />
                            :
                            <img src={emptyImage} alt="" />
                        }
                        <div>
                            <p>{this.state.article.content}</p>
                            <p className="date"><Moment fromNow>{this.state.article.date}</Moment></p>
                        </div>
                    </div>
                </article>                
            </React.Fragment>
        );
    }
}

export default Article;
