import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import logo from '../../logos/logo.png';
import picture from '../../logos/picture.png';


//create the Navbar Component
class Home extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    loginParent =(e) => {

    }

    loginTeacher =(e) => {

        this.props.history.push('/teacherLogin')
    }
    signupTeacher = (e) => {
        this.props.history.push('/teacherSignup')
    }


    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/signIn"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
         let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home/courses"/>
        }
        else {
            redirectVar = <Redirect to="/signIn"/>
        }
        return(
            <div>
            
               <div class='loginbuttons' >
               <button class="button-content" onClick ={this.loginParent}  > <span class ="size-sm" > Student Login </span></button>
               <button class="button-content" onClick ={this.loginTeacher}  > <span class ="size-sm" > Teacher Login </span></button>
               <button class="button-content" onClick ={this.signupTeacher}  > <span class ="size-sm" > Teacher Sign up </span></button>
            
                    </div>

               <img src={picture}  class = "picture" alt="logo" />

                </div>
          
    
        )
    }
}

export default Home;