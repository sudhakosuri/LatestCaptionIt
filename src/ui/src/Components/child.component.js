import React, { Component } from "react";
    
import Upload from "./imageUpload.component";
import Usage from "./usage.component";



export default class Child extends Component {

    constructor(props) {
        super(props);
      }

    
    render(){

        if (this.props.data === 1) {
            return(
                <div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-11">
                            
                                <p style={{alignment: "center"}}>{this.props.datafromParent}</p>
                                <Upload data = {this.props}/>
                            
                        
                        </div>
                        
                    </div>
                </div>
            )  
        }
        return(
            <div>
                <div className="row">
                    <div className="row"></div>
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                    <p>{this.props.datafromParent}</p>
                        <Usage data={this.props}/>
                    </div>
                </div>
            </div>
        )  
    }
}

