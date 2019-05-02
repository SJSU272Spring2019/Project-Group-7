$(document).ready(function(){
    var courseName = $.cookie('course_name');
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

function applyQuizData(studentId, courseId) {
    var payload = {};
    payload['student_id'] = studentId;
    payload['course_id'] = courseId;
    $.ajax({
        type: "POST",
        url: "http://localhost:4447/courses/getCourseQuiz",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            var quizData = resp[0]["quizes"];
            var dispData = [];
            var labels = []
            for (var i = 0; i < quizData.length; i++) {
                dispData[i] = quizData[i].quiz_marks;
                labels[i] = quizData[i].quiz_id;
            }
            createChart(dispData, labels, 'Marks per quiz');
            createDataTable(resp[0]["quizes"], 
            [
                { title: "Quiz Id", data: "quiz_id" },
                { title: "Quiz Name", data: "quiz_name" },
                { title: "Course Id", data: "course_id" },
                { title: "Marks" , data: "quiz_marks" },
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
        url: "http://localhost:4447/courses/getCourseExam",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            var examData = resp[0]["exams"];
            var dispData = [];
            var labels = []
            for (var i = 0; i < examData.length; i++) {
                dispData[i] = examData[i].exam_marks;
                labels[i] = examData[i].exam_id;
            }
            createChart(dispData, labels, 'Marks per exam');
            createDataTable(resp[0]["exams"], 
            [
                { title: "Exam Id", data: "exam_id" },
                { title: "Exam Name", data: "exam_name" },
                { title: "Course Id", data: "course_id" },
                { title: "Marks" , data: "exam_marks" },
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
        url: "http://localhost:4447/courses/getCourseAssignment",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            var assignmentData = resp[0]["assignments"];
            var dispData = [];
            var labels = []
            for (var i = 0; i < assignmentData.length; i++) {
                dispData[i] = assignmentData[i].assignment_marks;
                labels[i] = assignmentData[i].assignment_id;
            }
            createChart(dispData, labels, 'Marks per exam');
            createDataTable(resp[0]["assignments"], 
            [
                { title: "Assignment Id", data: "assignment_id" },
                { title: "Assignment Name", data: "assignment_name" },
                { title: "Course Id", data: "course_id" },
                { title: "Marks" , data: "assignment_marks" },
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
              fontColor: "white",
            text: dispText
          },scales: {
              xAxes: [{
                 ticks: {
                    fontColor: "white",
                 }
              }],
              yAxes: [{
                 ticks: {
                    fontColor: "white",
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

function handleBarClick(marks) {
    $('.modal-body').load("/views/modal/suggestion-modal.html",function(){
        $('.suggestion').html('ஆய்வு சொத்து நீங்கள் முட்டாள்');
        $('#ModalSuggestion').modal({show:true});
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