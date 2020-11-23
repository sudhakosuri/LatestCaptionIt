import React, { Component } from "react";

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {firstName:'', lastName:'', email:'', password:'', errorEmail:'', errorfirstName:'', errorlastName:'', errorPassword:''}
      }


    onSubmit(e) {
        e.preventDefault();
        console.log(e)
        if(this.state.errorEmail=='' && this.state.errorfirstName=='' && this.state.errorlastName=='' && this.state.errorPassword=='') {
            alert("All good")

            
            const requestOptions = {
                method: 'POST',
                headers: { 'Access-Control-Request-Method': 'POST'
                , 'Access-Control-Request-Headers': '*'},
                body: JSON.stringify({ 
                    'firstname': this.state.firstName,
                    'lastname': this.state.lastName,
                    'email': this.state.email,
                    'password': this.state.password,
                    'plan': 'basic',
                    'subscribedon': new Date()
                  })
            };
            try {
            fetch('https://d42pe9z166.execute-api.us-east-1.amazonaws.com/stage1/api/v1/users', requestOptions)
                .then(response => response.json())
                .then(data => alert("Successfully registered !!"));
            }
            catch (error) {
                console.error(error);
                alert("Something went wrong! Please try again")
            }
        }
        
        else {
            console.log(this.state)

            alert("Please enter valid fields before submitting")
        }
        
     }

    handleEmailChange(e) {

        const em = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
        console.log("On email change")
        this.setState({email: e.target.value, errors:this.state.errors, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword, errorEmail: this.state.errorEmail});
        if(e.target.value=='')
            this.setState({errorEmail:'Required', errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword});
        else if(e.target.value.length>0 && !em.test(e.target.value))
            this.setState({errorEmail:'Invalid email address', errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword});
        else 
            this.setState({errorEmail:'', errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword:this.state.errorPassword});
     }

     handlefirstNameChange(e) {
        const fName = new RegExp("[a-zA-Z]")
        this.setState({firstName: e.target.value, errors:this.state.errors, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword, errorEmail: this.state.errorEmail});
        
        if(e.target.value=='')
            this.setState({errorfirstName:'Required', errorEmail:this.state.errorEmail, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword});
        else if (e.target.value.length>15)
            this.setState({errorfirstName:'Too long', errorEmail:this.state.errorEmail, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword});
        else if(e.target.value.length>0 && !fName.test(e.target.value))
            this.setState({errorfirstName:'Must contain characters only', errorEmail:this.state.errorEmail, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword});
        else 
            this.setState({errorEmail:this.state.errorEmail, errorfirstName:'', errorlastName:this.state.errorlastName, errorPassword:this.state.errorPassword});

     }

     handlelastNameChange(e) {
        const lName = new RegExp("[a-zA-Z]")
        this.setState({lastName: e.target.value, errors:this.state.errors, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword, errorEmail: this.state.errorEmail});
        if(e.target.value=='')
            this.setState({errorlastName:'Required', errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorPassword: this.state.errorPassword});
        else if (e.target.value.length>15)
            this.setState({errorlastName:'Too long', errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorPassword: this.state.errorPassword});
        else if(e.target.value.length>0 && !lName.test(e.target.value))
            this.setState({errorlastName:'Must contain characters only', errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorPassword: this.state.errorPassword});
        else 
            this.setState({errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorlastName:'', errorPassword:this.state.errorPassword});
     }

     handlePasswordChange(e) {
        const pwd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        this.setState({password: e.target.value, errors:this.state.errors, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword: this.state.errorPassword, errorEmail: this.state.errorEmail});
        if(e.target.value=='')
            this.setState({errorPassword:'Required', errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName});
        else if (e.target.value.length>15)
            this.setState({errorPassword:'Too long', errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName});
        else if(e.target.value.length>0 && !pwd.test(e.target.value))
            this.setState({errorPassword:'Min 8 characters, atleast one uppsercase, atleats one lower case, one number and one special character', errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName});
        else 
            this.setState({errorEmail:this.state.errorEmail, errorfirstName:this.state.errorfirstName, errorlastName:this.state.errorlastName, errorPassword:''});
     }

    render() {
        return (
            
            <div class="row" style={{paddingTop:100}}>
                <div class="col-md-4"></div>
                <div class="col-md-4">
            <form>
                <h3 >Create Account</h3>
                
                

                <div className="form-group" >
                    
                    <input type="text" className="form-control" placeholder="Enter First name*" value={this.state.firstName} onChange={this.handlefirstNameChange.bind(this)}/>
                    {(this.state.errorfirstName!='') && <div  style={{float:'left'}}><p style={{color: 'red'}}>{this.state.errorfirstName}</p></div>}
                </div>

                <div className="form-group">
                    
                    <input type="text" className="form-control" placeholder="Enter Last name*" value={this.state.lastName} onChange={this.handlelastNameChange.bind(this)}/>
                    {(this.state.errorlastName!='') && <div  style={{float:'left'}}><p style={{color: 'red'}}>{this.state.errorlastName}</p></div>}
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email*" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                    {(this.state.errorEmail!='') && <div  style={{float:'left'}}><p style={{color: 'red'}}>{this.state.errorEmail}</p></div>}
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password*" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                    {(this.state.errorPassword!='') && <div  style={{float:'left'}}><p style={{color: 'red'}}>{this.state.errorPassword}</p></div>}
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit.bind(this)}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered ? <a href="/">Login here</a>
                </p>
            </form>
            </div><div class="col-md-4"></div>
            </div>
        );
    }
}