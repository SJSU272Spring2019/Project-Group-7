import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import signIn from '../login/login.js';
import Navbar from '../Navbar/navbar.js';
import homePage from '../Home/home.js'
import home from '../Home/homepage.js'
import subjects from '../Subjects/subjects.js'
import Subject from '../Subjects/subject.js'
import signup from '../login/signup.js'
import AddSubject from '../Subjects/AddSubject.js';
import SubjectInfo from '../Subjects/subjectPanel.js'
import quiz from '../Quiz/quiz.js'
import CreateQuiz from '../Quiz/CreateQuiz.js';
import Assignment from '../Assignment/assignment.js';
import CreateAssignment from '../Assignment/CreateAssignment.js';
import Exam from '../Exam/exam.js';
import CreateExam from '../Exam/CreateExam.js';
import Grades from '../Grades/grades.js';
import profile from '../profile/profile.js';


class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/teacherLogin" component={signIn}/>
                <Route path="/teacherSignup" component={signup}/>
                
                <Route path="/homePage" component={homePage}/>
                <Route path="/home" component={home}/>
                <Route path="/home/subjects" component={subjects}/>
                <Route path="/home/profile" component={profile}/>
                <Route path="/home/addSubject" component={AddSubject}/>
                <Route path="/home/subject" component={Subject}/>
                <Route path="/home/subjectInfo/:id" component={SubjectInfo}/>


                <Route path="/home/subjectInfo/:id/Quizes" component={quiz}/> 
                <Route path="/home/subjectInfo/:id/createQuiz" component={CreateQuiz}/> 

                <Route path="/home/subjectInfo/:id/assignments" component={Assignment}/> 
                <Route path="/home/subjectInfo/:id/createAssignment" component={CreateAssignment}/> 


                <Route path="/home/subjectInfo/:id/exams" component={Exam}/> 
                <Route path="/home/subjectInfo/:id/createExam" component={CreateExam}/> 


                <Route path="/home/subjectInfo/:id/grades" component={Grades}/> 
                
                


            
            </div>
        )
    }
}
//Export The Main Component
export default Main;