import React, { Component } from "react";
    
import Upload from "./imageUpload.component";
import Usage from "./usage.component";



export default class Child extends Component {

    
    render(){
        if (this.props.data === 1) {
            return(
                <div>
                    <div className="row">
                        <div className="col-md-12"></div>
                        <p style={{alignment: "center"}}>{this.props.datafromParent}</p>
                            <Upload/>
                    </div>
                </div>
            )  
        }
        return(
            <div>
                <div className="row">
                    <div className="col-md-12"></div>
                    <p>{this.props.datafromParent}</p>
                        <Usage/>
                </div>
            </div>
        )  
    }
}

