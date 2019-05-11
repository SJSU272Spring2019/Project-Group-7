import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {rooturl} from '../../config/settings';
import { connect } from 'react-redux';

//Define a Login Component
class AddSubject extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
       
        this.state = {
            course_id : "",
            course_name : "",
            dept : "",
            description : "",
            room : "",
            capacity : 0,
            waitlist_capacity : 0,
            term  :"",
            section : ""

        }
       
       
    }
   
    
    course_idChangeHandler = (e) => {
        this.setState({
            course_id : e.target.value
        })
    }
   
    course_nameChangeHandler = (e) => {
        this.setState({
            course_name : e.target.value
        })
    }

 
    createCourse = (e) => {
       
        e.preventDefault();

        console.log(localStorage.getItem("_id"));

        const data = {
            course_id : this.state.course_id,
            course_name : this.state.course_name,
            professor_id : localStorage.getItem("_id")
        }


        axios.post('http://'+rooturl+':4444/courses/create',data)
            .then(response => {
                
                if(response.status === 200){
                   this.props.history.push('/home/subjects')
                }else{
                  
                }
            });
    }

    render(){
       
       
        return(
            <div>
                
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Create Course</h2>
                            
                        </div>
                        
                            <table>
                            <tbody>
                            <div class="form-group">
                            <tr> <input onChange = {this.course_idChangeHandler} type="text" class="form-control" name="course_id" placeholder="Course ID"/>
                           
                           </tr>
                           </div>
                           <tr> </tr>
                           <div class="form-group">
                             <tr> <input onChange = {this.course_nameChangeHandler} type="text" class="form-control" name="course_name" placeholder="Name"/>
                          
                           </tr>
                           </div>
                    
                                                      
                                  
                                       
                                        <div class="form-group">
                                        <tr>
                            <button width ="200px" onClick = {this.createCourse} class="btn btn-primary">Create Course</button> 
                            </tr>
                            </div>
                        </tbody>
                        </table>
                    
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
//export default AddCourse;

const mapStateToProps = state => ({
    login : state.login
  
  });
  
  export default (connect(mapStateToProps, {  })(AddSubject));