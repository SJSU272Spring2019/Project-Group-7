
$('.nav-login').on("click",function(){
  var dataURL = $(this).attr('data-href');
        $('.modal-body').load(dataURL,function(){
            $('#ModalLoginForm').modal({show:true});
        });
})

$('.nav-register').on("click",function(){
  var dataURL = $(this).attr('data-href');
        $('.modal-body').load(dataURL,function(){
            $('#ModalRegisterForm').modal({show:true});
            $('#email').val('teststudent100@gmail.com');
            $('#fname').val('test');
            $('#lname').val('student');
            $('#address').val('santa clara');
            $('#phnum').val('123123123');
            $('#standard').val('5');
            $('#pwd').val('Password@123');
            $('#country').val('USA');
        });
})

function handleLogin(event) {
    var uname = $('#email').val();
    var pwd = $('#pwd').val();
    doLogin(uname, pwd);
}

function doLogin(uname, pwd) {
    var payload = {};
    payload['email'] = uname;
    payload['password'] = pwd
    $.ajax({
        type: "POST",
        url: "http://localhost:4447/students/login",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(resp){
            $.cookie("student_id", parseInt(resp['_id']));
            window.location.href = "overview";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('invalid user');
        }
      });
}

function handleRegister(event) {
    var email = $('#email').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var address = $('#address').val();
    var country = $('#country').val();
    var phone = $('#phnum').val();
    var standard = $('#standard').val();
    var pwd = $('#pwd').val();

    var payload = {};
    payload['_id'] = Math.ceil(Math.random() * 100)
    payload['first_name'] = fname;
    payload['last_name'] = lname;
    payload['email'] = email;
    payload['phone'] = parseInt(phone);
    payload['address'] = address + ", " + country;
    payload['standard'] = parseInt(standard);
    payload['password'] = pwd;

    $.ajax({
        type: "POST",
        url: "http://localhost:4447/students/register",
        data: JSON.stringify(payload),
        crossDomain: true,
        accepts: "text/html; charset=utf-8",
        contentType:"application/json; charset=utf-8",
        success: function(msg){
              console.log( "Data Saved: " + msg );
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           console.log("some error");
        }
      });
    
}

