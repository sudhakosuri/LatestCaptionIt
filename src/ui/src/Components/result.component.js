import React, { Component } from "react";
    

export default class Result extends Component {
    render(){
        console.log(this.props.data)
        if (this.props.file != null) {

        return(
            <div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        {this.props.data}
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )}  else {return null}
    }
}