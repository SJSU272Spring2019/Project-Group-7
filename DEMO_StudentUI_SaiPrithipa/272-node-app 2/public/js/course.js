$(document).ready(function(){
    var courseName = $.cookie('course_name');
    courseName = courseName.replace(/ +/g, "");
    var htmlToLoad = '/views/templates/' + courseName.toLowerCase() + '.html';
    $('.cmpe-student-overview-content').load(htmlToLoad,function(){
        
    });
});

$('.student .quiz-nav').on('click', function() {
    var dataURL = $(this).attr('data-href');
    $('.cmpe-student-overview-content').css('text-align', 'center');
    var courseId = $.cookie('course_id');
    $('.cmpe-student-overview-content').load(dataURL,function(){
        applyQuizData($.cookie('student_id'), courseId);
    });
    
});

$('.student .exams-nav').on('click', function() {
    var dataURL = $(this).attr('data-href');
    $('.cmpe-student-overview-content').css('text-align', 'center');
    var courseId = $.cookie('course_id');
    $('.cmpe-student-overview-content').load(dataURL,function(){
        applyExamData($.cookie('student_id'), courseId);
    });
    
});

$('.student .homework-nav').on('click', function() {
    var dataURL = $(this).attr('data-href');
    $('.cmpe-student-overview-content').css('text-align', 'center');
    var courseId = $.cookie('course_id');
    $('.cmpe-student-overview-content').load(dataURL,function(){
        applyAssignmentData($.cookie('student_id'), courseId);
    });
    
});

$('.student .reading-nav').on('click', function() {
    var dataURL = $(this).attr('data-href');
    $('.cmpe-student-overview-content').css('text-align', 'center');
    $('.cmpe-student-overview-content').load(dataURL,function(){
    });
    
});

function applyQuizData(studentId, courseId) {
    var payload = {};
    payload['student_id'] = studentId;
    payload['course_id'] = courseId;
    $.ajax({
        type: "POST",
        url: "http://localhost:4447/studentmarks/getquiz",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            var quizData = resp;
            var dispData = [];
            var labels = []
            for (var i = 0; i < quizData.length; i++) {
                quizData[i]['total_marks'] = 10;
                dispData[i] = quizData[i].test_marks;
                labels[i] = quizData[i].test_name;
            }
            createChart(dispData, labels, 'Marks per quiz');
            createDataTable(quizData, 
            [
                { title: "Quiz Id", data: "_id" },
                { title: "Quiz Name", data: "test_name" },
                { title: "Course Id", data: "course_id" },
                { title: "Marks" , data: "test_marks" },
                { title: "Total Marks", data: "total_marks" }
            ]);
            updateChartColor();
            console.log(resp);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error while getting quiz by course id');
        }
      });
}

function applyExamData(studentId, courseId) {
    var payload = {};
    payload['student_id'] = studentId;
    payload['course_id'] = courseId;
    $.ajax({
        type: "POST",
        url: "http://localhost:4447/studentmarks/getexam",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            var examData = resp;
            var dispData = [];
            var labels = []
            for (var i = 0; i < examData.length; i++) {
                examData[i]['total_marks'] = 100;
                dispData[i] = examData[i].test_marks;
                labels[i] = examData[i].test_name;
            }
            createChart(dispData, labels, 'Marks per exam');
            createDataTable(examData, 
            [
                { title: "Exam Id", data: "_id" },
                { title: "Exam Name", data: "test_name" },
                { title: "Course Id", data: "course_id" },
                { title: "Marks" , data: "test_marks" },
                { title: "Total Marks", data: "total_marks" }
            ]);
            updateChartColor();
            console.log(resp);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error while getting exam by course id');
        }
      });
}

function applyAssignmentData(studentId, courseId) {
    var payload = {};
    payload['student_id'] = studentId;
    payload['course_id'] = courseId;
    $.ajax({
        type: "POST",
        url: "http://localhost:4447/studentmarks/getassignment",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            var assignmentData = resp;
            var dispData = [];
            var labels = []
            for (var i = 0; i < assignmentData.length; i++) {
                assignmentData[i]['total_marks'] = 10;
                dispData[i] = assignmentData[i].test_marks;
                labels[i] = assignmentData[i].test_name;
            }
            createChart(dispData, labels, 'Marks per exam');
            createDataTable(assignmentData, 
            [
                { title: "Assignment Id", data: "_id" },
                { title: "Assignment Name", data: "test_name" },
                { title: "Course Id", data: "course_id" },
                { title: "Marks" , data: "test_marks" },
                { title: "Total Marks", data: "total_marks" }
            ]);
            updateChartColor();
            console.log(resp);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error while getting assignment by course id');
        }
      });
}

function createChart(dispData, labels, dispText) {
    window.myObjBar = new Chart(document.getElementById("bar-chart-1"), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
                label: "Marks",
                fillColor: "rgba(220,220,220,0.5)", 
                strokeColor: "rgba(220,220,220,0.8)", 
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
                data: dispData
            }
        ]
        },
        options: {
          legend: { 
              display: false
          },
          title: {
            display: true,
              fontColor: "purple",
            text: dispText
          },scales: {
              xAxes: [{
                 ticks: {
                    fontColor: "purple",
                 }
              }],
              yAxes: [{
                 ticks: {
                    fontColor: "purple",
                    beginAtZero:true
                 }
              }]
           },
           events: ['click'],
           onClick: function(c,i) {
            e = i[0];
            console.log(e._index)
            var x_value = this.data.labels[e._index];
            var y_value = this.data.datasets[0].data[e._index];
            handleBarClick(x_value);
        }
        }
    });
}

function createDataTable(dispData, cols) {
    $('#example').DataTable( {
        data: dispData,
        columns: cols
    } );
}

function handleBarClick(test_name) {
    var payload = {}
    payload['course_name'] = $.cookie['course_name'];
    payload['test_name'] = test_name
    $.ajax({
        type: "POST",
        url: "http://localhost:4447/recommendation/get_recommendation",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            $('.modal-body').load("/views/modal/suggestion-modal.html",function(){
                $.get("/views/templates/youtube-video-list-item.html", function( html ) {
                    var itr = Math.min(resp.length, 10);
                    for (var i = 0; i < itr; i++) {
                        var htm = html;
                        htm = htm.replace('{{video_title}}', resp[i]['title']);
                        htm = htm.replace('{{video_url}}', resp[i]['uri']);
                        htm = htm.replace('{{image_src}}', resp[i]['thumbnail']);
                        $('.video-suggestion-list').append(htm);
                    }
                    $('#ModalSuggestion').modal({show:true});
                });
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error while getting assignment by course id');
        }
      });
}

function updateChartColor() {
    var bars = myObjBar.data.datasets[0].data;
    for(i=0;i<bars.length;i++){
        //You can check for bars[i].value and put your conditions here
        if(bars[i]<5){
            myObjBar.data.datasets[0].backgroundColor[i]="red";
        }
        else if(bars[i]>=5 && bars[i]< 7){
            myObjBar.data.datasets[0].backgroundColor[i]="orange"
        
        }
        else if(bars[i]>=7 && bars[i]< 9){
            myObjBar.data.datasets[0].backgroundColor[i]="yellow"
        }
        else if (bars[i]>=9){
            myObjBar.data.datasets[0].backgroundColor[i]="green"
        }
     }
     myObjBar.update();
}