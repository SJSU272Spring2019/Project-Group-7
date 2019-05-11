

import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'

class SubjectInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            course : ""
            
        }
       
    }

    componentDidMount() {

        this.setState({
            course : localStorage.getItem("course")
          
             });

    }

    showExams = (e) => {
        this.props.history.push("/home/subjectInfo/"+e.target.id +"/Exams");
           }

    showAssignments = (e) => {
     this.props.history.push("/home/subjectInfo/"+e.target.id +"/Assignments");
        }

    showQuizes = (e) => {
        this.props.history.push("/home/subjectInfo/"+e.target.id +"/Quizes");
          }

    showGrades = (e) => {
                    this.props.history.push("/home/subjectInfo/"+e.target.id +"/Grades");
           }


    render() {
        var course = localStorage.getItem("course");
        
        return (
            
            <div class="col-md-3"  style = { { left : "130px"}   } >
            <h4 align="left"> <b>SUBJECT ID : {this.state.course}</b></h4>

            <ul class="nav nav-pills nav-stacked" >
            
            <li><button  style={{width : "200px"}} onClick = {this.showExams}  class="btn btn-default btn-lg"  value ="Exams" id={this.state.course}>Exams</button></li>
            <li><button style={{width : "200px"}} onClick = {this.showAssignments} class="btn btn-default btn-lg" value = "Exams"id={this.state.course}>Assignments</button></li>
            <li><button  style={{width : "200px"}} onClick = {this.showQuizes}  class="btn btn-default btn-lg"  value ="Exams" id={this.state.course} >Quizes</button></li>
            <li><button  style={{width : "200px"}} onClick = {this.showGrades}  class="btn btn-default btn-lg"  value ="Grades"  id={this.state.course}>Grades</button></li>
        

            
            </ul>
            </div>
            
        )
    }
}

export default SubjectInfo;


// <h4 align="left"> {this.state.course}</h4>

// <ul class="nav nav-pills nav-stacked" >

// <li><button style={{width : "200px"}} onClick = {this.showExams} class="btn btn-default btn-lg" value ="Exams" id={this.state.course}>Exams</button></li>
// <li><button style={{width : "200px"}} onClick = {this.showAssignments} class="btn btn-default btn-lg" value ="Assignments" id={this.state.course}>Assignments</button></li>
// <li><button  style={{width : "200px"}} onClick = {this.showQuizes}  class="btn btn-default btn-lg"  value ="Quizes" id={this.state.course}>Quizes</button></li>
// <li><button  style={{width : "200px"}} onClick = {this.showGrades}  class="btn btn-default btn-lg"  value ="Grades" id={this.state.course}>Grades</button></li>

// </ul>