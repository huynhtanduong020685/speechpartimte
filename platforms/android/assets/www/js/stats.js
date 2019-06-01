var statsdate = '';
var statsyear = '';
var statsmonth= '';
var statsday= '';
var statscaids=new Array();

function initStats(year, month) {
	statscaids=new Array();

	statsyear = year;
	statsmonth = month;

	$("#statscalendaryear").text(year);
	$("#statscalendarmonth").text(month);

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
				html=html+'<td><div id="statscell'+cnt+'" class="statscell"><div class="dayno">'+cnt+'</div><div class="statsdaycnt" id="calcellcnt'+cnt+'"></div></div></td>';
			} else {
				html=html+'<td><div id="statscell'+cnt+'" class="statscell"></div></td>';
			}
		}
		html=html+'</tr>';
	}

	$("#statscalendar").html(html);

	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: top.getServer()+"/engtrain/getmonthuserscore/"+year+"/"+month+"/"+window.localStorage.getItem('ls_userid'),
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			//console.log(data);
			results = data;
			var daycnt = new Array();
			var daycaid = new Array();
			
			for (var i=0; i<data.length; i++) {
				var date = new Date(data[i].postdate);
				var caid = data[i].caid;
				var day = date.getDate();
				var avg = study.getGrade(data[i].avgscore).replace(/[^a-zA-Z]/gi,"").toLowerCase();

				if (daycnt[day]==undefined) daycnt[day]=0;
				daycnt[day]++;					
				if (daycaid[day]==undefined) {
					daycaid[day] = new Array();
					var caids = caid.split("-");
					var bookid = caids[0]+'-'+caids[1];
					var unitday = caids[2];

					$("#statscell"+day).append('<a href="javascript:viewResults(\''+bookid+'\',\''+unitday+'\',\''+day+'\');"><img src="img/result/'+avg+'.png" style="width:57%"/></a>');
				}
				daycaid[day].push(caid);
				
				if (daycnt[day]>1) {
					$("#calcellcnt"+day).text('X'+daycnt[day]);
				}
			}

			statscaids = daycaid;
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});

	for (var i=1; i<=endday; i++) {
		$("#statscell"+i).swipe({
			tap:function(event, target) {
				statsday = $(this).attr("id").replace("statscell","");
				//getStatsNote(statsyear, statsmonth, statsday);
			},
			threshold:50
		});
	}

	$("#statscalendar").swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData){
			switch (direction) {
				case "left":
					goStatsCalendar(1,1);
				break;
				case "right":
					goStatsCalendar(-1,1);
				break;
			}
		}
	});

	$(".statscell").css("height",((maintabheight-statscaltopheight)*.15)+"px");
	$("#statsprofile").css("height",((maintabheight-30)*.4)+"px");
	$("#statsuserinfo").css("height",((maintabheight-30)*.4)+"px");
	$("#statsusernametd").css("height",((maintabheight-30)*.2)+"px");
}

function goStatsCalendar(val, type) {
	switch (type) {
		case 0:
			statsyear=statsyear+val;
			initStats(statsyear, statsmonth);
		break;
		case 1:
			statsmonth=statsmonth+val;
			if (statsmonth==0) {
				statsmonth=12;
				statsyear--;
			} else if (statsmonth==13) {
				statsmonth=1;
				statsyear++;
			}
			initStats(statsyear, statsmonth);
		break;
	}

}

function goStatsToday() {
	statsdate = new Date();
	statsyear = statsdate.getFullYear();
	statsmonth= statsdate.getMonth()+1;

	initStats(statsyear, statsmonth);
}

function viewResults(bookid, day1, day2) {
	selbookid = bookid;
	selday = day1;
	statsday = day2;

	setPage("result");
}