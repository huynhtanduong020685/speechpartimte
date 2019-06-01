function initLeftRanking() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: top.getServer()+"/engtrain/getranking/"+year+"/"+month+"/"+day,
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			$("#leftleaderboard").html('');			
			for (var i=0; i<data.length; i++) {
				var userid=data[i].uid;
				var username=data[i].uname;
				var score=parseInt(data[i].tot);
				
				$("#leftleaderboard").append('<ul class="lboardrow content"><li class="llno">'+(i+1)+'</li><li class="llpic"><img src="'+top.getServer()+'/engtrain/media/profilepic/pic'+userid+'" width="100%"  onerror="this.src = \'img/common/profileblankpic.png\';"/></li><li class="llname">'+username+'</li><li class="llmark"><img src="img/leaderboard/smark.png" width="100%"/></li><li class="llscore">'+score+'</li></ul>');
				
				if (i==2) break;
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});

	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: top.getServer()+"/engtrain/getnoticnt/"+window.localStorage.getItem('ls_usercid')+"/"+window.localStorage.getItem('ls_userid'),
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			var noti = data.noti;
			var trophy = data.trophy;

			if (noti>0) {
				$("#leftdiarybtn").addClass("leftLightOn");
			} else {
				$("#leftdiarybtn").removeClass("leftLightOn");
			}

			if (trophy>0) {
				$("#lefttrophybtn").addClass("leftLightOn");
			} else {
				$("#lefttrophybtn").removeClass("leftLightOn");
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});
}

function initRanking() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: top.getServer()+"/engtrain/getranking/"+year+"/"+month+"/"+day,
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			$("#leaderboardlist").html('');			
			for (var i=0; i<data.length; i++) {
				var userid=data[i].uid;
				var username=data[i].uname;
				var score=parseInt(data[i].tot);
				
				$("#leaderboardlist").append('<ul class="lboardrow content"><li style="width:10%; text-align:center;">'+(i+1)+'</li><li class="llpic" style="width:25%; text-align:right;"><img src="'+top.getServer()+'/engtrain/media/profilepic/pic'+userid+'" width="20%"  onerror="this.src = \'img/common/profileblankpic.png\';"/></li><li class="llname" style="width:25%; text-align:left; padding-left:15px">'+username+'</li><li class="llmark" style="width:20%; text-align:right;"><img src="img/leaderboard/smark.png" width="20%"/></li><li class="llscore" style="padding-left:10px;">'+score+'</li></ul>');
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});
}