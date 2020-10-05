import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <div class="row" style={{paddingTop:100}}>
                <div class="col-md-4"></div>
                <div class="col-md-4">
            <form>
                <h3 >Register</h3>

                <div className="form-group">
                    
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered ? <a href="/">Login here</a>
                </p>
            </form>
            </div><div class="col-md-4"></div>
            </div>
        );
    }
}