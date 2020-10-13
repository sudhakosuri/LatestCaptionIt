import React, { Component } from "react";

import Main from './main.component';







export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false, userName: '', password: '', erroruserName: '', errorPassword: ''};
      }

    handleLogin() {

        
        var uname = this.state.userName
        var pwd = this.state.password
        
        if (uname != 'test' && pwd != 'test'){
            alert("Invalid credentials ! Please try again")    
        }
        else {
            this.setState({isLoggedIn: true, userName: this.state.userName, password: this.state.password, erroruserName: this.state.erroruserName, errorPassword: this.state.errorPassword})   
        }
    }

    handleuserNameChange(e) {


            if(e.target.value == ''){
            this.setState({isLoggedIn: this.state.isLoggedIn, userName: e.target.value, password: this.state.password, erroruserName: 'Required', errorPassword: this.state.errorPassword})
            }
            else {
                this.setState({isLoggedIn: this.state.isLoggedIn, userName: e.target.value, password: this.state.password, erroruserName: '', errorPassword: this.state.errorPassword})
            }
            
    }

    handlePasswordChange(e) {

        if(e.target.value =='') {
            this.setState({isLoggedIn: this.state.isLoggedIn, userName: this.state.userName, password: this.state.password, erroruserName: this.state.erroruserName, errorPassword: 'Required'})
        }
        else {
            this.setState({isLoggedIn: this.state.isLoggedIn, userName: this.state.userName, password: e.target.value, erroruserName: this.state.erroruserName, errorPassword: ''})
        }
       

    }
    

    render() {
        if (this.state.isLoggedIn === true) {
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
                    <input type="text" className="form-control" placeholder="Enter email*" onChange={this.handleuserNameChange.bind(this)} />
                    {(this.state.erroruserName!='') && <div  style={{float:'left'}}><p style={{color: 'red'}}>{this.state.erroruserName}</p></div>}
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter password*" onChange={this.handlePasswordChange.bind(this)}/>
                    {(this.state.errorPassword!='') && <div  style={{float:'left'}}><p style={{color: 'red'}}>{this.state.errorPassword}</p></div>}
                </div>

                <div class="row">
                    
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleLogin.bind(this)}>Submit</button>
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