import React, {Component} from "react";

class Slider extends Component{
    render(){
        return (
            <div id="welcome" className={this.props.size}>
                <div>
                    <h2>{this.props.text}</h2>
                    <a href="#">Ir al blog</a>
                </div>
            </div>
        );

        
    }
}

export default Slider;