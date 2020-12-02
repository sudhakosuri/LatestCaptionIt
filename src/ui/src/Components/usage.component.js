import React, { Component } from "react";
import { PieChart } from 'react-chartkick'
import 'chart.js'

export default class Usage extends Component {


    constructor(props) {
        super(props);
        
      }

    

    render(){
        
        return(
            <div>
                <div className="row">
                    
                    <div className="col-md-12">
                        &nbsp;
                        <div className="row">
                        <span>Subscription email: </span>&nbsp;&nbsp;&nbsp;{this.props.data.email}
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscription type: </span>&nbsp;&nbsp;&nbsp;{this.props.data.plan}
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscribed on: </span>&nbsp;&nbsp;&nbsp;{this.props.data.subscribedon}
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscription Usage: </span><span>
                            
                        <PieChart data={[["Remaining: "+(100-this.props.data.usage)+'%', (100-this.props.data.usage)], ["Used: "+ (this.props.data.usage) +'%', this.props.data.usage]]} />
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )  
    }
}