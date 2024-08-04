import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Blog from "./Blog";
import CreateArticle from "./Create-article";
import ArticleDetail from "./Article-detail";
import UpdateArticle from "./update-article";

class Router extends Component{
    render(){
        return (

            <BrowserRouter>
                <Header/>

                <Switch>
                    <Route exact path="/home" component={Home}></Route>
                    <Route exact path="/blog" component={Blog}></Route>
                    <Route exact path="/search/:search" component={Blog}></Route>
                    <Route exact path="/redirect/search/:search" render={(props)=>{
                        var search = props.match.params.search;
                        return <Redirect to={"/search/"+search}/>
                    }}></Route>

                    <Route exact path="/create/article" component={CreateArticle}></Route>
                    <Route exact path="/article/:id" component={ArticleDetail}></Route>
                    <Route exact path="/update/article/:id" component={UpdateArticle}></Route>

                    <Route component={Home}></Route>

                </Switch>

                <Footer/>
            </BrowserRouter>
        );

        
    }
}

export default Router;