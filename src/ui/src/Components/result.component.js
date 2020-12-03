import React, { Component } from "react";
import { IconName } from 'react-feather';


    

export default class Result extends Component {

    constructor(props) {
        super(props);
        
    }

    render(){
       

        if (this.props.file != null || this.props.url!= null || this.props.file!='' || this.props.url!='' || (typeof this.props.file != undefined) || (typeof this.props.url != undefined)) {

            let src1=''
            if(this.props.url!='' && this.props.url!=null && (typeof this.props.url != undefined)) {
                src1 = this.props.url
                
                
            }
            else if(this.props.file!='' && this.props.file!=null && (typeof this.props.file != undefined)){
                
                src1 = "http://127.0.0.1:8887/"+this.props.file.name
                
            }

            let dup = this.props.data

            let str_list = dup.split(' ')

            let uni_list = []

            
           

        return(
            
            <div>
                <div class="row"></div>
                <div class="row"></div>
                <div>
                <img id="result_img" src={src1} width='220px' height='220px'/>
                </div>        
                &nbsp;
                <div class="row"><h4>Caption:</h4> {dup}</div>
                
                    
            </div>
        )}  else if ((this.props.file != null || this.props.file!='' || (typeof this.props.file != undefined)) && (this.props.url!= null ||  this.props.url!='' || (typeof this.props.url != undefined))){return null}
    }
}