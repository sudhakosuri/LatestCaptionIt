import React, { Component } from "react";
    

export default class Result extends Component {
    render(){
        console.log(this.props.data)
        console.log(this.props.file)
        console.log(this.props.url)
        if (this.props.file != null) {

            let src1=''
            if(this.props.url!='' && this.props.url!=null) {
                src1 = this.props.url
            }
            else {
                console.log(this.props.file)
                var image = document.getElementById('result_img');
                src1 = "http://127.0.0.1:8887/"+this.props.file.name
            }

            console.log(src1)

        return(
            
            <div>
                <div class="row"></div>
                <div class="row"></div>
                <div>
                <img id="result_img" src={src1} width='220px' height='220px'/>
                </div>        
                
                <div class="row">{this.props.data}</div>
                <a class="btn btn-block btn-social btn-twitter">
    <span class="fa fa-twitter"></span> Sign in with Twitter
  </a>
                    
            </div>
        )}  else {return null}
    }
}