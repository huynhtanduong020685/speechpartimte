var curdate = '';
var curyear = '';
var curmonth= '';
var curday= '';

function initDiary(year, month) {
	curyear = year;
	curmonth = month;

	$("#diarycalendaryear").text(year);
	$("#diarycalendarmonth").text(month);

	var startdate = new Date(year+'-'+month+'-1 0:0:0');
	if (month==12) var enddate = new Date(new Date((year+1)+'-1-1 0:0:0')-(1000*60*60*24));
	else var enddate = new Date(new Date(year+'-'+(month+1)+'-1 0:0:0')-(1000*60*60*24));
	var startday = startdate.getDay();
	var endday = enddate.getDate();

	var html = '<tr style="background-color:#4a4a4a;font-weight:bolder" class="content"><td style="padding:5px;" align="center" width="14%">Sun</td><td align="center" width="14%">Mon</td><td align="center" width="14%">Tue</td><td align="center" width="14%">Wed</td><td align="center" width="14%">Thu</td><td align="center" width="14%">Fri</td><td align="center" width="14%">Sat</td></tr>';

	var cntstart=false;
	var cnt=0;

	for (var i=0; i<6; i++) {
		html=html+'<tr>';
		for (var j=0; j<7; j++) {
			if ((cntstart || j==startday) && cnt<endday) {
				cntstart=true;
				cnt++;
				html=html+'<td><div id="diarycell'+cnt+'" class="diarycell"><div class="dayno">'+cnt+'</div></div></td>';
			} else {
				html=html+'<td><div id="diarycell'+cnt+'" class="diarycell"></div></td>';
			}
		}
		html=html+'</tr>';
	}

	$("#diarycalendar").html(html);

	for (var i=1; i<=endday; i++) {
		$("#diarycell"+i).swipe({
			doubleTap:function(event, target) {
				curday = $(this).attr("id").replace("diarycell","");
				getDiaryNote(curyear, curmonth, curday);
			},
			longTap:function(event, target) {
				curday = $(this).attr("id").replace("diarycell","");
				getDiaryNote(curyear, curmonth, curday);
			},
			tap:function(event, target) {
				curday = $(this).attr("id").replace("diarycell","");
				getDiaryNote(curyear, curmonth, curday);
			},
			threshold:50
		});
	}

	$("#diarycalendar").swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData){
			switch (direction) {
				case "left":
					goDiaryCalendar(1,1);
				break;
				case "right":
					goDiaryCalendar(-1,1);
				break;
			}
		}
	});

	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: top.getServer()+"/engtrain/getmonthnotice/"+curyear+"/"+curmonth,
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			//console.log(data);
			results = data;
			
			for (var i=0; i<data.length; i++) {
				var date = new Date(data[i].postdate);
				var pkid = data[i].pkid;
				var day = date.getDate();
				
				$("#diarycell"+day).append('<img class="noticeicon" onclick="getNoticeNote('+curyear+','+curmonth+','+day+');" src="img/diary/noticeicon.png"/>');
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});

	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: top.getServer()+"/engtrain/getmonthdiary/"+curyear+"/"+curmonth+"/"+window.localStorage.getItem('ls_userid'),
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			//console.log(data);
			results = data;
			
			for (var i=0; i<data.length; i++) {
				var date = new Date(data[i].postdate);
				var pkid = data[i].pkid;
				var day = date.getDate();
				$("#diarycell"+day).append('<img class="diaryicon" onclick="getDiaryNote('+curyear+','+curmonth+','+day+');" src="img/diary/diaryicon.png"/>');
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});

	$(".diarycell").css("height",(winHeight*.12)+"px");
}

function goDiaryCalendar(val, type) {
	switch (type) {
		case 0:
			curyear=curyear+val;
			initDiary(curyear, curmonth);
		break;
		case 1:
			curmonth=curmonth+val;
			if (curmonth==0) {
				curmonth=12;
				curyear--;
			} else if (curmonth==13) {
				curmonth=1;
				curyear++;
			}
			initDiary(curyear, curmonth);
		break;
	}

}

function goDiaryToday() {
	curdate = new Date();
	curyear = curdate.getFullYear();
	curmonth= curdate.getMonth()+1;

	initDiary(curyear, curmonth);
}

var diarynoti=false;
function getNoticeNote(year,month,day) {
		diarynoti=true;
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getdaynotice/"+year+"/"+month+"/"+day,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				var html="";
				for (var i=0; i<data.length; i++) {
					//html=html+nl2br(data[i].notice)+"<br/><br/>";
					html=html+data[i].notice+"\n\n\n\n";
				}
				top.showAlert(html,"공지사항");
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	}

var diarynoteon=false;
function writeDiary() {
	diarynoteon=true;

	$("#diarycontent").val('');
	$("#diarynote").show();
	$("#diarynotebtn").show();
	//$(".blackmodal").show();

	setTimeout(function() {
        $("#diarycontent").focus();
        KeyBoard.showKeyboard();
    },10);
}

function closeDiaryNote() {
	diarynoteon=false;
	
	$("#diarynote").hide();
	$("#diarynotebtn").hide();
	//$(".blackmodal").hide();
	KeyBoard.hideKeyboard();
}

function submitDiary() {
	var date = curyear+'-'+curmonth+'-'+curday;
	if ($("#diarycontent").val()!='') {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/senddiary",
			dataType: "json",
			data: JSON.stringify({
				'userid':window.localStorage.getItem('ls_userid'),'date':date,'content':$("#diarycontent").val()
				}),
			success: function(data, textStatus, jqXHR) {
				closeDiaryNote();
				initDiary(curyear, curmonth);
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	}
}

function getDiaryNote(year, month, day) {
	if (!diarynoti) {
		curday=day;
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getdaydiary/"+year+"/"+month+"/"+day+"/"+window.localStorage.getItem('ls_userid'),
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				if (data.diarycomment) {
					$("#diarycomment").html('<strong style="color:green; font-size:25px; font-weight:bolder">Comment:</strong><br/>'+data.diarycomment);
				} else {
					$("#diarycomment").html('');
				}
				
				writeDiary();
				$("#diarycontent").val(data.diarycontent);
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	}

	diarynoti=false;
}