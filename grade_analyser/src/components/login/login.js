
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
 import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
 import PropTypes from 'react';
import {Field,reduxForm} from 'redux-form';

  import {rooturl} from '../../config/settings';
 import React, { Component } from 'react';
 import axios from 'axios';

 import { submitLogin } from '../../actions/loginaction';



class signIn extends Component{
   
    constructor(props){
     
        super(props);
   
        this.state = {
          email : "",
          passwrd : "",
          formValidationFailure: false,
          isValidationFailure: true,
          errorRedirect: false

      }
    }

    static propTypes = {
        handleSubmit: PropTypes.func,
        fields: PropTypes.object
      }
  
  
    onUpdateEmail = (e) => {
            this.props.onUpdateEmail(e.target.value);
        
    }

    onUpdatePasswrd = (e) => {
        this.props.onUpdatePasswrd(e.target.value);
    
}

    //Define component to be rendered
    renderField(field) {

      const { meta: { touched, error } } = field;
      const className = touched && error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
      const inputType = field.type;
      const inputPlaceholder = field.placeholder;
      const errorMessageStyling =  touched && error ? "text-danger" : "";

      return (

          <div className="form-group">
             
              <input className={className} type={inputType} placeholder={inputPlaceholder} {...field.input} />
              <div className={errorMessageStyling}>
                  <div>{touched ? error : ""}</div>
                  
              </div>
          </div>
      );
  }

   onSubmit(values) {
       //     axios.defaults.withCredentials = true;
             var data = {
                 email : values.email,
                 password : values.passwrd
             };
     
             this.props.submitLogin(data);
             
         }
     


    render(){

      let redrirectVar = null;        

      if (this.props.loginStateStore.result) {
          if(this.props.loginStateStore.result.isAuthenticated === true){
              redrirectVar = <Redirect to="/home" />
          }
          
      }


      let errorPanel = null;
      if (this.props.loginStateStore.result) {
      if (this.props.loginStateStore.result.isAuthenticated === false) {
          errorPanel = <div>
              <div className="alert alert-danger" role="alert">
                  <strong>Validation Error!</strong> Username and Password doesn't match!
              </div>
          </div>
      }
  }

  let formErrorPanel = null;
  if (this.state.formValidationFailure) {
      formErrorPanel = <div>
          <div className="alert alert-danger" role="alert">
              <strong>Validation Error!</strong> Username and Password are required!
          </div>
      </div>
  }

  const { handleSubmit } = this.props;
       
        return(
           
             
            <div class="container teacherLogin">
            {redrirectVar}
            {errorPanel}
            {formErrorPanel}
            <form name ="loginForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2 class= "heading"> TEACHER LOGIN</h2>
                            <p>Please enter your e-mail and password</p>
                        </div>
                        
                        <Field
                        label="Email"
                        name="email"
                        type = "text"
                        component={this.renderField}
                        placeholder = 'Email'
                       
                      />
  
                      <Field
                      label="Password"
                      name="passwrd"
                      type = "password"
                      placeholder = 'Password'
                      component={this.renderField}
                
                    />
                             <div class="form-group">
                            <br></br>
                            <button type="submit" class="btn btn-primary">Login</button> 
                            <ul class="nav navbar-nav">
                            <li class="signup"><Link to="/signup">Don't have an account yet? Sign up here</Link></li>
                            </ul>
                          
                            </div>
                        
                      
                    </div>
                </div>
              </form> 
            </div>
           
        )
    }     
}

const mapStateToProps = state => ({
  loginStateStore: state.login
});

function validate(values) {
  const errors = {};
  if (!values.email) {
      errors.email = "Enter E-mail";
  }
  if (!values.password) {
      errors.password = "Enter Password";
  }
  return errors;
}
//export default Login;
export default reduxForm({
  validate,
  form: "loginForm"
})(connect(mapStateToProps, { submitLogin })(signIn));