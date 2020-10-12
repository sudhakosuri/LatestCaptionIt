import React, { Component } from "react";
    

export default class Result extends Component {
    render(){
        if (this.props.file != null) {
        return(
            <div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        Hello Results
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )}  else {return null}
    }
}