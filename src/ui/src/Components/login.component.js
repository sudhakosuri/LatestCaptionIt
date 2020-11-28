import React, { Component } from "react";
import { Redirect } from 'react-router-dom'










export default class Login extends Component {

    

    constructor(props) {
        super(props);
        
        this.state = {isLoggedIn: false, userName: '', password: '', erroruserName: '', errorPassword: '', userid:''};
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

        fetch('https://86wu00bura.execute-api.us-east-1.amazonaws.com/v1/authenticate', requestOptions)
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

            console.log(data)
            if (data.statusCode != 200) {
                // get error message from body or default to response statusText
                const error = (JSON.parse(data.body)).message
                return Promise.reject(error);
            }
            const uid = (JSON.parse(data.body)).id
            this.setState({isLoggedIn: true, userName: this.state.userName, password: this.state.password, erroruserName: this.state.erroruserName, errorPassword: this.state.errorPassword, userid: uid})
            

        })
        .catch(error => {
            console.error('There was an error!', error);
            alert(error)
        });
        
        
    }

    handleuserNameChange(e) {


            if(e.target.value == ''){
            this.setState({isLoggedIn: this.state.isLoggedIn, userName: e.target.value, password: this.state.password, erroruserName: 'Required', errorPassword: this.state.errorPassword, userid:this.state.userid})
            }
            else {
                this.setState({isLoggedIn: this.state.isLoggedIn, userName: e.target.value, password: this.state.password, erroruserName: '', errorPassword: this.state.errorPassword, userid:this.state.userid})
            }
            
    }

    handlePasswordChange(e) {

        if(e.target.value =='') {
            this.setState({isLoggedIn: this.state.isLoggedIn, userName: this.state.userName, password: this.state.password, erroruserName: this.state.erroruserName, errorPassword: 'Required', userid:this.state.userid})
        }
        else {
            this.setState({isLoggedIn: this.state.isLoggedIn, userName: this.state.userName, password: e.target.value, erroruserName: this.state.erroruserName, errorPassword: '', userid:this.state.userid})
        }
       

    }

   
    

    render() {
        if (this.state.isLoggedIn === true) {


            
                return (

                    <Redirect to={{pathname: "/home", state: { uname: this.state.userName, pwd: this.state.password, userid:this.state.userid} }} />
                    

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