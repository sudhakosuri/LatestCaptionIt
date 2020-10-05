import React, { Component } from "react";

import Main from './main.component';







export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {isValidUser: false};
      }

    handleLogin() {

        
        this.setState({isValidUser: true});
        
    }
    

    render() {
        if (this.state.isValidUser === true) {
            return(
                    <Main></Main>
                )
               
          }

        return (
            <div class="row" style={{paddingTop:100}}>
                <div class="col-md-4"></div>
                <div class="col-md-4">
                <div class="col-md-1"></div>
                    <div class="col-md-8">
                
                <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div class="row">
                    
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleLogin}>Submit</button>
                <p className="forgot-password text-right">
                    New user ? <a href="/sign-up">Register here</a>
                </p>
            </form>
            </div>
            
            </div><div class="col-md-4"></div>
            </div>
        );
    }

    
}