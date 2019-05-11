

import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {courses} from '../../logos/courses.png'


//create the Navbar Component
class HomePage extends Component {
    constructor(props){
        super(props);
       
    }

    logout = (e) => {
        cookie.remove('cookie', { path: '/teacherLogin' });
        this.props.history.push("/teacherLogin");
        
    }

    openProfile= (e) => {
       const user_id = localStorage.getItem('user_id');
        this.props.history.push("/home/profile");
    }

    openSubjects = (e) => {
        this.props.history.push("/home/subjects");
    }

   
    
    render(){
    
        return(
            
            <div class="icon-bar">
            <h3 align="center">Welcome to Grading Portal !</h3>
            <div class="sidebar">
          <button onClick ={this.openProfile}> <i class="fa fa-address-book fa-6x"></i> Profile</button> 
          <button class = 'active' onClick ={this.openSubjects}> <i class="fa fa-book fa-6x"></i> Subjects</button> 
          <button onClick ={this.logout}> <i class="fa fa-power-off fa-6x"></i> Logout</button> 

            </div>


  
        </div>

        )
    }
}

export default HomePage;
