function loginInit() {
    $("#login_input_modal_page").modal({
        backdrop:'static'
    });

    //viewLoading('block',0);
    //nowloadingrate=100;
    //goProgress();
    setPage('login');
}

//로그인
$("#login_submit_label").click(function() {
    console.log('submit');

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: top.getServer()+"/engtrain/logincheck",
        dataType: "json",
        data: JSON.stringify({
            "loginid": $("#loginid").val(),
            "pwd": $("#pwd").val()
            }),
        success: function(data, textStatus, jqXHR) {
            if (data) {
                //로그인 성공
                window.localStorage.setItem('ls_userid',data.uid);
                window.localStorage.setItem('ls_usercid',data.cid);
                window.localStorage.setItem('ls_userclass',data.uclass);
                window.localStorage.setItem('ls_username',data.uname);
                window.localStorage.setItem('ls_userschool',data.uschool);
                window.localStorage.setItem('ls_userphone',data.uphone);
                window.localStorage.setItem('ls_userbirth',data.ubirth);

                //stats userinfo
                $("#statsuinfo2").text(data.ubirth);
                $("#statsuinfo3").text(data.uschool);
                $("#statsuinfo4").text(data.uphone);
                $("#statsusername").text(data.uname);

                //Native에 입력
                Login.inputUserInfo(data.uid, data.uclass, data.uname, data.cid);

                var uid = window.localStorage.getItem('ls_userid');

                $("#selpicimg").attr("src",top.getServer()+"/engtrain/media/profilepic/pic"+window.localStorage.getItem('ls_userid'));
                $("#statsprofile").attr("src",top.getServer()+"/engtrain/media/profilepic/pic"+window.localStorage.getItem('ls_userid'));
                $("#leftusername").text(window.localStorage.getItem('ls_username'));
                console.log(uid);
                top.spinner(0);
                top.showAlert(data.uname+'님, 환영합니다!','로그인 성공');
                $("#login_input_modal_page").modal('hide');
                setPage("cabinet");
            }
            else {
                //로그인 화면 및 값 지우기
                $('#loginid').val('');
                $('#pwd').val('');
                top.spinner(0);
                top.showAlert('로그인 정보를 다시 입력하세요.','로그인 실패');                      
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            top.spinner(0);
            alert('error: ' + textStatus);
        }
    });
});

$("#selpicimg").bind('error',function(ev){
    //error has been thrown
    //$(this).attr('src','/path/to/no-artwork-available.jpg');
    $(this).css("display","none");
});

$("#login_cancel_label").on('touchend',function() {
    console.log('close');
    //location.href='units.html';
    top.navigator.app.exitApp();
});