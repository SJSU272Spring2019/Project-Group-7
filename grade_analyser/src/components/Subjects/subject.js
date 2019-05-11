
import  CanvasJSReact from '../../canvasjs/canvasjs.react';
import {Link} from 'react-router-dom';
var React = require('react');
var Component = React.Component;


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Subject extends Component {

    constructor(props){
        super(props);
        this.state = {
                grades : [],
                graphData: []
            }
    }

    componentDidMount(){
        
     }


	addSymbols(e) {
	
		var num = parseInt(e.value / 10);
		

		return CanvasJS.formatNumber(num * 10) ;	
	}

	render() {
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
				dataPoints: [
					{label: "Pronouns", y: 64 },
					{ label: "verbs", y: 61 },
                    {label: "paragraphs", y: 64 },
                    { label: "nouns", y: 64 },
					{label: "adj", y: 61 }
                    
				]
			}]
		}
		return (

            <div>
      <div class ="tabs">          
<nav class="navbar navbar-expand-sm">



<div class="collapse navbar-collapse">
<ul class="navbar-nav mr-auto">
<li class="nav-item active">


<a class="nav-link" href="#">  Quiz <span class="sr-only">(current)</span></a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">  Homework</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">  Exams</a>
</li>


</ul>

</div>
</nav>
</div>    
     
		<div class = "graph">
			
        <CanvasJSChart options = {options}
        onRef={ref => this.chart = ref} />
     
        <div class="col-md-9"  style = { { left : "50px", top : "50px" ,width : "1000px", border: "1px solid black"}  } >
       
        <table class="table table-striped">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr>
            <td>Mary</td>
            <td>Moe</td>
            <td>mary@example.com</td>
          </tr>
          <tr>
            <td>July</td>
            <td>Dooley</td>
            <td>july@example.com</td>
          </tr>
        </tbody>
      </table>
</div>
</div>

</div>
		);
	}
}
export default Subject;