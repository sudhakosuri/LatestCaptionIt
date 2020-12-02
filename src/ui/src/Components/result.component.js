import React, { Component } from "react";


    

export default class Result extends Component {

    constructor(props) {
        super(props);
        
    }

    render(){
       
        console.log(this.props.data)
        console.log(this.props.file)
        console.log(this.props.url)
        console.log(this.props.file != null)
        console.log(this.props.file!='')
        console.log(typeof this.props.file != undefined)
        console.log(this.props.url!= null)
        console.log(this.props.url!='')
        console.log(typeof this.props.url != undefined)

        if (this.props.file != null || this.props.url!= null || this.props.file!='' || this.props.url!='' || (typeof this.props.file != undefined) || (typeof this.props.url != undefined)) {

            let src1=''
            if(this.props.url!='' && this.props.url!=null && (typeof this.props.url != undefined)) {
                src1 = this.props.url
                
                
            }
            else if(this.props.file!='' && this.props.file!=null && (typeof this.props.file != undefined)){
                
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
        )}  else if ((this.props.file != null || this.props.file!='' || (typeof this.props.file != undefined)) && (this.props.url!= null ||  this.props.url!='' || (typeof this.props.url != undefined))){return null}
    }
}