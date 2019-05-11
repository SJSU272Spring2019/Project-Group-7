

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import React, {Component} from 'react';
import PropTypes from 'react';
import {Field,reduxForm} from 'redux-form';


import { signup } from '../../actions/loginaction';

//Define a Login Component
class signupPage extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
  
        this.onSignUp = this.onSignUp.bind(this);
    }
    static propTypes = {
        handleSubmit: PropTypes.func,
        fields: PropTypes.object
      }

      renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }

    onSignUp(values) {
    console.log("on update");
        console.log(values);
        this.props.signup(values);
        this.props.history.push('/teacherLogin');
     
      }

    render(){

      let redrirectVar = null;        

      if (this.props.signupstore.result) {
          if(this.props.signupstore.result.isNewUserCreated === true){
              redrirectVar = <Redirect to="/signIn" />
          }
          
      }

        const {fields: {user_name,email,passwrd,role}, handleSubmit} = this.props;

        return(
            <div>
              
            <div class="container teacherLogin">
            <form onSubmit={handleSubmit(this.onSignUp.bind(this))}>
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Canvas Sign Up</h2>
                            <p>Please enter your Details</p>
                        </div>

                        <Field
                        label="first_name"
                        name="first_name"
                        component={this.renderField}
                        placeholder ='First Name'
                      />

                      <Field
                      label="last_name"
                      name="last_name"
                      component={this.renderField}
                      placeholder ='Last Name'
                    />

                      <Field
                      label="email"
                      name="email"
                      component={this.renderField}
                      placeholder ='Email'
                    />

                    <Field
                    label="Password"
                    name="password"
                    component={this.renderField}
                    placeholder ='Password'
                  />


                  <button type="submit" class="btn btn-primary">Sign Up</button> 
                  </div>
                </div>
                </form>
            </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { 
      signupstore : state.signup
    
    
    };
  }
 
// const mapActionsToProps = {
//         login : state.login
    
//   };

//export default connect(null,mapActionsToProps)(signup);

export default reduxForm({
    form: 'signupForm', // a unique name for this form  
    fields: ['first_name','last_name' , 'email','password','']
  })(connect(mapStateToProps,{signup})(signupPage));
    

