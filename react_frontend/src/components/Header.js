import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import logo from "../assets/images/react.png"
class Header extends Component{
    render(){
        return (
            <header>
                <div><img src={logo} alt="" /><h1>Curso React</h1></div>
                <nav>
                    <ul>
                        <li><NavLink to="/home">Inicio</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink></li>
                        <li><NavLink to="/create/article">Create article</NavLink></li>
                    </ul>
                </nav>
            </header>
            
        );

        
    }
}

export default Header;
