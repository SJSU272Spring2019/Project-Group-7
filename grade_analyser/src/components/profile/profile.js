
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



class Profile extends Component{
   
    constructor(props){
     
        super(props);
   
        this.state = {
          email : "",
          First_Name : "",
          Last_Name : "",
          phone :"",
          updated : false,
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
                 first_name : values.First_Name,
                 last_name : values.Last_Name,
                 email : values.email,
                 phone : values.phone
                
             };

             console.log("inside profile")
             console.log(data)

             var id = localStorage.getItem('_id');
     
           
     axios.put('http://'+rooturl+`:4444/professors/${id}/update`,data) .then(response => {
        //update the state with the response data
       
        console.log(response)

        this.state.updated = true;

        this.props.history.push("/home")

       
    });
             
         }

         updated()
 {       
      if(this.state.updated) {
        
            return (
        <div>
        <h3 align="center"> Profile updated</h3>
        </div>
    )
            }
        }
     


    render(){


  const { handleSubmit } = this.props;
       
        return(
           
             
            <div class="container teacherLogin">
         
            <form name ="loginForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2 class= "heading"> Profile</h2>
                         {this.updated()}
                        </div>
                        
                        <Field
                        label="First Name"
                        name="First_Name"
                        type = "text"
                        component={this.renderField}
                        placeholder = 'First Name'
                       
                      />
  
                      <Field
                      label="Last Name"
                      name="Last_Name"
                      type = "text"
                      placeholder = 'Last Name'
                      component={this.renderField}
                
                    />

                    <Field
                    label="Email"
                    name="email"
                    type = "text"
                    placeholder = 'Email'
                    component={this.renderField}
              
                  />

                  <Field
                  label="Phone"
                  name="phone"
                  type = "text"
                  placeholder = 'Phone'
                  component={this.renderField}
            
                />
                             <div class="form-group">
                            <br></br>
                            <button type="submit" class="btn btn-primary">Update Profile</button> 
                           
                          
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
})(connect(mapStateToProps, { submitLogin })(Profile));