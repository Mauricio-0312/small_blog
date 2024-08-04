import React, {Component} from "react";
import { Redirect } from "react-router";

class Sidebar extends Component{
    state ={
        search: false
    };
    searchParamter = React.createRef();

    search = (e) => {
        e.preventDefault();
        this.setState({
            search: true
        })
        console.log(this.searchParamter.current.value);
    }

    render(){
        if(this.state.search === true){
            return <Redirect to={"/redirect/search/"+this.searchParamter.current.value}/>
        }
        return (
            <aside>
                <div id="createDiv">
                    <h3>Puedes hacer esto</h3>
                    <a href="#">Crear articulo</a>
                </div>
                <div id="searchDiv">
                    <h3>Buscador</h3>
                    <form action="#" onSubmit={this.search}>
                        <input type="text" name="search" id="search"  ref={this.searchParamter}/>
                        <input type="submit" value="Buscar" />
                    </form>
                </div>
            </aside>
        );

        
    }
}

export default Sidebar;