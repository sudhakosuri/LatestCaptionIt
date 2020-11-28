import React, { Component } from "react";
import Result from "./result.component";
import ImageUploader from 'react-images-upload';



export default class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {file: '', url: '', error:false, showResults:false, data:''};
      }


    

    urlChanged(event){

        this.setState({file: this.state.file, url:event.target.value, error:this.state.error, showResults:this.state.showResults, data: this.state.data})
        
    }

    fileChangedHandler(picture){

        this.setState({file: picture, url:this.state.url, error:this.state.error, showResults:this.state.showResults, data: this.state.data})
      
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
      
    uploadHandler(){

        let dt = ''

        if ((this.state.url == null || this.state.url == '') && (this.state.file == null || this.state.file == '')) {
            this.setState({file: this.state.file, url:this.state.url, error:true, showResults:this.state.showResults, data: this.state.data})
        }
        else {


            const uid = this.props.userid.userid.location.state.userid

            const this_real = this


            if (this.state.url != '' && this.state.url != null)
            {

                let img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function(){
                    var canvas = document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'), dataURL;
                    canvas.height = img.height;
                    canvas.width = img.width;
                    ctx.drawImage(img, 0, 0);
                    dataURL = canvas.toDataURL("image/jpg");

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Access-Control-Request-Method': 'POST'
                        , 'Access-Control-Request-Headers': '*'},
                        body: JSON.stringify({ 
                            'id': uid,
                            'image': dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
                          })
                    };

                    fetch('https://86wu00bura.execute-api.us-east-1.amazonaws.com/v1/caption', requestOptions)
                    .then(function(response) {
                        
            
                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = "There was some problem in the request. Please try again."
                            return Promise.reject(error);
                        }
                        return response.json()
                    })
                    .then(function (data) {
            
                        console.log(data)
                        if (data.statusCode != 200) {
                            // get error message from body or default to response statusText
                            const error = (JSON.parse(data.body)).message
                            return Promise.reject(error);
                        }

                        dt = dataURL.replace(/^data:image\/(png|jpg);base64,/, "")

                        console.log(dt)
                        this_real.setState({file: this_real.state.file, url:this_real.state.url, error:false, showResults:true, data: (JSON.parse(data.body)).message})
                
                        
            
                    })
                    .catch(function(error) {
                        console.error('There was an error!', error);
                        alert(error)
                    });
                    
                };
                img.src = this.state.url

                
            }
            else {
                this.getBase64(this.state.file[0], (result) => {
        
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Access-Control-Request-Method': 'POST'
                        , 'Access-Control-Request-Headers': '*'},
                        body: JSON.stringify({ 
                            'id': uid,
                            'image': result.replace(/^data:image\/(png|jpg);base64,/, "")
                          })
                    };
            
                    fetch('https://86wu00bura.execute-api.us-east-1.amazonaws.com/v1/caption', requestOptions)
                    .then(response => {
                        
            
                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = "There was some problem in the request. Please try again."
                            return Promise.reject(error);
                        }
                        return response.json()
                    })
                    .then(data => {
            
                        console.log(data)
                        if (data.statusCode != 200) {
                            // get error message from body or default to response statusText
                            const error = (JSON.parse(data.body)).message
                            return Promise.reject(error);
                        }
        
                        this_real.setState({file: '', url:'', error:false, showResults:true, data: (JSON.parse(data.body)).message})
                        
            
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                        alert(error)
                    });
        
                 
        
                });
            }

            

            

           
        /**/

            
               
        }
    }

    reset() {
        document.getElementById("imgfile");
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
                            
                        <ImageUploader id="imgfile"
                withIcon={true}
                buttonText='Browse image'
                onChange={this.fileChangedHandler.bind(this)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                class="form-control"  placeholder="Image"
            />
            {this.state.error && <div  style={{float:'left'}}><p style={{color: 'red'}}>Should provide URL or upload an image</p></div>}
                        </div>
                        <br/>
                        <br/>
                        
                        <button type="button" class="btn btn-primary" onClick={this.uploadHandler.bind(this)}>Get caption</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={this.reset.bind(this)}>Reset</button>
                    </form>
                    </div>
                    {this.state.showResults && <div className="col-md-2"><Result file={this.state.file} data={this.state.data}></Result></div>}
                    
                    
                </div>
            </div>
        )  
    }
}