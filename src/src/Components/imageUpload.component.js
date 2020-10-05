import React, { Component } from "react";
import Result from "./result.component";


export default class Upload extends Component {

    constructor(props) {
        super(props);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.state = {file:null};
      }

    fileChangedHandler = (event) => {
        const img = event.target.files[0]
        this.setState({file: img})
      }
      
    uploadHandler = () => {
        console.log(this.state.file)
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <form>
                        <br/>
                        <div class="form-group">
                            <input type="url" class="form-control"  placeholder="Enter URL"/>
                            
                            
                        </div>
                        <div>
                        <label><br/>OR</label></div>
                        <br/>
                        <div class="form-group">
                            
                            <input type="file" onChange={this.fileChangedHandler} class="form-control"  placeholder="Image"/>
                        </div>
                        <br/>
                        <br/>
                        
                        <button type="submit" class="btn btn-primary" onClick={this.uploadHandler}>Get caption</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary">Reset</button>
                    </form>
                        
                    </div>
                    <div className="col-md-2"><Result data = {this.state.file}/></div>
                </div>
            </div>
        )  
    }
}