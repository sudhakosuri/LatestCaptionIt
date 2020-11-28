import React, { Component } from "react";
import { PieChart } from 'react-chartkick'
import 'chart.js'

export default class Usage extends Component {


    constructor(props) {
        super(props);
        this.state = {subscription_type:'', subscribed_on:'', usage_details:0}
      }

    componentDidMount() {

        const uid = this.props.userid.userid.location.state.userid

        const requestOptions = {
            method: 'GET',
            headers: { 'Access-Control-Request-Method': 'GET'
            , 'Access-Control-Request-Headers': '*', 'x-auth-token': 'auth'}
        };

        const link_uri = 'https://86wu00bura.execute-api.us-east-1.amazonaws.com/v1/users/'+uid

        console.log(link_uri)

        fetch(link_uri, requestOptions)
        .then(response => {
            
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = "There was some problem in the request. Please try again."
                return Promise.reject(error);
            }
            console.log(response)
            return response.json()
        })
        .then(data => {
        
            console.log(data)
            this.setState({subscription_type:data.plan, subscribed_on:data.subscribedon, usage_details:data.usage})

        })
        .catch(error => {
            console.error(error);
            alert(error)
        });

    }


    render(){
        
        return(
            <div>
                <div className="row">
                    
                    <div className="col-md-12">
                        <div className="row">
                        <span>Subscription type: </span>&nbsp;&nbsp;&nbsp;{this.state.subscription_type}
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscription Usage: </span><span>
                            
                        <PieChart data={[["Remaining: "+(100-this.state.usage_details)+'%', (100-this.state.usage_details)], ["Used: "+ (this.state.usage_details) +'%', this.state.usage_details]]} />
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )  
    }
}