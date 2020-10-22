import React, { Component } from "react";
import { PieChart } from 'react-minimal-pie-chart';
    

export default class Usage extends Component {
    render(){
        return(
            <div>
                <div className="row">
                    
                    <div className="col-md-12">
                        <div className="row">
                        <span>Subscription type: </span>&nbsp;&nbsp;&nbsp;Basic
                        </div>
                        &nbsp;
                        <div className="row">
                        <span>Subscription Usage: </span><span>
                            
                            <PieChart
                                data={[
                                    { title: '100%', value: 10, percentage: 100, color: '#006600' }
                                ]}  animate
                                animationDuration={500}
                                animationEasing="ease-out" label={(data) => data.dataEntry.title} labelStyle={{
                                    fontSize: "8px",
                                    fontColor: "FFFFFA",
                                    fontWeight: "800",
                                  }} lineWidth={100} reveal={100} radius={35}
                            /></span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )  
    }
}