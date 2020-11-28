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
        //alert(this.state.isUpload)
      }
    
      handleUsage() {
        this.setState({isUpload: 0});
        //alert(this.state.isUpload)
      }

    render(){

        
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
                                    <Nav.Link class="navbar-brand pull-right" href="/logout">Logout</Nav.Link></Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        
                    </div>
                    </div>
                <Child data = {this.state.isUpload} userid= {this.props}></Child>
                
            </div>
        )  
    }
}