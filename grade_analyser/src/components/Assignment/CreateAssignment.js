import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {rooturl} from '../../config/settings';
import { connect } from 'react-redux';

//Define a Login Component
class CreateAssignment extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
       
        this.state = {
            assignment_name : "",
            total_marks : 0

        }
       
       
    }
   
    assignment_nameChangeHandler = (e) => {
        this.setState({
            assignment_name : e.target.value
        })
    }

    total_marksChangeHandler = (e) => {
        this.setState({
            total_marks : e.target.value
        })
    }

 
    createAssignment = (e) => {
       
     const data = {
            course_id : localStorage.getItem("course"),
            assignment_name : this.state.assignment_name,
           total_marks : this.state.total_marks 
        }


        axios.post('http://'+rooturl+':4444/assignments/create',data)
            .then(response => {
                
                if(response.status === 200){
                   this.props.history.push('/home/subjectInfo/' + localStorage.getItem("course")+ '/assignments')
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
                            <h2>Create Assignment</h2>
                            
                        </div>
                        
                            <table>
                            <tbody>
                          
                           <tr> </tr>
                           <div class="form-group">
                             <tr> <input onChange = {this.assignment_nameChangeHandler} type="text" class="form-control" name="assignment_name" placeholder="Assignment Name"/>
                          
                           </tr>
                           </div>

                           <div class="form-group">
                           <tr> <input onChange = {this.total_marksChangeHandler} type="text" class="form-control" name="total_marks" placeholder="Total Marks"/>
                        
                         </tr>
                         </div>
                     
                          <div class="form-group">
                                <tr>
                            <button width ="200px" onClick = {this.createAssignment} class="btn btn-primary">Create Assignment</button> 
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
  
  export default (connect(mapStateToProps, {  })(CreateAssignment));