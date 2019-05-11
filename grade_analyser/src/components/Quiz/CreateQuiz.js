import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {rooturl} from '../../config/settings';
import { connect } from 'react-redux';

//Define a Login Component
class CreateQuiz extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
       
        this.state = {
            quiz_name : "",
            total_marks : ""

        }
       
       
    }
   
    quiz_nameChangeHandler = (e) => {
        this.setState({
            quiz_name : e.target.value
        })
    }

    total_marksChangeHandler = (e) => {
        this.setState({
            total_marks : e.target.value
        })
    }

 
    createQuiz = (e) => {
       
   

        const data = {
            course_id : localStorage.getItem("course"),
           quiz_name : this.state.quiz_name,
           total_marks : this.state.total_marks,
           professor_id : localStorage.getItem("_id")
        }


        axios.post('http://'+rooturl+':4444/quizes/create',data)
            .then(response => {
                
                if(response.status === 200){
                   this.props.history.push('/home/subjectInfo/' + localStorage.getItem("course")+ '/quizes')
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
                            <h2>Create Quiz</h2>
                            
                        </div>
                        
                            <table>
                            <tbody>
                          
                           <tr> </tr>
                           <div class="form-group">
                             <tr> <input onChange = {this.quiz_nameChangeHandler} type="text" class="form-control" name="quiz_name" placeholder="Quiz Name"/>
                          
                           </tr>
                           </div>

                           <div class="form-group">
                           <tr> <input onChange = {this.total_marksChangeHandler} type="text" class="form-control" name="total_marks" placeholder="Total Marks"/>
                        
                         </tr>
                         </div>
                     
                          <div class="form-group">
                                <tr>
                            <button width ="200px" onClick = {this.createQuiz} class="btn btn-primary">Create Quiz</button> 
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
  
  export default (connect(mapStateToProps, {  })(CreateQuiz));