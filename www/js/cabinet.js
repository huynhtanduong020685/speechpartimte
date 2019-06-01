var bookenddate = new Array();

function getMyBook() {
    bookenddate = new Array();

    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    books.push({"bookid":"S-6","endtime":"2020-12-25 00:00:00"});
    
    setTimeout(function() {
        showBooks();
    },500);
    top.spinner(0);
    return;
}

function showBooks() {
    var html='';
    var indihtml='';
    var cnt=0;

    var allpage = parseInt((books.length-1)/4+1);
    if (allpage==0) allpage=1;

    for (var i=0; i<allpage; i++) {
        var active = '';
        if (i==0) active='active';
        indihtml+='<li class="'+active+'" data-target="#cabinet_page" data-slide-to="'+i+'"></li>';
        html+='<div class="item item_page col-xs-12 col-sm-12 col-md-12 col-lg-12 '+active+'">';        
        html+='<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 booksline"><div style="float:left; width:9%">&nbsp;</div>';

        for (var j=0; j<=3; j++) {
            if (cnt<books.length) {
                var key = books[cnt]["bookid"];
                bookenddate[key] = new Date(books[cnt]["endtime"]).getTime();
                //console.log(key+books[cnt]["endtime"]+':'+bookenddate[key]);
                html+='<img src="img/books/'+key+'.gif" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 books" bookno="'+cnt+'" bookid="'+key+'">';
            }
            else {
                var key = "blank";
                html+='<img src="img/books/'+key+'.gif" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 booksblank">';
            }

            if (j==3) html+='</div>';
            cnt++;
        }
        html+='</div>';
    }

    $("#indi").html(indihtml);
    $("#inner_page").html(html);

    $('#cabinet_page').carousel({
        interval: false,
        touch: true
    });

    $('#cabinet_page').on('slid.bs.carousel', function () {
        currentIndex = $('div.active').index();
        var url = location.href;
        location.href = "#"+currentIndex;  
    })

    $(".books").swipe( {
        tap:function(event, target) {
            //console.log($(this).attr("bookid"));
            selbookid = $(this).attr("bookid");
            selbookno = $(this).attr("bookno");
            console.log(selbookno);

            switch (selbookno) {
                case '0':
                    selday=16;
                    // setPage('speaking');
                    setPage('listening');
                break;
                case '1':
                    setPage('speaking');
                    //setPage('tts');
                break;
                // case '2':
                //     selday=16;
                //     setPage('speaking2');
                // break;
                case '2':
                    selday=16;
                    setPage('writing');
                break;
                case '3':
                    selday=16;
                    setPage('dictation');
                break;
                case '4':
                    selday=16;
                    selbookid=''
                    setPage('popquiz');
                break;
                case '7':
                    setPage('ebook');
                break;
                case '5':
                    setPage('shadow');
                break;
                case '6':
                    setPage('tts');
                break;
                case '8':
                    selbookid='LPQ'
                    setPage('popquiz');
                break;
                case '9':
                    setPage('sentencequiz');
                break;
                default:
                    selday=16;
                    setPage('speaking');
                break;
            }
        },
        swipe:function() {
          //console.log('swipe');
        }
        //,threshold:50
      });
}

function showSerialForm() {
    $("#serial_input_modal_page").modal({
        backdrop:true
    });
}

function hideSerialForm() {
    $("#serial_input_modal_page").modal('hide');
}

function showLevelForm() {
    $("#level_input_modal_page").modal({
        backdrop:true
    });
}

function hideLevelForm() {
    $("#level_input_modal_page").modal('hide');
}

//시리얼 입력 시
$("#serial_submit_label").on('touchend',function() {
    //top.spinner(1);
    var serial=$("#serial_input").val().replace(/ /gi,'');

    if (serial=='') {
        //top.spinner(0);
        top.showAlert('SERIAL NUMBER를 입력하세요.','입력에러');
        
        return;
    }

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: top.getServer()+"/engtrain/addserialno",
        dataType: "json",   
        data: JSON.stringify({
            "serialno": serial
            }),
        success: function(data, textStatus, jqXHR) {
            //top.spinner(0);
            $("#serial_input").val('');
                
            if (data) {
                //교재 등록하기
                top.showAlert("교재가 등록되었습니다.",'등록성공');
                $("#serial_input_modal_page").modal('hide');
                getMyBook();
            }
            else {
                top.showAlert('SERIAL NUMBER를 정확히 입력하세요.','입력에러'); 
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            //top.spinner(0);
            alert('error: ' + textStatus);
        }
    });
});

var leveluname='';
var levelutel='';
var leveluschool='';
var leveluyear='';

//레벨테스트 시작
$("#level_submit_label").on('touchend',function() {
    //top.spinner(1);
    leveluname=$("#leveluname").val();
    levelutel=$("#levelutel").val();
    leveluschool=$("#leveluschool").val();
    leveluyear=$("#leveluyear").val();

    if (leveluname=='') {
        //top.spinner(0);
        top.showAlert('이름을 입력하세요.','입력에러');
        
        return;
    }

    selday = selbookid.split("-")[2];
    selbookid = selbookid.split("-")[0]+'-'+selbookid.split("-")[1];
    
    nowpage="writing";
    setPage('writing');

    //clear info
    $("#leveluname").val('');
    $("#levelutel").val('');
    $("#leveluschool").val('');
    $("#leveluyear").val('');

    //키 타이틀
    if (selbookid=='L-11') {
        $("#keytab").text("KEY ALPHABETS");    
    } else if (selbookid=='L-12') {
        $("#keytab").text("KEY WORDS"); 
    } else {
        $("#keytab").text("KEY SENTENCES");
    }

    hideLevelForm();
});