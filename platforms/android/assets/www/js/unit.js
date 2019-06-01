var newplaylist;

function initUnitCell() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: top.getServer()+"/engtrain/getbookprogress/"+selbookid,
		dataType: "json",
		success: function(data, textStatus, jqXHR) {	
			var unitprogs=new Array();

			for (var i=0; i<data.length; i++) {
				var unitprog=data[i];
				unitprogs[unitprog.day]=unitprog;
			}

			var html="";
			var mp3html="";
			var maxcnt=20;
			var playerhtml='<table width="100%" style="height:101%;">';

			if (window.localStorage.getItem('ls_userclass')=='X') maxcnt=5;

			if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6') {
				maxcnt=18;
			}

			var bookkind=selbookid.substr(0,2);
			if (bookkind=='S-' || bookkind=='D-' || bookkind=='T-' || bookkind=='A-') {
				maxcnt=18;
			}

			for (var i=0; i<maxcnt; i++) {
				var unitprog = unitprogs[i+1];
				var dayno=addzero(i+1);
				var status='';

				if (unitprog && unitprog.done=='Y') {
					var whiteclass=' white';
					status='<div class="unitcellstatuscell"></div><div class="unitcellstatuscell"></div><div class="unitcellstatuscell"></div><div class="unitcellstatuscell"></div>';
					var nowstudy="RS"

					if (i==0 && (window.localStorage.getItem('ls_userclass')=='A' || window.localStorage.getItem('ls_userclass')=='B')) {
						nowstudy="WR";
					}
				}
				else {
					var whiteclass='';
					if (unitprog && unitprog.dictationdone=="Y") {
						status='<div class="unitcellstatuscell"></div><div class="unitcellstatuscell"></div><div class="unitcellstatuscell"></div>';
						var nowstudy="PQ";
					}
					else if (unitprog && unitprog.speakingdone=="Y") {
						status='<div class="unitcellstatuscell"></div><div class="unitcellstatuscell"></div>';
						var nowstudy="DT";
					}
					else if (unitprog && unitprog.writingdone=="Y") {
						status='<div class="unitcellstatuscell"></div>';
						var nowstudy="SP";
					} else var nowstudy="WR";

					//학습가능여부 확인
					if (window.localStorage.getItem('ls_userclass')!='A') {
						if (i>0 && !unitprogs[i]){
							nowstudy="NONE";
						} else if (i>0 && unitprogs[i].done!='Y') {
							nowstudy="NONE";
						}
					}
				}

				html=html+'<div class="unitcell" onclick="goStudy(\''+nowstudy+'\', \''+(i+1)+'\');"><div class="unitcellday'+whiteclass+'">Day</div><div class="glyphicon glyphicon-ok unitcellcheck'+whiteclass+'"></div><div class="unitcellno'+whiteclass+'">'+dayno+'</div><div class="unitcellstatus">'+status+'</div></div>';

				if (i%4==0) playerhtml=playerhtml+'<tr>';
				var pno=i+1;
				if (pno<10) pno="0"+pno;
				playerhtml = playerhtml+'<td class="playercell" onclick="setMP3('+(i+1)+')" id="cd'+(i+1)+'"><span class="playercellday">Day</span>&nbsp;&nbsp;<span class="playercellno">'+pno+'</span></td>';
				if (i==3) playerhtml=playerhtml+'<td rowspan="5" id="playlist">&nbsp;</td>';
				if (i%4==3) playerhtml=playerhtml+'</tr>';
				// whiteclass='';
				// var mp3icon='cd_icon';
				// if (i==0) {
				// 	whiteclass=' white';
				// 	mp3icon='cd_selected';
				// }
				// mp3html=mp3html+'<div class="unitmp3cell" onclick="setMP3('+(i+1)+')"><img src="img/unit/'+mp3icon+'.png" class="unitmp3cd" id="cd'+(i+1)+'"/><div class="unitmp3days" id="mp3days'+(i+1)+'"><span class="unitcellday'+whiteclass+'">DAY&nbsp;</span><span class="unitcellno'+whiteclass+'">'+dayno+'</span></div></div>';
		    }

		    playerhtml=playerhtml+'</table>';
		    $("#unitcells").html(html);
		    $("#playerdisplay").html(playerhtml);
		    //$("#unitmp3cells").html(mp3html);

		    top.spinner(0);
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});

	setTimeout(function() {setMP3(1);},500);
}

function goStudy(nowstudy, day) {
	selday=day;

	switch (nowstudy) {
		case "WR":
			nowpage="writing";
			setPage('writing');
		break;
		case "SP":
			nowpage="speaking";
			setPage('speaking');
		break;
		case "DT":
			nowpage="dictation";
			setPage('dictation');
		break;
		case "PQ":
			nowpage="popquiz";
			setPage('popquiz');
		break;
		case "RS":
			nowpage="result";
			setPage('result');
		break;
		case "NONE":
			top.showAlert('이전 일차를 먼저 학습하세요.','');
		break;
	}
}

var nowmode="study";
function changeMode() {
	if (nowmode=="study") {
		nowmode="mp3";
		$("#unitmp3player").show();
		$("#unitcells").hide();
		$("#unitmodebtn").attr("src","img/unit/studybtn.png");
		$("#jplayer").show();
	} else {
		if (mediaPlay) {
			isAuto=false;
	        mediaPlay.stop();
	        mediaPlay.release();
	        $("#playerplaybtn").attr("src","img/player/play.png");
	    }
		nowmode="study";
		$("#jquery_jplayer_1").jPlayer("stop");
		$("#unitmp3player").hide();
		$("#unitcells").show();
		$("#unitmodebtn").attr("src","img/unit/mp3btn.png");
		$("#jplayer").hide();
	}
}

function onSuccessPlayer() {
	console.log('succcess'+isPlayed+isAuto+nowtrack);
	if (isAuto) {
		nextTrack();
		
		if (nowtrack==tracks.length-1) {
			$("#playerplaybtn").attr("src","img/player/play.png");
		}
	}
}

function onErrorPlayer() {
}

function onStatusPlayer(status) {
	console.log("status"+status);
	isPlayed=status;
	if (status==2) isAuto=true;
	setTimeout(function() {console.log("duration"+mediaPlay.getDuration());},500);
}

var isAuto=true;
function setTrack(no) {
	if (mediaPlay) {
		isAuto=false;
		mediaPlay.stop();
		mediaPlay.release();
		//$("#playerplaybtn").attr("src","img/player/play.png");
	}
	nowtrack=no;

	$(".track").removeClass('white');
	$("#track"+no).addClass('white');

	$(".track").removeClass('seltrack');
	$("#track"+no).addClass('seltrack');

	initPlayer();
	mediaPlay.play();
	$("#playerplaybtn").attr("src","img/player/pause.png");
	//$("#playerplaybtn").attr("src","img/player/play.png");
}

function nextTrack() {
	if (nowtrack<tracks.length-1) {
		nowtrack++;
		setTrack(nowtrack);
	}
}

function prevTrack() {
	if (nowtrack>0) {
		nowtrack--;
		setTrack(nowtrack);
	}
}

function backTrack() {
	mediaPlay.getCurrentPosition(
        // success callback
        function (position) {
            if (position > -1) {
                console.log((position) + " sec");
                if (position<3) mediaPlay.seekTo(0);
                else mediaPlay.seekTo(position*1000-3000);
            }
        },
        // error callback
        function (e) {
            console.log("Error getting pos=" + e);
        }
    );
}

function fastTrack() {
	mediaPlay.getCurrentPosition(
        // success callback
        function (position) {
            if (position > -1) {
                console.log((position) + " sec");
                mediaPlay.seekTo(position*1000+3000);
            }
        },
        // error callback
        function (e) {
            console.log("Error getting pos=" + e);
        }
    );
}

function initPlayer() {
	mediaPlay = new Media(tracks[nowtrack].mp3, onSuccessPlayer, onErrorPlayer, onStatusPlayer);
}

function playerPlay() {
	console.log(isPlayed);
	if (isPlayed==2) {
		mediaPlay.pause();
		$("#playerplaybtn").attr("src","img/player/play.png");
	} else {
        mediaPlay.play();
		$("#playerplaybtn").attr("src","img/player/pause.png");
	}
}

var tracks;
var nowtrack=0;
var isPlayed=0;
var mediaPlay;

function setMP3(day) {
	if (mediaPlay) {
		isAuto=false;
		mediaPlay.stop();
		mediaPlay.release();
		$("#playerplaybtn").attr("src","img/player/play.png");
	}

	nowtrack=0;

	tracks = getmp3list(day);
	var html="";
	for (var i=0; i<tracks.length; i++) {
		var track = tracks[i];
		html=html+'<div class="track content" onclick="setTrack('+i+');" id="track'+i+'">'+track.title+'</div>';
	}
	//console.log(html);
	$("#playlist").html(html);
	$(".track").removeClass('white');
	$("#track0").addClass('white');

	$(".track").removeClass('seltrack');
	$("#track0").addClass('seltrack');

    $(".playercell").removeClass("white");
    $("#cd"+day).addClass("white");

    $(".playercell").removeClass("selplayer");
    $("#cd"+day).addClass("selplayer");

    //oggPlayer.play(tracks[0].oga);
    initPlayer();
}

function getmp3list(day) {
    var mp3names = mp3s[bookcdid[selbookid]][day];
    var mp3list = new Array();
    var tt = new Date().getTime();
    for(var i=0; i<mp3names.length; i++) {
        //console.log(mp3names[i]);
        var track = mp3names[i].split("-")[2].replace(/.MP3/gi,"");
        mp3list.push({title:"CD "+track,mp3:"http://mp3.3030class.com/cd/"+bookcdid[selbookid]+"/"+mp3names[i],oga:"http://mp3.3030class.com/cd/"+bookcdid[selbookid]+"/"+mp3names[i].replace('mp3','ogg')});
    }
    
    return mp3list;
}