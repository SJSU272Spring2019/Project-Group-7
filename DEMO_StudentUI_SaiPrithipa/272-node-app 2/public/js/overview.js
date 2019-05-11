$(document).ready(function(){
    loadStudentCourses();
});

function loadStudentCourses() {
    var studentId = $.cookie('student_id');
    $.ajax({
        type: "GET",
        url: "http://localhost:4447/courses/getallcourses",
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            loadCards(resp);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('invalid user');
        }
      });
}

function loadCards(data) {
    $.get("/views/templates/card.html", function( html ) {
        
        for (var i = 0; i < data.length; i++) {
            var htm = html;
            var trimmedCourseName = data[i]['course_name'].replace(/ +/g, "");
            var id = 'course-id-' + data[i]['course_id'];
            htm = htm.replace('{{id}}', id);
            htm = htm.replace("{{course_name}}", data[i]['course_name']);
            htm = htm.replace("{{course-thumbnail}}", "/images/" + trimmedCourseName + ".png");
            $('.cmpe-student-overview-content').append(htm);
        }
        registerCardClick();
    });
}

function registerCardClick() {
    $('.card').on('click', function() {
        var courseId = parseInt($(this).attr('id').replace('course-id-', ''));
        loadCourseDetails(courseId);
    });
}

function loadCourseDetails(id) {
    var payload = {};
    $.ajax({
        type: "GET",
        url: "http://localhost:4447/courses/courseid/" + id,
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
              $.cookie('course_id', resp[0]['course_id']);
              $.cookie('course_name', resp[0]['course_name']);
              window.location.href = '/course-overview';
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           console.log("some error");
        }
      });
}