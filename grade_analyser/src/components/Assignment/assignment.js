
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

class Assignment extends Component {

    constructor(props){
        super(props);
        this.state = {
            quizDetails : [],
            graphData: []
            }
    }

    componentDidMount(){
        
      var id = localStorage.getItem('course');
      console.log(id);

      const data = {
        course_id : parseInt(id),
        test_type : 'assignment'
      }

      console.log("data");

      console.log(data);



     axios.post('http://'+rooturl+`:4444/studentmarks/average`,data) .then(response => {
             //update the state with the response data
             console.log("graph data")
             console.log(response)
             this.setState({
              graphData : this.state.graphData.concat(response.data) 
             });
         });
   }



     createAssignment () {

          return (
          <div  >
          <button onClick = {this.create.bind(this)} class="btn  btn-md "> + Create Assignment</button>
          </div>
      );
       
      }


create = (e) => {
this.props.history.push("/home/subjectInfo/"+localStorage.getItem("course") +"/createAssignment");
}



	render() {


    const graph = [];

    for (let d in this.state.graphData) {
      let label = this.state.graphData[d]._id.test_name;
      let y = this.state.graphData[d].average;

      const data = {
        label,y
      }

      graph.push(data)
    }

    console.log("graph");
    console.log(graph);



    let tableDetails = graph.map(quiz => {
      return (
          <tr>
          <td>{quiz.label}</td>
          <td>{quiz.y}</td>
          <td>10</td>
  
        </tr>
      )
})


		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Average grade for each topic"
			},
			axisY: {
				title: "Average marks",
				includeZero: false,
                
			
			},
			axisX: {
				title: "Topics",
				interval: 1
			},
			data: [{
				type: "splineArea",
				dataPoints: graph
			}]
		}
		return (

            <div>

            <p align="right" > {this.createAssignment()}</p>
     
		<div   class="col-md-9" class = "graph"  style = { { left : "50px", top : "100px" ,width : "1000px"}  }>
			
        <CanvasJSChart options = {options}
        onRef={ref => this.chart = ref} />
     
        <div class="col-md-9"  style = { { left : "200px", top : "50px" ,width : "1000px", border: "1px solid black"}  } >
       
        <table class="table table-striped">
        <thead>
          <tr>
            <th> Assignment Name</th>
            <th> Avg Score</th>
            <th> Total Marks</th>
          </tr>
        </thead>
        <tbody>
        {tableDetails}
        
         
         
        </tbody>
      </table>
</div>
</div>

</div>
		);
	}
}
export default Assignment;