import React, { Component } from "react";
import { PieChart } from 'react-chartkick'
import 'chart.js'

export default class Usage extends Component {


    constructor(props) {
        super(props);
        this.state = {email:'', date:'', usage:0}
      }


    componentDidMount() {

        console.log(this.props.data)

        let uid = this.props.data.userid

        const requestOptions2 = {
            method: 'GET',
            headers: { 'Access-Control-Request-Method': 'GET'
            , 'Access-Control-Request-Headers': '*', 'x-auth-token': 'auth'}
            
        };

        let fetch_url = 'https://86wu00bura.execute-api.us-east-1.amazonaws.com/v1/users/'+uid

        fetch(fetch_url, requestOptions2)
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
            
            this.setState({email: data.email, date:data.subscribedon, usage:data.usage})            

        })
        .catch(error => {
            console.error('There was an error!', error);
            alert(error)
        });
        
    }

    

    render(){
        
        return(
            <div>
                <div className="row">
                    
                    <div className="col-md-12">
                    
                        <div className="row">
                        <span>Subscription email: </span>&nbsp;&nbsp;&nbsp;{this.state.email}
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscription type: </span>&nbsp;&nbsp;&nbsp;basic
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscribed on: </span>&nbsp;&nbsp;&nbsp;{this.state.date}
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscription Usage: </span><span>
                            
                        <PieChart data={[["Remaining: "+(100-this.state.usage)+'%', (100-this.state.usage)], ["Used: "+ (this.state.usage) +'%', this.state.usage]]} />
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )  
    }
}