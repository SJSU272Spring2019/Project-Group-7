

import React, {Component} from 'react';

import card from '../../logos/card.png';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {rooturl}  from '../../config/settings'
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });

class subjects extends Component {
    constructor(){
        super();
        this.state = {  
            courses : [],
            course_id : "" ,
            courseDetails : [],
            courseDetail : "",
            courseSelected : false
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        
         var id = this.props.login.result._id
         console.log(id);
   
        axios.get('http://'+rooturl+`:4444/professors/${id}`, {
        
        })
                .then(response => {
                //update the state with the response data
                console.log(response)
                this.setState({
                    courses : this.state.courses.concat(response.data.courses) 
                });
            });
    }


    openCourse = (e) => {

         localStorage.setItem("course",e.target.id)
  
        this.props.history.push('/home/subjectInfo/'+e.target.id);
      
    }

    addCourse () {

         
            return (
              <div  >
              <button onClick = {this.create.bind(this)} class="btn  btn-md "> + Add Subject</button>
              </div>
          );
           
          }


create = (e) => {
    this.props.history.push("/home/addSubject");
   }



    render(){
      let details = this.state.courses.map(course => {
        return(
            
          <Grid container justify="center" spacing="16">
                            
          <Grid key="1" item>

          <Card align = "center">
          <Card.Img variant="top" src={card} style={{ width: '200px', height:'100px' }}/>
          
        </Card>
        <div style={{left : '1000px' }}>
     
        <button  id={course.course_id}  onClick= {this.openCourse}>{course.course_name}</button>
        </div>     
          </Grid>
          </Grid>
        )
    })
        return(
            <div>
              
                <div class="container teacherLogin" align ="center">
                <p align="right" > {this.addCourse()}</p>
                    <h2>List of All Subjects</h2>
                        <table class="table" align ="center">
                            
                            <tbody align="center">
                            <tr>
                            <td>
                         
{details}
                           
        
                             </td>
                        </tr>
                        
                            </tbody>
                        </table>
                                </div>   
            </div> 
        )
    } 
}

const mapStateToProps = state => ({
  login : state.login

});

export default (connect(mapStateToProps, {  })(subjects));

// let details = this.state.courses.map(course => {
//     return(
        
//         <tr>
//             <td>


//         <Card align = "center">
// <Card.Img variant="top" src={card} style={{ width: '100px', height:'100px' }}/>
// <Card.Body>
// <Card.Title style={{ width: '100px', height:'10px' }}>{course.course_id}</Card.Title>
// <button  onClick ={this.openCourse} value={course.course_id}>{course.term}:{course.course_id}-{course.course_name}</button>
// </Card.Body>
// </Card>
//               </td>
//         </tr>
        
//     )
// })


// <Grid container justify="center" spacing="16">
                            
// <Grid key="1" item>

// <Card align = "center">
// <Card.Img variant="top" src={card} style={{ width: '100px', height:'100px' }}/>
// <Card.Body>
//   <Card.Title style={{ width: '100px', height:'10px' }}> Maths</Card.Title>
 
// </Card.Body>
// </Card>
       
// </Grid>