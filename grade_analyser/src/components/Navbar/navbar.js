import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import logo from '../../logos/logo.png';
import picture from '../../logos/picture.png';


//create the Navbar Component
class Navbar extends Component {
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

        this.props.history.push('teacherLogin')
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
         
        return(
            <div>
               <img src={logo}  class = "logo" alt="logo" />
          </div>
    
        )
    }
}

export default Navbar;