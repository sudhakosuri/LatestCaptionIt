import React, { Component } from "react";
import Result from "./result.component";


export default class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {file: null, url: null, error:false, showResults:false};
      }

    urlChanged(event){

        this.setState({file: this.state.file, url:event.target.value, error:this.state.error, showResults:this.state.showResults})
        
    }

    fileChangedHandler(event){

        this.setState({file: event.target.files[0], url:this.state.url, error:this.state.error, showResults:this.state.showResults})
      
    }
      
    uploadHandler(){

        if ((this.state.url == null || this.state.url == '') && (this.state.file == null || this.state.file == '')) {
            this.setState({file: this.state.file, url:this.state.url, error:true, showResults:this.state.showResults})
        }
        else {
            this.setState({file: this.state.file, url:this.state.url, error:false, showResults:true})
            
        }
    }

    reset() {
        document.getElementById("create-course-form").reset();
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <form id="create-course-form">
                        <br/>
                        <div class="form-group">
                            <input type="url" class="form-control"  placeholder="Enter URL" onChange={this.urlChanged.bind(this)}/>
                            
                            
                        </div>
                        <div>
                        <label><br/>OR</label></div>
                        <br/>
                        <div class="form-group">
                            
                            <input type="file" onChange={this.fileChangedHandler.bind(this)} class="form-control"  placeholder="Image"/>
                            {this.state.error && <div  style={{float:'left'}}><p style={{color: 'red'}}>Should provide URL or upload an image</p></div>}
                        </div>
                        <br/>
                        <br/>
                        
                        <button type="button" class="btn btn-primary" onClick={this.uploadHandler.bind(this)}>Get caption</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={this.reset.bind(this)}>Reset</button>
                    </form>
                    </div>
                    {this.state.showResults && <div className="col-md-2"><Result file={this.state.file}></Result></div>}
                    
                    
                </div>
            </div>
        )  
    }
}