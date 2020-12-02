import React, { Component } from "react";
import { Navbar,Nav} from 'react-bootstrap'



import Child from "./child.component";

export default class Main extends Component {

   

    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleUsage = this.handleUsage.bind(this);
        this.state = {isUpload: 1};
      }


    
      handleUpload() {
        this.setState({isUpload: 1});
        
      }
    
      handleUsage() {
        this.setState({isUpload: 0});
        
      }

    render(){

        console.log(this.props)
        
        return(

            

            <div>
                <div className="row">
                    <div className="col-md-12">
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">Caption It !</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link onClick={this.handleUpload}>Upload an image</Nav.Link>
                                    
                                    <Nav.Link onClick={this.handleUsage}>My usage</Nav.Link>
                                    
                                    
                                    </Nav>
                                    <Nav>
        <Nav class="navbar-brand pull-right">Hi {this.props.location.state.firstname} {this.props.location.state.lastname} ! </Nav></Nav>
                                    <Nav>
                                    <Nav.Link class="navbar-brand pull-right" href="/logout">Logout</Nav.Link></Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        
                    
                <Child data = {this.state.isUpload} userid={this.props.location.state.userid} firstname = {this.props.location.state.firstname} lastname={this.props.location.state.lastname} email={this.props.location.state.email} plan={this.props.location.state.plan} subscribedon={this.props.location.state.subscribedon} usage={this.props.location.state.usage}></Child>
                </div>
                    </div>
                
            </div>
        )  
    }
}