
import  CanvasJSReact from '../../canvasjs/canvasjs.react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {rooturl} from '../../config/settings';
import { connect } from 'react-redux';


var React = require('react');
var Component = React.Component;



var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Grades extends Component {

    constructor(props){
        super(props);
        this.state = {
            exams : [],
            quizes: [],
            assignments :[],
            students : [],
            all : [],
            student_email : '',
            marks : '',
            id : ''
            }
            this.baseState = this.state
           
    }

    componentDidMount(){
        
        var id = localStorage.getItem('course');
        console.log(id);
  
       axios.get('http://'+rooturl+`:4444/courses/${id}`, {
       
       }) .then(response => {
               //update the state with the response data
               console.log(response)

               this.setState({
                exams : this.state.exams.concat(response.data[0].exams) 
               });

               this.setState({
                quizes : this.state.quizes.concat(response.data[0].quizes) 
               });


               this.setState({
                assignments : this.state.assignments.concat(response.data[0].assignments) 
               });
           })

           axios.get('http://'+rooturl+':4444/students/getAllStudents',{})
           .then(response => {
               
               if(response.status === 200){

                console.log("students")
                console.log(response)

                this.setState({
                 students : this.state.exams.concat(response.data) 
                });


               }else{
                 
               }
           });
     }



    displayQuizes()  { 

        console.log("quizes");
      

        
        const quiz = Array.from(new Set(this.state.quizes));

        console.log(quiz);
        return (
            this.state.quizes.map(function(q) {
                return <option value ={q.quiz_name}> {q.quiz_name}</option>
            })
           
         );
 }

displayExams() { 
        
    const exam = Array.from(new Set(this.state.exams));

    return (
        exam.map(function(q) {
            return <option value ={q.exam_name}> {q.exam_name}</option>
        })
    )
}


displayAssignments() {  
    if(this.state.assignments.length > 0) {    
    const assignment = Array.from(new Set(this.state.assignments));
    console.log(assignment);

    return (
        assignment.map(function(q) {
            return <option value ={q.assignment_name}> {q.assignment_name}</option>
        })
    )
    }
}

displayStudents() { 
        
    const student = Array.from(new Set(this.state.students));
    console.log(student);

    return (
        student.map(function(s) {
            return <option value ={s._id}> {s.first_name}</option>
        })
    )
}

idChangeHandler = (e) => {
    this.setState({
        id : e.target.value
       });
}

student_emailChangeHandler =(e) => {
    console.log(e.target.value);
    console.log(e.target.typ);
    this.setState({
        student_email : e.target.value
       });
}

marksChangeHandler = (e) => {
    this.setState({
        marks : e.target.value
       });
}


        create = (e) => {
        this.props.history.push("/home/subjectInfo/"+localStorage.getItem("course") +"/createAssignment");
        }
      
        grade = (e) => {


            const data = {
               student_id : this.state.student_email,
         
                course_id: localStorage.getItem('course'),
        test_type: e.target.name,
        test_name: this.state.id,
        test_marks: parseInt(this.state.marks),
        total_marks: 10
    
       
            }

            console.log(data);
    
    
            axios.post('http://'+rooturl+':4444/studentmarks/create',data)
                .then(response => {
                    
                    if(response.status === 200){

                        this.setState(this.baseState);

                        this.setState ({
                            marks : null
                        })
                       this.props.history.push('/home/subjectInfo/'+localStorage.getItem('course') +'/Grades')
                    }else{
                      
                    }
                });
        }


	render() {

	
		return (

            <div>
     
		<div   class="col-md-9" class = "graph"  style = { { left : "50px", top : "100px" ,width : "1000px"}  }>

     
        <div class="col-md-9"  style = { { left : "200px", top : "50px", border: "1px solid black"}  } >
       
        <table class="table table-striped">
        <thead>
         
        </thead>
        <tbody>
        <tr>
     <td>
        <label>
      Quiz :
      <select value={this.state.id} onChange={this.idChangeHandler}>
      <option>  </option>
      {this.displayQuizes()}
      </select>
    </label>
    </td>

    <td>
    <label>
  Student :
  <select value={this.state.student_email} onChange={this.student_emailChangeHandler}>
  <option>  </option>
{this.displayStudents()}
  </select>
</label>
</td>

<td><input type="text" class = "inputGrade" onChange= {this.marksChangeHandler} /></td>  


   <td>

   <button onClick = {this.grade.bind(this)} name='quiz' class="btn  btn-md "> Grade </button>
  
   </td>



      </tr>

      <tr>
      <td>
         <label>
       Exam :
       <select value={this.state.id} onChange={this.idChangeHandler}>
       <option>  </option>
       {this.displayExams()}
       </select>
     </label>
     </td>
 
     <td>
     <label>
   Student :
   <select value={this.state.student_email} onChange={this.student_emailChangeHandler}>
   <option>  </option>
   {this.displayStudents()}
   </select>
 </label>
 </td>
 
 <td><input type="text" class = "inputGrade" onChange= {this.marksChangeHandler}/></td>  
 
 
    <td>
 
    <button onClick = {this.grade.bind(this)} name='exam' class="btn  btn-md "> Grade </button>
   
    </td>
       </tr>

       
        
       <tr>
       <td>
          <label>
        Assignment :
        <select value={this.state.id} onChange={this.idChangeHandler}>
        <option>  No Selection</option>
        {this.displayAssignments()} 
        </select>
      </label>
      </td>
  
      <td>
      <label>
    Student :
    <select value={this.state.student_email} onChange={this.student_emailChangeHandler}>
    <option>  </option>
    {this.displayStudents()}
    </select>
  </label>
  </td>
  
  <td><input type="text" class = "inputGrade" onChange= {this.marksChangeHandler} /></td>  
  
  
     <td>
  
     <button onClick = {this.grade.bind(this)} name='assignment' class="btn  btn-md "> Grade </button>
    
     </td>
        </tr>
         
         
        </tbody>
      </table>
</div>
</div>

</div>
		);
	}
}
export default Grades;