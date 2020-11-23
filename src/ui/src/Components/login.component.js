import React, { Component } from "react";
import { Redirect } from 'react-router-dom'










export default class Login extends Component {

    

    constructor(props) {
        super(props);
        
        this.state = {isLoggedIn: false, userName: '', password: '', erroruserName: '', errorPassword: ''};
      }

      onSubmit(e) {

        e.preventDefault();
        console.log(e)
        var uname = this.state.userName
        var pwd = this.state.password

        console.log(uname)
        console.log(pwd)
        const requestOptions = {
            method: 'POST',
            headers: { 'Access-Control-Request-Method': 'POST'
            , 'Access-Control-Request-Headers': '*'},
            body: JSON.stringify({ 
                'email': uname,
                'password': pwd
              })
        };

        fetch('https://d42pe9z166.execute-api.us-east-1.amazonaws.com/stage1/api/v1/authenticate', requestOptions)
        .then(response => {
            const data = response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText
                return Promise.reject(error);
            }

            this.setState({isLoggedIn: true, userName: this.state.userName, password: this.state.password, erroruserName: this.state.erroruserName, errorPassword: this.state.errorPassword})
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert('Invalid credentials ! Please try again.')
        });
        
        
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
            
                return (

                    <Redirect to={{pathname: "/home", state: { uname: this.state.userName, pwd: this.state.password} }} />
                    

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
                    <input type="password" className="form-control" placeholder="Enter password*" onChange={this.handlePasswordChange.bind(this)}/>
                    {(this.state.errorPassword!='') && <div  style={{float:'left'}}><p style={{color: 'red'}}>{this.state.errorPassword}</p></div>}
                </div>

                <div class="row">
                    
                </div>

                <button type="button" className="btn btn-primary btn-block" onClick={this.onSubmit.bind(this)}>Login</button>
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