var sentences=null;
var cawords=null;
var bookwords=null;
var wavedatas=null;
var sentenceno=0;
var questxts=new Array();
var questions=new Array();
var multiples=new Array();
var answers=new Array();
var rightanswers=new Array();
var resultsheet=new Array();
var rightcnt=0;
var totalscore=0;
var avg=0;
var results = new Array();
var nowval = '';
var totalquesno=0;
var nowquesno=0;
var levelid=0;

var study = {
	setSentences: function() {
		sentences = new Array();

		sentences.push({"sentence":"This is Spotty.","transtxt":"이것은 Spotty야."});
		sentences.push({"sentence":"He's my dog.","transtxt":"그는 나의 개야."});
		sentences.push({"sentence":"I like to hug him.","transtxt":"나는 그를 안는 것을 좋아해."});

		wavedatas = new Array();

		wavedatas.push({"time":99,"wavedata":"[0,0,0,0,0,82.3,83.85,83.85,83.85,83.85,83.85,83.85,81.52,66.91,80.64,89.02,40.13,2.25,82.69,93.51,85.3,95.45,87.89,81.18,42.58,26,15.63,3.29,1.51,0.85,0.33,0.42,0.12,0.04,0,0,0,0,0]"});
		wavedatas.push({"time":107,"wavedata":"[0,0,0,0.1,4.78,99.59,99.59,97.71,97.71,97.71,97.71,97.71,97.71,97.71,97.71,75.72,34.26,13.76,5.8,102.27,77.4,65.84,70.44,74.04,73.6,58.45,55.32,46.52,8.59,11.95,2.94,2.22,1.26,0.73,0.36,0.24,0,0,0.02,0,0,0,0,0]"});
		wavedatas.push({"time":132,"wavedata":"[0,0,0,0,0.35,61.17,68.26,74.14,74.14,74.14,74.14,74.14,79.05,68.34,65.52,16.27,6.56,79.08,64.03,55.12,62.39,46.07,51.75,95.12,96.56,87.02,30.94,70.74,36,58.79,62.9,67.09,44.5,25.52,18.23,6.6,3.29,1.48,1.14,0.64,0.33,0.1,0.03,0,0,0,0,0]"});

		top.spinner(0);

		switch(nowpage) {
			case "writing":
				writing.startStudy();
			break;
			case "speaking":
				//speaking.startStudy();
			break;
			case "dictation":
				//dictation.startStudy();
			break;
			case "popquiz":
				popquiz.startStudy();
			break;
		}

		// $.ajax({
		// 	type: 'GET',
		// 	contentType: 'application/json',
		// 	url: top.getServer()+"/engtrain/getsentences/"+selbookid+"/"+selday,
		// 	dataType: "json",
		// 	success: function(data, textStatus, jqXHR) {
		// 		//샘플은 두문장
		// 		var sno = Math.floor((Math.random() * (data.length-2)) + 1);
		// 		data=data.slice(sno,sno+2);

		// 		if (selbookid=='L-11' || selbookid=='L-12') data = data.splice(10,10);

		// 		sentences=data;

		// 		$.ajax({
		// 			type: 'GET',
		// 			contentType: 'application/json',
		// 			url: top.getServer()+"/engtrain/getwavedatas/"+selbookid+"/"+selday,
		// 			dataType: "json",	
		// 			success: function(data, textStatus, jqXHR) {
		// 				//샘플은 두문장만	
		// 				var sno = Math.floor((Math.random() * (data.length-2)) + 1);
		// 				data=data.slice(sno,sno+2);
		// 				wavedatas=data;
		// 				//console.log(wavedatas);

		// 				totalquesno = sentences.length;

		// 				if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6') {
		// 						var wordimgs = new Array();
		// 						for (var i=0; i<sentences.length; i++) {
		// 							var orgtxt = sentences[i].sentence;
		// 							orgtxt = orgtxt.replace(/{/g,'');
		// 							orgtxt = orgtxt.replace(/}/g,'');
		// 							wordimgs.push(top.getServer()+"/engtrain/img/words/"+orgtxt.toLowerCase()+".jpg");
		// 						}

		// 						//이미지 미리 로딩:		
		// 						$(wordimgs).preload();
		// 				}

		// 				if (selbookid.substr(0,2)=='A-') {
		// 					totalquesno=0;

		// 					for (var i=0; i<sentences.length; i++) {
		// 						if (sentences[i].sentence.indexOf('{B:}')>=0) totalquesno++;
		// 					}
		// 				}

		// 				top.spinner(0);

		// 				switch(nowpage) {
		// 					case "writing":
		// 						writing.startStudy();
		// 					break;
		// 					case "speaking":
		// 						//speaking.startStudy();
		// 					break;
		// 					case "dictation":
		// 						//dictation.startStudy();
		// 					break;
		// 					case "popquiz":
		// 						popquiz.startStudy();
		// 					break;
		// 				}
		// 			},
		// 			error:function(jqXHR, textStatus, errorThrown){
		// 				alert('error: ' + textStatus);
		// 			}
		// 		});
		// 	},
		// 	error:function(jqXHR, textStatus, errorThrown){
		// 		alert('error: ' + textStatus);
		// 	}
		// });
	},
	setWords: function() {
		cawords = new Array();

		cawords.push({"word":"Get","wordmean":"일어나거라! (____ up!)","sentence":"get up"});
		cawords.push({"word":"Sit","wordmean":"앉거라! (____ down!)","sentence":"sit down"});

		bookwords = new Array();

		bookwords.push({"word":"Stand","wordmean":""});
		bookwords.push({"word":"Sit","wordmean":""});
		bookwords.push({"word":"Wake","wordmean":""});
		bookwords.push({"word":"Get","wordmean":""});
		bookwords.push({"word":"Set","wordmean":""});
		bookwords.push({"word":"Put","wordmean":""});
		bookwords.push({"word":"Take","wordmean":""});
		

		typestyleno=0;

		//popquiz.startStudy();
		top.spinner(0);


		// $.ajax({
		// 	type: 'GET',
		// 	contentType: 'application/json',
		// 	url: top.getServer()+"/engtrain/getwords/"+selbookid+"/"+selday,
		// 	dataType: "json",	
		// 	success: function(data, textStatus, jqXHR) {
		// 		var sno = Math.floor((Math.random() * (data.length-2)) + 1);
		// 		data=data.slice(sno,sno+2);
		// 		//킨더 레벨테스트인 경우 뒤 10개만 읽자.
		// 		if (selbookid=='L-11' || selbookid=='L-12') data = data.splice(10,10);
				
		// 		cawords=data;
		// 		//////console.log(data);
				
		// 		$.ajax({
		// 			type: 'GET',
		// 			contentType: 'application/json',
		// 			url: top.getServer()+"/engtrain/getwords/"+selbookid,
		// 			dataType: "json",	
		// 			success: function(data, textStatus, jqXHR) {
		// 				bookwords=data;
		// 				//////console.log(data);
		// 				typestyleno = Math.ceil(cawords.length*.2);
		// 				if (typestyleno<1) typestyleno=1;
			
		// 				popquiz.startStudy();
		// 				top.spinner(0);
		// 			},
		// 			error:function(jqXHR, textStatus, errorThrown){
		// 				alert('error: ' + textStatus);
		// 			}
		// 		});
		// 	},
		// 	error:function(jqXHR, textStatus, errorThrown){
		// 		alert('error: ' + textStatus);
		// 	}
		// });	
	},
	checkSentences: function(usertxt, orgtxt) {
		var orgdim = orgtxt.split(" ");
		var userdim = usertxt.split(" ");	
		
		var result = "";
		var spellcnt=0;
		var rightcnt=0;
		
		for (var i=0; i<orgdim.length; i++) {
			var org1 = orgdim[i];
			var user1 = userdim[i];
			
			if (user1==undefined) user1='';
			
			org1 = org1.replace(/{A:}/g,"");
			org1 = org1.replace(/{B:}/g,"");
			org1 = org1.replace(/[^a-zA-Z0-9 ]/g,"");
			user1 = user1.replace(/[^a-zA-Z0-9 ]/g,"");
			
			if (org1.toLowerCase()=="mp3") user1=user1.toLowerCase();

			if (org1==user1) {
				rightcnt++;
			}
		}		
		
		//var score = (rightcnt/spellcnt)*100;
		var score = (rightcnt/orgdim.length)*100;

		return score;
	},
	checkSentence: function(usertxt, orgtxt) {	
		if (selbookid.substr(0,2)=='A-') {
			orgtxt = orgtxt.replace(/{A:}/g,'');
			orgtxt = orgtxt.replace(/{B:}/g,'');
			orgtxt = orgtxt.replace(/{C:}/g,'');
			orgtxt = orgtxt.replace(/{D:}/g,'');
			orgtxt = orgtxt.replace(/{E:}/g,'');
		}
	
		var orgdim = orgtxt.split(" ");
		var userdim = usertxt.split(" ");	
		
		var result = "";
		var rightcnt=0;
		
		for (var i=0; i<orgdim.length; i++) {
			var org1 = orgdim[i];
			var user1 = userdim[i];
			
			if (user1==undefined) user1='';
			
			//알파벳은 제외
			/*if ('<?=$bookid?>'!='K-1' && '<?=$bookid?>'!='K-2') {
				org1 = org1.toLowerCase();
				user1 = user1.toLowerCase();
			}*/
			
			org1 = org1.replace(/[^a-zA-Z0-9 ]/g,"");
			user1 = user1.replace(/[^a-zA-Z0-9 ]/g,"");

			if (org1.toLowerCase()=="mp3") user1=user1.toLowerCase();
			
			if (org1!=user1) result = result+" <span style='color:red; text-decoration:line-through;'>"+userdim[i]+"</span><span style='color:green'>("+orgdim[i]+")</span>";
			else {
				result = result+" <span style='color:blue'>"+orgdim[i]+"</span>";
				rightcnt++;
			}
		}
		
		var score = (rightcnt/orgdim.length)*100;
		return [score,result];
	},
	sendResult: function(kind) {
		if (kind=='popquiz') {
			var avg = parseInt(rightcnt/cawords.length*100);
		} else {
			var avg = parseInt(totalscore/sentences.length);
		}

		//acting인 경우 수정
		if (selbookid.substr(0,2)=='A-') {
			if (kind=='speaking') {
				var avg = parseInt(totalscore/totalquesno);
			}
		}

		//답안제출
		 $.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/sendresult",
			dataType: "json",	
			data: JSON.stringify({
				"bookid":selbookid
				,"day":selday
				,"kind":kind
				,"score":avg
				,"userid":window.localStorage.getItem('ls_userid')
				,"levelname": leveluname
				,"levelphone": levelutel
				,"levelschool": leveluschool
				,"levelyear": leveluyear
				,"resultsheet": resultsheet
				}),
			success: function(data, textStatus, jqXHR) {	
				if (kind=='popquiz') {
					nowpage = 'result';
					setPage('result');
				}

				if (selbookid.substr(0,2)=='L-') {
					console.log("levelid:"+data);
					levelid = data;
					LevelTest.inputLevelTestID(data);
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});		
	},
	getResult: function(bookid, day) {
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getunitscore/"+bookid+"/"+day,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				if (data) {
					results = data;
					var caids = data["caid"].split("-");
					results["bookid"]=caids[0]+"-"+caids[1];
					
					study.initResult();

					top.spinner(0);
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});

		$('#resulttab a[href="#reportcardtab"]').tab('show')
		this.initWriting(bookid, day);
		this.initSpeaking(bookid, day);
		this.initDictation(bookid, day);
		this.initPopquiz(bookid, day);
		this.initKey(bookid, day);
	},
	initResult: function() {
		var avg = Math.round((parseInt(results.writingscore)+parseInt(results.speakingscore)+parseInt(results.dictationscore)+parseInt(results.popquizscore))/4);
		var grade = this.getGrade(avg).replace(/[^a-zA-Z]/gi,"").toLowerCase();
		var postdate = results.postdate.substr(0,10);
		var posttime = results.postdate.substring(11);
		var bookname = bookTitles[results.bookid];
		var unit = "Unit "+selday;
		var username = window.localStorage.getItem('ls_username');

		if (selbookid.substr(0,2)=='L-') {
			$("#rslevelnametitle").html("레&nbsp;&nbsp;&nbsp;&nbsp;벨");
			$("#rslevelresulttitle").html("결&nbsp;&nbsp;&nbsp;&nbsp;과");
			bookname = bookname+selday;
			unit = study.getLevelGrade(avg, selbookid);
			var gradeimg = study.getLevelGrade(avg, selbookid).replace(/[^a-zA-Z0-9]/gi,"").toLowerCase()+".png";
			username = leveluname;

			$("#rskeytab").hide();
		} else {
			$("#rslevelnametitle").html("교재명");
			$("#rslevelresulttitle").html("유&nbsp;&nbsp;&nbsp;&nbsp;닛");
			var gradeimg = study.getGrade(avg).replace(/[^a-zA-Z0-9]/gi,"").toLowerCase()+".png";
			$("#rskeytab").show();
		}

		$("#gradeimg").attr("src","img/result/"+gradeimg);
		
		$("#result #postdate").html(postdate);
		$("#result #posttime").html(posttime);
		$("#result #bookname").html(bookname);
		$("#result #unit").html(unit);
		$("#result #username").html(username);
		$("#result #avg").html(avg);

		$("#inforesult .w").html('<font color="red">'+results.writingscore+'</font> / 100');
		$("#inforesult .s").html('<font color="red">'+results.speakingscore+'</font> / 100');
		$("#inforesult .d").html('<font color="red">'+results.dictationscore+'</font> / 100');
		$("#inforesult .p").html('<font color="red">'+results.popquizscore+'</font> / 100');

		$("#inforesult .wg").html('<font color="red">'+study.getGrade(results.writingscore)+'</font>');
		$("#inforesult .sg").html('<font color="red">'+study.getGrade(results.speakingscore)+'</font>');
		$("#inforesult .dg").html('<font color="red">'+study.getGrade(results.dictationscore)+'</font>');
		$("#inforesult .pg").html('<font color="red">'+study.getGrade(results.popquizscore)+'</font>');

		study.drawDiagram();

		var html="";
		//statson
		if (statson) {
			html = '<select onchange="study.goResult(this.value);" id="statschange" class="form-control">';
			for (var i=0; i<statscaids[statsday].length; i++) {
				var caids = statscaids[statsday][i].split("-");
				var bookid = caids[0]+'-'+caids[1];
				var unitday = caids[2];

				if (selbookid==bookid && selday==unitday) html=html+'<option value="'+statscaids[statsday][i]+'" selected>'+bookTitles[bookid]+', Unit:'+unitday+'</option>';
				else html=html+'<option value="'+statscaids[statsday][i]+'">'+bookTitles[bookid]+',Day:'+unitday+'</option>';
			}
			html=html+"</select>";
		}
		$("#statscaids").html(html);
	},
	goResult: function(caid) {
		var caids = caid.split("-");
		var bookid = caids[0]+'-'+caids[1];
		var unitday = caids[2];

		selbookid = bookid;
		selday = unitday;
		study.getResult(bookid, unitday);
	},
	getGrade: function(score) {
		if (score>=90) return "Perfect!";
		if (score>=80 && score<90) return "Great!";
		if (score>=70 && score<80) return "Good!";
		if (score>=60 && score<70) return "Pass!";
		if (score<60) return "Try Harder!";
	},
	getLevelGrade: function(score, bookid) {
		if (bookid=='L-1') {
			if (score>=73) return "Level Up!";
			if (score>=41 && score<73) return "Champ 2";
			if (score>=26 && score<41) return "Champ 1";
			if (score<26) return "Level Down!";
		} else if (bookid=='L-2') {
			if (score>=80) return "Level Up!";
			if (score>=47 && score<80) return "Champ 4";
			if (score>=31 && score<47) return "Champ 3";
			if (score<31) return "Level Down!";
		} else if (bookid=='L-3') {
			if (score>=83) return "Level Up!";
			if (score>=53 && score<83) return "Champ 6";
			if (score>=36 && score<53) return "Champ 5";
			if (score<36) return "Level Down!";
		} else if (bookid=='L-4') {
			if (score>=86) return "Level Up!";
			if (score>=60 && score<86) return "Plus 2";
			if (score>=41 && score<60) return "Plus 1";
			if (score<41) return "Level Down!";
		} else if (bookid=='L-11') {
			if (score>=75) return "Level Up!";
			if (score>=50 && score<75) return "Kinder 2";
			if (score<50) return "Kinder 1";
		} else if (bookid=='L-12') {
			if (score>=70) return "Level Up!";
			if (score>=53 && score<70) return "Kinder 6";
			if (score>=35 && score<53) return "Kinder 5";
			if (score>=18 && score<35) return "Kinder 4";
			if (score<18) return "Kinder 3";
		}
	},	
	initWriting: function(bookid, day) {
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getunitsheet/writing/"+bookid+"/"+day,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				
				var html="";
				
				for (var i=0; i<data.length; i++) {
					var check = study.checkSentence(data[i].answer,data[i].rightanswer);
					var score = check[0];
					check = check[1];
					//console.log(score);
					/*if ('<?=$bookid?>'!='K-1' && '<?=$bookid?>'!='K-2') {
						if (data[i].answer.toLowerCase()==data[i].rightanswer.toLowerCase()) var corr='O';
						else var corr='X';						
					} else {*/
						if (score==100) var corr='O';
						else if (score>=50) var corr='A';
						else var corr='X';
					//}
					html=html+'<tr><td align="center" style="width:5%">'+(i+1)+'</td><td align="center" style="width:10%"><img src="img/result/'+corr+'.png"/></td><td><div class="answer">'+data[i].question+'<br/>'+check+'</div></td></tr>';
				}
				
				$("#writingpanel").html(html);
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	},
	initSpeaking: function(bookid, day) {
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getunitsheet/speaking/"+bookid+"/"+day,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				
				var html="";
				var result="";
				var score=0;
				var quesno=0;
				
				for (var i=0; i<data.length; i++) {
					var user=data[i].answer;
					var org = data[i].rightanswer;
					var acting=false;					
					
					if (bookid.substr(0,2)=='A-') {
						if (org.indexOf('{B:}')==-1) acting=true;
						org = org.replace(/{A:}/g,'');
						org = org.replace(/{B:}/g,'');
						org = org.replace(/{C:}/g,'');
						org = org.replace(/{D:}/g,'');
						org = org.replace(/{E:}/g,'');
					}
					
					if (data[i].answer==data[i].rightanswer) var corr='O';
					if (bookid=='K-1' || bookid=='K-2') {
						var resultobj = getScore('alphabet', user, org);
						result = resultobj["html"];
						score = resultobj["score"];
					} else {						
						var resultobj = getScore('speaking', user, org);
						result = resultobj["html"];
						score = resultobj["score"];
					}
					
					score = parseInt(score);					
					
					if (acting) {
						html=html+'<tr><td align="center" style="width:5%">'+(i+1)+'</td><td align="center" style="width:10%"><img src="img/study/actinglisten.png" height="25px;"/></td><td><div class="answer">'+data[i].question+'<br/>'+org+'</div></td></tr>';
					}
					else {
						quesno++;
						var filename = 'u-'+window.localStorage.getItem('ls_userid')+'-b-'+bookid+'-'+day+'-'+(i+1)+'.mp3';
						if (selbookid.substr(0,2)=='L-') {
							filename = 'u-l'+levelid+'-b-'+bookid+'-'+day+'-'+(i+1)+'.mp3';
						}
						html=html+'<tr><td align="center" style="width:5%">'+(i+1)+'</td><td align="center" style="width:10%"><button class="btn btn-success" onclick="playAudio(\'http://mp3.3030class.com/media/speaking/'+filename+'\');">Play</button></td><td><div class="answer">'+data[i].question+'<br/>'+result+'</div></td></tr>';
						//if ('<?=substr($bookid,0,2)?>'!='K-') html=html+' ('+score+'점)';
					}					
					
					html=html+'</div><div class="line"></div></div>';					
				}
				
				$("#speakingpanel").html(html);
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	},
	initDictation: function(bookid, day) {
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getunitsheet/dictation/"+bookid+"/"+day,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				
				var html="";
				
				for (var i=0; i<data.length; i++) {
					var check = study.checkSentence(data[i].answer,data[i].rightanswer);
					var score = check[0];
					check = check[1];
					//console.log(score);
					/*if ('<?=$bookid?>'!='K-1' && '<?=$bookid?>'!='K-2') {
						if (data[i].answer.toLowerCase()==data[i].rightanswer.toLowerCase()) var corr='O';
						else var corr='X';						
					} else {*/
						if (score==100) var corr='O';
						else if (score>=50) var corr='A';
						else var corr='X';
					//}
					html=html+'<tr><td align="center" style="width:5%">'+(i+1)+'</td><td align="center" style="width:10%"><img src="img/result/'+corr+'.png"/></td><td><div class="answer">'+data[i].question+'<br/>'+check+'</div></td></tr>';
				}
				
				$("#dictationpanel").html(html);
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	},
	initPopquiz: function(bookid, day) {
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getunitsheet/popquiz/"+bookid+"/"+day,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				
				var html="";
				
				for (var i=0; i<data.length; i++) {
					if (data[i].answer==data[i].rightanswer) var corr='O';
					else var corr='X';
					
					//보기들
					var choices="";
					
					if (data[i].choices=='') {
						if (data[i].answer==data[i].rightanswer) {
							choices = "<font color='blue'>"+data[i].answer+"</font>";
						} else {
							choices = "<font color='red' style='text-decoration:line-through'>"+data[i].answer+"</font>"+" <font color='green'>("+data[i].rightanswer+")</font>";
						}
					} else {						
						for (var j=0; j<data[i].choices.length; j++) {
							if ((j+1)==data[i].rightanswer) choices=choices+"<font color='blue'>"+(j+1)+". "+data[i].choices[j]+"</font>&nbsp;&nbsp;&nbsp;";
							else if ((j+1)==data[i].answer) {
								choices=choices+"<font color='red' style='text-decoration:line-through'>"+(j+1)+". "+data[i].choices[j]+"</font>&nbsp;&nbsp;&nbsp;";
							} else choices=choices+(j+1)+". "+data[i].choices[j]+"&nbsp;&nbsp;&nbsp;";
						}
					}

					html=html+'<tr><td align="center" style="width:5%">'+(i+1)+'</td><td align="center" style="width:10%"><img src="img/result/'+corr+'.png"/></td><td><div class="answer">'+data[i].question+'<br/><span style="color:#777676">'+choices+'</span></div></td></tr>';
				}
				
				$("#popquizpanel").html(html);
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	},
	initKey: function(bookid, day) {
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: top.getServer()+"/engtrain/getsentences/"+bookid+"/"+day,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				
				var html="";
				
				for (var i=0; i<data.length; i++) {
					html=html+'<tr><td align="center" style="width:5%">'+(i+1)+'</td><td><div class="answer">'+data[i].transtxt+'</div></td></tr>';
				}
				
				$("#keysentencespanel").html(html);
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus);
			}
		});
	},
	drawDiagram: function() {
		var canvas = document.getElementById("resultgraph");
		var ctx = canvas.getContext('2d');

		var width = $("#resultgraph").attr("width");
		var half = Math.ceil(width/2);

		ctx.clearRect(0, 0, width+100, width+100);

		var writing = half*.8-(half*.8*results["writingscore"]/100);
		var popquiz = half*.8*results["popquizscore"]/100;
		var dictation = half*.8*results["dictationscore"]/100;
		var speaking = half*.8-(half*.8*results["speakingscore"]/100);

		ctx.beginPath(); 
		ctx.lineWidth="1";
		ctx.fillStyle="#d4d4d4";
		// ctx.moveTo(152,writing);
		// ctx.lineTo(152+popquiz,76);
		// ctx.lineTo(152,76+dictation);
		// ctx.lineTo(speaking,152);
		ctx.moveTo(half,0);
		ctx.lineTo(width,half);
		ctx.lineTo(half,width);
		ctx.lineTo(0,half);
		ctx.lineTo(half,0);
		ctx.stroke(); // Draw it

		ctx.beginPath(); 
		ctx.lineWidth="3";
		ctx.fillStyle="red";
		// ctx.moveTo(152,writing);
		// ctx.lineTo(152+popquiz,76);
		// ctx.lineTo(152,76+dictation);
		// ctx.lineTo(speaking,152);
		ctx.moveTo(half,writing);
		ctx.lineTo(half+popquiz+(half*.2),half);
		ctx.lineTo(half,half+dictation+half*.2);
		ctx.lineTo(speaking,half);
		ctx.fill(); // Draw it

		ctx.beginPath(); 
		ctx.lineWidth="1";
		ctx.fillStyle="#cccccc";
		ctx.moveTo(half,0);
		ctx.lineTo(half,width);
		ctx.stroke(); // Draw it

		ctx.beginPath(); 
		ctx.lineWidth="1";
		ctx.fillStyle="#cccccc";
		ctx.moveTo(0,half);
		ctx.lineTo(width,half);
		ctx.stroke(); // Draw it
	}
}

var listening = {
	init: function() {
		this.clear();
		top.spinner(0);

		sentences = new Array();
		//이미지 및 문장 
		sentences.push({"img":"8p.jpg","sentence":"This is Spotty.<br/>He’s my dog.<br/>I like to hug him.","mp3":"8p.mp3"});
		sentences.push({"img":"9p.jpg","sentence":"Look at his eyes!<br/>They look sleepy.<br/>Look at his mouth!<br/>He is drooling.<br/><br/>He looks silly.<br/>No, he is not silly.<br/>Look at his eyes and mouth.<br/>He is a silly dog.<br/><br/>No, he is not silly.<br/>He is smart.<br/>He is a smart dog.","mp3":"9p.mp3"});
	},
	startStudy: function() {
		$("#pageimg").attr("src","img/content/"+sentences[sentenceno].img);
		//$("#listening .blackboardtxt").html(sentences[sentenceno].sentence);
		$("#listening .blackboardtxt").html('&nbsp;');
	},
	next: function() {
		stopAudio();
		if (sentenceno<sentences.length-1) {
			sentenceno++;
			this.startStudy();
		} else {
			//study.sendResult('dictation');

			this.clear();
			nowpage = 'cabinet';
			setPage('cabinet');
		}
	},
	clear: function() {
		sentenceno=0;
		resultsheet=new Array();
		totalscore=0;
		avg=0;
		charpos=0;
		questxts = new Array();
		nowval = '';
	},
	playMP3: function() {
		$("#dictation #nextbtn").attr("disabled",true);
		$("#dictation #playbtn").attr("disabled",true);

		var mp3url = "/android_asset/www/mp3/"+sentences[sentenceno].mp3;
		playAudio(mp3url);
	},
	text: function() {
		if ($("#listening .blackboardtxt").html()=="&nbsp;") {
			$("#listening .blackboardtxt").html(sentences[sentenceno].sentence);
		} else {
			$("#listening .blackboardtxt").html("&nbsp;");
		}
	}
}

var writing = {
	init: function() {
		this.clear();
		study.setSentences();

		$("#writing .blackboardtxt").css("color","#79aae9");
		$("#writing #answertxt").css("color","#79aae9");
	},
	startStudy: function() {
		initKeyBoard();

		var nowno = sentenceno+1;
		$("#writing #labelsentences").text(nowno+" / "+sentences.length);
		//입력포커스 및 키보드
		charpos = 0;
		
		var orgtxt=sentences[sentenceno].sentence;
		
		if (selbookid.substr(0,2)=='A-') {
			orgtxt = orgtxt.replace(/{A:}/g,'');
			orgtxt = orgtxt.replace(/{B:}/g,'');
			orgtxt = orgtxt.replace(/{C:}/g,'');
			orgtxt = orgtxt.replace(/{D:}/g,'');
			orgtxt = orgtxt.replace(/{E:}/g,'');
		}

		questxts[nowno-1] = orgtxt.replace(/[a-zA-Z0-9]/g,"*");

		if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {

			var orgques="";
			var checkdot=true;
			for (var i=0; i<orgtxt.length; i++) {
				var char = orgtxt.substr(i,1);
				if (char=='{') {
					checkdot=false;
					continue;
				}
				if (char=='}') {
					checkdot=true;
					continue;
				}
				if (checkdot) orgques=orgques+"*"; //●
				else orgques=orgques+char;
			}
			questxts[nowno-1] = orgques;

			orgtxt = orgtxt.replace(/{/g,'');
			orgtxt = orgtxt.replace(/}/g,'');
			var wordimg = "<img src='"+top.getServer()+"/engtrain/img/words/"+orgtxt.toLowerCase()+".jpg' height='"+parseInt(winHeight*.2)+"'/>";
			$("#writing .blackboardtxt").html(wordimg);
		} else {
			$("#writing .blackboardtxt").text(sentences[sentenceno].transtxt);
		}

		$("#writing #answertxt").val(questxts[nowno-1]);
		//$("#writing #answertxt").focus();

		nowval = $("#writing #answertxt").val();

		setCursorPos($("#writing #answertxt")[0], 0, 1);
		
		$("#writing #answertxt").click(function(e) {
			var nowcharpos = getCursorPos($("#writing #answertxt")[0]).start;
			charpos = nowcharpos;
			//console.log(charpos);
			setCursorPos($("#writing #answertxt")[0], charpos, charpos+1);
			initKeyBoard();
		});	
	},
	next: function() {
		this.check();

		$("#writing #answertxt").val('');

		if (sentenceno<sentences.length-1) {
			sentenceno++;
			this.startStudy();
		} else {
			//study.sendResult('writing');
			this.clear();
			nowpage = 'cabinet';
			setPage('cabinet');
		}
	},
	clear: function() {
		sentenceno=0;
		resultsheet=new Array();
		totalscore=0;
		avg=0;
		charpos=0;
		questxts = new Array();
		nowval = '';
	},
	check: function() {
		var score = study.checkSentences($("#writing #answertxt").val(), sentences[sentenceno].sentence);
		totalscore=totalscore+score;

		var orgtxt = sentences[sentenceno].sentence;
        if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
			orgtxt = orgtxt.replace(/{/g,'');
			orgtxt = orgtxt.replace(/}/g,'');
		}

		var result={"no":sentenceno+1,"question":sentences[sentenceno].transtxt,"answer":$("#writing #answertxt").val(),"rightanswer":orgtxt};
		resultsheet.push(result);
	},
	keyPadClick: function(key) {
		var selques = questxts[sentenceno].substr(charpos,1);
		console.log(charpos+' '+selques);
		
		switch (key) {
			case "back":
				if (charpos>0) charpos--;
			break;
			case "space":
				if (charpos<questxts[sentenceno].length-1) {
					charpos++;
				}
			break;
			case "":
			break;
			case "enter":
				writing.next();
			break;
			default: 
				if (charpos<questxts[sentenceno].length) {
					if (selques=="*") {
						var ans = $("#writing #answertxt").val();
						$("#writing #answertxt").val(ans.substr(0,charpos)+key+ans.substr(charpos+1));
					}
					if (charpos<questxts[sentenceno].length-1) {
						charpos++;
					}
				}
			break;
		}

		setCursorPos($("#writing #answertxt")[0], charpos, charpos+1);
	}
}


var speakingerror=0;

var speaking = {
	init: function() {
		this.clear();

		if (sentences==null) study.setSentences();
		else {
			top.spinner(0);
		}

		// var path = svg.append('path')
	 //    .data([points])
	 //    .attr('d', d3.svg.line().interpolate('bundle'))
	 //    .attr('stroke-weight', '5px')
	 //    .attr('fill', 'none')
	 //    .attr('class', 'poly')
	},
	startStudy: function() {
		recSpectrum = new Array();
		var nowno = sentenceno+1;
		//학습정보 Native 전달
		console.log(selbookid);
		StudyMsg.inputStudyInfo(selbookid, selday, nowno);

		$("#speaking #recbtn").attr("disabled",false);
		//$("#speaking #nextbtn").attr("disabled",true);
		
		x=0;
		recx=0;
		cnt=0;
		speakingerror=0;
		clearCanvas();
		var orgtxt=sentences[sentenceno].sentence;
		$("#speaking #questionimg").html('');
		$("#speaking #questionimg").css('width',"0px");
		$("#speaking #notetxt").css("width","100%");
		$("#speaking #questiontxt").css("text-align","center");
		$("#speaking #answertxt").css("text-align","center");

		//acting
		if (selbookid.substr(0,2)=='A-') {
		  	if (sentences[sentenceno].sentence.indexOf('{B:}')>=0) {
		  		nowquesno++;
		  		$("#speaking #labelsentences").text(nowquesno+" / "+totalquesno);
				$("#speaking #canvas").css("visibility","hidden");
				wavedata = JSON.parse(wavedatas[sentenceno].wavedata);
				var time = wavedatas[sentenceno].time;

				//gap = parseInt(canvas_width/(wavedata.length));
				var zcnt=0;
				for (var i=0; i<wavedata.length; i++) {
					if (wavedata[i]==0) zcnt++;
				}

				gap = parseInt(canvas_width/(wavedata.length-zcnt));
				drawSpectrum(wavedata[cnt], 'blue', 0);

				$("#actinglisten").hide();
				$("#actingspeaking").show();
				$("#speaking #questiontxt").show();
				$("#speaking #labelsentences").show();
				$("#speaking #recbtn").show();
				$("#speaking #nextbtn").show();
		  	} else {
		  		$("#actinglisten").show();
		  		$("#actingspeaking").hide();
		  		$("#speaking #questiontxt").hide();
		  		$("#speaking #labelsentences").hide();
		  		$("#speaking #recbtn").hide();
				$("#speaking #nextbtn").hide();
		  		$("#speaking #canvas").css("visibility","visible");

		  		// var mp3url = "http://mp3.3030class.com/media/ogg/"+selbookid+"/"+selbookid+"lite/ST-"+selbookid+"-"+selday+"-SQ"+(parseInt(sentences[sentenceno].stseq)+1)+".ogg";

		  		// oggPlayer.play(mp3url);
		  		this.playMP3();
		  	}
		  	$("#speaking #questiontxt").html(sentences[sentenceno].sentence);
		} else {
			$("#speaking #labelsentences").text(nowno+" / "+totalquesno);
			$("#speaking #canvas").css("visibility","hidden");
			wavedata = JSON.parse(wavedatas[sentenceno].wavedata);
			var time = wavedatas[sentenceno].time;
			console.log(wavedatas);
			//gap = parseInt(canvas_width/(wavedata.length));
			var zcnt=0;
			for (var i=0; i<wavedata.length; i++) {
				if (wavedata[i]==0) zcnt++;
			}

			gap = parseInt(canvas_width/(wavedata.length-zcnt));
			drawSpectrum(wavedata[cnt], 'blue', 0);

			$("#actinglisten").hide();
			$("#actingspeaking").hide();
			$("#speaking #questiontxt").show();
			$("#speaking #labelsentences").show();
			$("#speaking #recbtn").show();
			$("#speaking #nextbtn").show();

			if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
				var viewtxt = orgtxt.replace(/{/g,'<span style="color:#79aae9">');
				viewtxt = viewtxt.replace(/}/g,'</span>');
				orgtxt = orgtxt.replace(/{/g,'');
				orgtxt = orgtxt.replace(/}/g,'');
				var wordimg = "<img src='"+top.getServer()+"/engtrain/img/words/"+orgtxt.toLowerCase()+".jpg' height='"+parseInt(winHeight*.2)+"'/>";
				$("#speaking #questionimg").html(wordimg+"&nbsp;&nbsp;");
				$("#speaking #questiontxt").html("<span style='color:red'>"+viewtxt+"</span>");
				$("#speaking #questionimg").css('width',"50%");
				$("#speaking #notetxt").css("width","50%");
				$("#speaking #questiontxt").css("text-align","left");
				$("#speaking #answertxt").css("text-align","left");
			}
			else $("#speaking #questiontxt").html(sentences[sentenceno].sentence);
		}

		$("#speaking #answertxt").html('');
		$("#speaking #scoreno").html('');
	},
	next: function() {
		if (sentenceno<sentences.length-1) {
			sentenceno++;
			this.startStudy();
		} else {
			//study.sendResult('speaking');

			this.clear();
			nowpage = 'cabinet';
			setPage('cabinet');
		}
	},
	recognition: function() {
		recSpectrum = new Array();
		recx=0;
		speakingerror=0;
		clearCanvas2();
		$("#speaking #answertxt").html('');
		$("#speaking #scoreno").html('');

		var maxMatches = 5;
        var promptString = "Speak now"; // optional
        var language = "en-US";                     // optional
        window.plugins.speechrecognizer.startRecognize(function(result){
            //mediaRec.stopRecord();
            var score=-1;
            var checkScore=null;
            var final_script='';
            var orgtxt = sentences[sentenceno].sentence;
            if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
				orgtxt = orgtxt.replace(/{/g,'');
				orgtxt = orgtxt.replace(/}/g,'');
			}
			if (selbookid.substr(0,2)=='A-') {
				orgtxt = orgtxt.replace(/{A:}/g,'');
				orgtxt = orgtxt.replace(/{B:}/g,'');
				orgtxt = orgtxt.replace(/{C:}/g,'');
				orgtxt = orgtxt.replace(/{D:}/g,'');
				orgtxt = orgtxt.replace(/{E:}/g,'');
			}

            for (var i=0; i<result.length; i++) {
            	var check=checkSpeaking(result[i], orgtxt);
            	console.log(check);
            	if (check.score>score) {
            		score = check.score;
            		checkScore=check;
            		final_script = result[i];
            	}
        	}

			totalscore=totalscore+score;

			if (selbookid.substr(0,2)=='A-') {
				orgtxt = sentences[sentenceno].sentence;
			}

			var result={"no":sentenceno+1,"question":sentences[sentenceno].transtxt,"answer":final_script,"rightanswer":orgtxt};
			resultsheet.push(result);

        	//레벨테스트
        	if (selbookid.substr(0,2)=='L-') {
        		$("#speaking #questiontxt").html("");
				$("#speaking #questionimg").html("");
				$("#speaking #questionimg").css('width',"0%");
				$("#speaking #answertxt").css("text-align","center");
        		$("#speaking #answertxt").html('음성을 듣고 다음으로 가기 화살표 버튼을 눌러주세요.');
        	} else {
        		//$("#speaking #answertxt").html(checkScore.html);
        		$("#speaking #questiontxt").html(checkScore.html);
        		$("#speaking #scoreno").html("SCORE "+Math.ceil(score));
        	}
            // var mediaPlay = new Media(src, onSuccess, onError);
            // mediaPlay.play();
            //$("#speaking #recbtn").attr("disabled",true);
        }, function(errorMessage){
            //alert(errorMessage);
            speakingerror++;
            if (speakingerror<3) alert("다시 녹음하세요.");
            else {
            	var orgtxt = sentences[sentenceno].sentence;
	            if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
					orgtxt = orgtxt.replace(/{/g,'');
					orgtxt = orgtxt.replace(/}/g,'');
				}
				if (selbookid.substr(0,2)=='A-') {
					orgtxt = orgtxt.replace(/{A:}/g,'');
					orgtxt = orgtxt.replace(/{B:}/g,'');
					orgtxt = orgtxt.replace(/{C:}/g,'');
					orgtxt = orgtxt.replace(/{D:}/g,'');
					orgtxt = orgtxt.replace(/{E:}/g,'');
				}

            	var result={"no":sentenceno+1,"question":sentences[sentenceno].transtxt,"answer":"","rightanswer":orgtxt};
				resultsheet.push(result);

	        	$("#speaking #answertxt").html("인식실패");
	            //$("#speaking #recbtn").attr("disabled",true);
	            $("#speaking #nextbtn").attr("disabled",false);
            }
        }, maxMatches, promptString, language);
	},
	playMP3: function() {
		x=0;
		cnt=0;
		clearCanvas();

		var mp3url = "http://mp3.3030class.com/media/ogg/"+selbookid+"/"+selbookid+"lite/ST-"+selbookid+"-"+selday+"-SQ"+(parseInt(sentences[sentenceno].stseq)+1)+".ogg";
		console.log(mp3url);
		// var mediaPlay = new Media(mp3url, this.mp3Done, onError);
  //       mediaPlay.play();

  		oggPlayer.play(mp3url);
	},
	mp3Start: function() {
		cnt=0;
		wavedata = JSON.parse(wavedatas[sentenceno].wavedata);
		//gap = parseInt(canvas_width/(wavedata.length));
		var zcnt=0;
		for (var i=0; i<wavedata.length; i++) {
			if (wavedata[i]==0) zcnt++;
		}

		gap = parseInt(canvas_width/(wavedata.length-zcnt));
		//console.log(wavedata);

		drawSpectrum(wavedata[cnt], 'blue', 40);
	},
	mp3Done: function() {
		setTimeout(function() {
			$("#speaking #nextbtn").click();
		},3000);

		var orgtxt = sentences[sentenceno].sentence;

		var result={"no":sentenceno+1,"question":sentences[sentenceno].transtxt,"answer":"","rightanswer":orgtxt};
		resultsheet.push(result);
	},
	clear: function() {
		sentenceno=0;
		resultsheet=new Array();
		totalscore=0;
		nowquesno=0;
		avg=0;
		speakingerror=0;
	}
}

var speaking2 = {
	init: function() {
		this.clear();

		if (sentences==null) study.setSentences();
		else {
			top.spinner(0);
		}
	},
	startStudy: function() {
		recSpectrum = new Array();
		var nowno = sentenceno+1;
		//학습정보 Native 전달
		console.log(selbookid);
		//StudyMsg.inputStudyInfo(selbookid, selday, nowno);

		$("#speaking2 #recbtn").attr("disabled",false);
		//$("#speaking #nextbtn").attr("disabled",true);
		
		x=0;
		recx=0;
		cnt=0;
		speakingerror=0;
		clearCanvas();
		var orgtxt=sentences[sentenceno].sentence;
		$("#speaking2 #questionimg").html('');
		$("#speaking2 #questionimg").css('width',"0px");
		$("#speaking2 #notetxt").css("width","100%");
		$("#speaking2 #questiontxt").css("text-align","center");
		$("#speaking2 #answertxt").css("text-align","center");

		//acting
		if (selbookid.substr(0,2)=='A-') {
		  	if (sentences[sentenceno].sentence.indexOf('{B:}')>=0) {
		  		nowquesno++;
		  		$("#speaking2 #labelsentences").text(nowquesno+" / "+totalquesno);
				//$("#speaking2 #canvas").css("visibility","hidden");
				wavedata = JSON.parse(wavedatas[sentenceno].wavedata);
				var time = wavedatas[sentenceno].time;

				//gap = parseInt(canvas_width/(wavedata.length));
				var zcnt=0;
				for (var i=0; i<wavedata.length; i++) {
					if (wavedata[i]==0) zcnt++;
				}

				gap = parseInt(canvas_width/(wavedata.length-zcnt));
				//drawSpectrum(wavedata[cnt], 'blue', 0);

				$("#actinglisten").hide();
				$("#actingspeaking").show();
				$("#speaking2 #questiontxt").show();
				$("#speaking2 #labelsentences").show();
				$("#speaking2 #recbtn").show();
				$("#speaking2 #nextbtn").show();
		  	} else {
		  		$("#actinglisten").show();
		  		$("#actingspeaking").hide();
		  		$("#speaking2 #questiontxt").hide();
		  		$("#speaking2 #labelsentences").hide();
		  		$("#speaking2 #recbtn").hide();
				$("#speaking2 #nextbtn").hide();
		  		//$("#speaking2 #canvas").css("visibility","visible");

		  		// var mp3url = "http://mp3.3030class.com/media/ogg/"+selbookid+"/"+selbookid+"lite/ST-"+selbookid+"-"+selday+"-SQ"+(parseInt(sentences[sentenceno].stseq)+1)+".ogg";

		  		// oggPlayer.play(mp3url);
		  		this.playMP3();
		  	}
		  	$("#speaking2 #questiontxt").html(sentences[sentenceno].sentence);
		} else {
			$("#speaking2 #labelsentences").text(nowno+" / "+totalquesno);
			//$("#speaking2 #canvas").css("visibility","hidden");
			wavedata = JSON.parse(wavedatas[sentenceno].wavedata);
			var time = wavedatas[sentenceno].time;
			console.log(wavedatas);
			//gap = parseInt(canvas_width/(wavedata.length));
			var zcnt=0;
			for (var i=0; i<wavedata.length; i++) {
				if (wavedata[i]==0) zcnt++;
			}

			gap = parseInt(canvas_width/(wavedata.length-zcnt));
			//drawSpectrum(wavedata[cnt], 'blue', 0);

			$("#actinglisten").hide();
			$("#actingspeaking").hide();
			$("#speaking2 #questiontxt").show();
			$("#speaking2 #labelsentences").show();
			$("#speaking2 #recbtn").show();
			$("#speaking2 #nextbtn").show();

			if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
				var viewtxt = orgtxt.replace(/{/g,'<span style="color:#79aae9">');
				viewtxt = viewtxt.replace(/}/g,'</span>');
				orgtxt = orgtxt.replace(/{/g,'');
				orgtxt = orgtxt.replace(/}/g,'');
				var wordimg = "<img src='"+top.getServer()+"/engtrain/img/words/"+orgtxt.toLowerCase()+".jpg' height='"+parseInt(winHeight*.2)+"'/>";
				$("#speaking2 #questionimg").html(wordimg+"&nbsp;&nbsp;");
				$("#speaking2 #questiontxt").html("<span style='color:red'>"+viewtxt+"</span>");
				$("#speaking2 #questionimg").css('width',"50%");
				$("#speaking2 #notetxt").css("width","50%");
				$("#speaking2 #questiontxt").css("text-align","left");
				$("#speaking2 #answertxt").css("text-align","left");
			}
			else $("#speaking2 #questiontxt").html(sentences[sentenceno].sentence);
		}

		$("#speaking2 #answertxt").html('');
		$("#speaking2 #scoreno").html('');
	},
	next: function() {
		if (sentenceno<sentences.length-1) {
			sentenceno++;
			this.startStudy();
		} else {
			//study.sendResult('speaking');

			this.clear();
			nowpage = 'cabinet';
			setPage('cabinet');
		}
	},
	clear: function() {
		sentenceno=0;
		resultsheet=new Array();
		totalscore=0;
		nowquesno=0;
		avg=0;
		speakingerror=0;
	},
	recognition: function() {
		$("#speaking2 #answertxt").html('');
		$("#speaking2 #scoreno").html('');
		$("#speaking2 #recbtn").attr("disabled",true);
		$("#speaking2 #nextbtn").attr("disabled",true);
		$("#speaking2mic").attr("src","img/speaking2/micon.png");
		voiceengine.start();
	},
	result: function(result) {
		if (nowpage=='shadow') {
			shadow.result(result);
			return;
		}

		$("#speaking2mic").attr("src","img/speaking2/micoff.png");

		$("#speaking2 #recbtn").attr("disabled",false);
		$("#speaking2 #nextbtn").attr("disabled",false);
		console.log(result);
		var score=-1;
        var checkScore=null;
        var final_script='';
        var orgtxt = sentences[sentenceno].sentence;
        if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
			orgtxt = orgtxt.replace(/{/g,'');
			orgtxt = orgtxt.replace(/}/g,'');
		}
		if (selbookid.substr(0,2)=='A-') {
			orgtxt = orgtxt.replace(/{A:}/g,'');
			orgtxt = orgtxt.replace(/{B:}/g,'');
			orgtxt = orgtxt.replace(/{C:}/g,'');
			orgtxt = orgtxt.replace(/{D:}/g,'');
			orgtxt = orgtxt.replace(/{E:}/g,'');
		}

        for (var i=0; i<result.length; i++) {
        	var check=checkSpeaking(result[i], orgtxt);
        	console.log(check);
        	if (check.score>score) {
        		score = check.score;
        		checkScore=check;
        		final_script = result[i];
        	}
    	}

		totalscore=totalscore+score;

		if (selbookid.substr(0,2)=='A-') {
			orgtxt = sentences[sentenceno].sentence;
		}

		//$("#speaking2 #answertxt").html(checkScore.html+' ('+Math.ceil(score)+'점)');
		$("#speaking2 #questiontxt").html(checkScore.html);
        $("#speaking2 #scoreno").html("SCORE "+Math.ceil(score));
	}
}

var dictation = {
	init: function() {
		this.clear();
		
		if (sentences==null) {
			study.setSentences();
		}
		else {
			top.spinner(0);
		}

		//파닉스는 화이트보드
		if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
			$("#dictation #boardimg").attr("src","img/study/whiteboard.png");
			//$("#dictation #answertxt").css("color","#000");
		} else {
			$("#dictation #boardimg").attr("src","img/study/blackboard.png");
			//$("#dictation #answertxt").css("color","#fff");
		}
	},
	startStudy: function() {
		$("#keyboard").hide();
		$("#dictation #nextbtn").attr("disabled",true);

		var nowno = sentenceno+1;
		$("#dictation #labelsentences").text(nowno+" / "+sentences.length);

		this.playMP3();

		//입력포커스 및 키보드
		charpos = 0;
		
		var orgtxt=sentences[sentenceno].sentence;
		
		if (selbookid.substr(0,2)=='A-') {
			orgtxt = orgtxt.replace(/{A:}/g,'');
			orgtxt = orgtxt.replace(/{B:}/g,'');
			orgtxt = orgtxt.replace(/{C:}/g,'');
			orgtxt = orgtxt.replace(/{D:}/g,'');
			orgtxt = orgtxt.replace(/{E:}/g,'');
		}

		questxts[nowno-1] = orgtxt.replace(/[a-zA-Z0-9]/g,"*");

		if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {

			var orgques="";
			var checkdot=true;
			for (var i=0; i<orgtxt.length; i++) {
				var char = orgtxt.substr(i,1);
				if (char=='{') {
					checkdot=false;
					continue;
				}
				if (char=='}') {
					checkdot=true;
					continue;
				}
				if (checkdot) orgques=orgques+"*"; //●
				else orgques=orgques+char;
			}
			questxts[nowno-1] = orgques;

			orgtxt = orgtxt.replace(/{/g,'');
			orgtxt = orgtxt.replace(/}/g,'');
			var wordimg = "<img src='"+top.getServer()+"/engtrain/img/words/"+orgtxt.toLowerCase()+".jpg' height='"+parseInt(winHeight*.2)+"'/>";
			$("#dictation #dicvocaimg").html(wordimg);
		} else {
			$("#dictation #dicvocaimg").html('');
		}

		$("#dictation #answertxt").val(questxts[nowno-1]);
		$("#dictation #answertxt").focus();

		nowval = $("#dictation #answertxt").val();

		setCursorPos($("#dictation #answertxt")[0], 0, 1);
		
		$("#dictation #answertxt").click(function(e) {
			var nowcharpos = getCursorPos($("#dictation #answertxt")[0]).start;
			charpos = nowcharpos;
			//console.log(charpos);
			setCursorPos($("#dictation #answertxt")[0], charpos, charpos+1);
			initKeyBoard();
		});
	},
	next: function() {
		this.check();
		$("#dictation #answertxt").val('');

		oggPlayer.stop();

		if (sentenceno<sentences.length-1) {
			sentenceno++;
			this.startStudy();
		} else {
			//study.sendResult('dictation');

			this.clear();
			nowpage = 'cabinet';
			setPage('cabinet');
		}
	},
	clear: function() {
		sentenceno=0;
		resultsheet=new Array();
		totalscore=0;
		avg=0;
		charpos=0;
		questxts = new Array();
		nowval = '';
	},
	playMP3: function() {
		$("#dictation #nextbtn").attr("disabled",true);
		$("#dictation #playbtn").attr("disabled",true);

		x=0;
		cnt=0;
		clearCanvas();

		var mp3url = "http://mp3.3030class.com/1-"+(sentenceno+1)+".ogg";

		//var mp3url = "/android_asset/www/mp3/1-"+(sentenceno+1)+".ogg";
		//console.log(mp3url);
		// var mediaPlay = new Media(mp3url, this.mp3Done, onError);
  //       mediaPlay.play();

  		oggPlayer.play(mp3url);
	},
	mp3Start: function() {
		cnt=0;
		wavedata = JSON.parse(wavedatas[sentenceno].wavedata);

		var zcnt=0;
		for (var i=0; i<wavedata.length; i++) {
			if (wavedata[i]==0) zcnt++;
		}

		gap = parseInt(canvas_width/(wavedata.length-zcnt));
		console.log(wavedata);

		drawSpectrum(wavedata[cnt], 'blue', 40);
	},
	mp3Done: function() {
		setTimeout(function() {
			initKeyBoard();
			$("#dictation #nextbtn").attr("disabled",false);
			$("#dictation #playbtn").attr("disabled",false);
		},2000);
	},
	check: function() {
		var score = study.checkSentences($("#dictation #answertxt").val(), sentences[sentenceno].sentence);
		totalscore=totalscore+score;

		var orgtxt = sentences[sentenceno].sentence;
        if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
			orgtxt = orgtxt.replace(/{/g,'');
			orgtxt = orgtxt.replace(/}/g,'');
		}

		var result={"no":sentenceno+1,"question":sentences[sentenceno].transtxt,"answer":$("#dictation #answertxt").val(),"rightanswer":orgtxt};
		resultsheet.push(result);
	},
	keyPadClick: function(key) {
		var selques = questxts[sentenceno].substr(charpos,1);
		//console.log(charpos+' '+selques);
		
		switch (key) {
			case "back":
				if (charpos>0) charpos--;
			break;
			case "space":
				if (charpos<questxts[sentenceno].length-1) {
					charpos++;
				}
			break;
			case "enter":
				if (!$("#dictation #nextbtn").attr("disabled")) dictation.next();
			break;
			default: 
				if (charpos<questxts[sentenceno].length) {
					if (selques=="*") {
						var ans = $("#dictation #answertxt").val();
						$("#dictation #answertxt").val(ans.substr(0,charpos)+key+ans.substr(charpos+1));
					}
					if (charpos<questxts[sentenceno].length-1) {
						charpos++;
					}
				}
			break;
		}
		if (charpos==questxts[sentenceno].length) charpos--;
		
		setCursorPos($("#dictation #answertxt")[0], charpos, charpos+1);
	}
}

var isvoca=false;
var popquiz = {
	init: function() {
		this.clear();

		if (selbookid=='LPQ') {
			cawords = new Array();
			cawords.push({"wseq":"0","question":"대화를 듣고, 남자의 마지막 말에 이어질 여자의 응답으로 가장 알맞은 것을 고르시오.","choices":["What's up?","That's all.","Sounds good.","Sorry, she's not in."],"mp3":"Jins Sample 01.mp3"});
			cawords.push({"wseq":"1","question":"다음을 듣고, 오늘 부산의 날씨로 알맞은 것을 고르시오.","choices":["Cloudy","Sunny","Snowy","Rainy"],"mp3":"Jins Sample 02.mp3"});
			cawords.push({"wseq":"2","question":"대화를 듣고 어색한 것을 고르시오.","choices":["","","",""],"mp3":"Jins Sample 03.mp3"});
			cawords.push({"wseq":"3","question":"대화를 듣고, 남자가 지난 주말에 한 일이 아닌 것을 고르시오.","choices":["수영","낚시","하이킹","관광"],"mp3":"Jins Sample 04.mp3"});
			cawords.push({"wseq":"4","question":"대화를 듣고, 여자가 이용한 교통수단을 고르시오.","choices":["버스","비행기","완행열차","급행열차"],"mp3":"Jins Sample 05.mp3"});

			top.spinner(0);
		} else {
			study.setWords()
		}

		$("#choice0").click(function(e) {
			answers[sentenceno]=1;
			popquiz.clearbtn();
			$("#choice0 .label").addClass("label-danger");
		});
		$("#choice1").click(function(e) {
			answers[sentenceno]=2;
			popquiz.clearbtn();
			$("#choice1 .label").addClass("label-danger");
		});
		$("#choice2").click(function(e) {
			answers[sentenceno]=3;
			popquiz.clearbtn();
			$("#choice2 .label").addClass("label-danger");
		});
		$("#choice3").click(function(e) {
			answers[sentenceno]=4;
			popquiz.clearbtn();
			$("#choice3 .label").addClass("label-danger");
		});

		//파닉스는 화이트보드
		isvoca=false;
		if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
			//$("#popquiz #boardimg").attr("src","img/study/whiteboard.png");
			isvoca=true;
		} else {
			//$("#popquiz #boardimg").attr("src","img/study/blackboard.png");
		}
	},
	startStudy: function() {	
		this.clearbtn();
		var nowno = sentenceno+1;
		$("#popquiz #labelsentences").text(nowno+" / "+cawords.length);

		if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
			var orgtxt=cawords[sentenceno].word;
			orgtxt = orgtxt.replace(/{/g,'');
			orgtxt = orgtxt.replace(/}/g,'');
			var wordimg = "<img src='"+top.getServer()+"/engtrain/img/words/"+orgtxt.toLowerCase()+".jpg' height='"+parseInt(winHeight*.2)+"'/>";
			$("#popquiz #questiontxt").html(wordimg);
			$("#popquiz #dicvocaimg").html(wordimg);
			// $("#popquiz #answertxt").css("color","#000");
			// $("#popquiz .blackboardtxt").css("color","#000");
			// $("#popquiz #questiontxt").css("color","#000");
		} else if (selbookid=='LPQ') {
			$("#popquiz #questiontxt").html(cawords[sentenceno].question);
		} else {
			$("#popquiz #questiontxt").html(cawords[sentenceno].wordmean);
			$("#popquiz #dicvocaimg").html(cawords[sentenceno].wordmean);
			// $("#popquiz #answertxt").css("color","#000");
			// $("#popquiz .blackboardtxt").css("color","#fff");
			// $("#popquiz #questiontxt").css("color","#000");
		}

		var isvoca=true;
		
		//주관식 여부 (전체 20%)
		if (!isvoca && ((cawords.length<5 && nowno==cawords.length) || parseInt(cawords.length*.8)<nowno)) {
			initKeyBoard();

			$("#popquiz #multiplechoice").css("visibility","hidden");
			$("#popquiz #shortanswer").css("visibility","visible");

			//주관식
			//입력포커스 및 키보드
			charpos = 0;
			
			var orgtxt=cawords[sentenceno].word;

			questxts[nowno-1] = orgtxt.replace(/[a-zA-Z0-9]/g,"*");
			$("#popquiz #answertxt").val(questxts[nowno-1]);
			$("#popquiz #answertxt").focus();

			nowval = $("#popquiz #answertxt").val();
			
			$("#popquiz #answertxt").click(function(e) {
				//주관식인 경우만 해당 
				if (!isvoca && ((cawords.length<5 && nowno==cawords.length) || parseInt(cawords.length*.8)<nowno)) {
					var nowcharpos = getCursorPos($("#popquiz #answertxt")[0]).start;
					charpos = nowcharpos;
					//console.log(charpos);
					setCursorPos($("#popquiz #answertxt")[0], charpos, charpos+1);
					initKeyBoard();
				}
			});

			setTimeout(function() {
				setCursorPos($("#popquiz #answertxt")[0], 0, 1);
			},300);
		} else {
			$("#popquiz #multiplechoice").css("visibility","visible");
			$("#popquiz #shortanswer").css("visibility","hidden");
			$("#popquiz #nextbtntop").css("display","none");

			if (selbookid=='LPQ') {
				var choices = cawords[sentenceno].choices;
				console.log(choices);
				for (var i=0; i<choices.length; i++) {
					$("#choice"+i+" .choicetxt").text(choices[i]);
				}

				setTimeout("popquiz.playMP3();", 500);
			} else {
				this.getChoices(cawords[sentenceno].word);
			}
		}

		if (selbookid!='LPQ') ttsengine.speak(cawords[sentenceno].sentence);
	},
	next: function() {
		if (selbookid=='LPQ') {
			stopAudio();
		}

		this.check();

		if (sentenceno<cawords.length-1) {
			sentenceno++;
			this.startStudy();
		} else {
			//study.sendResult('popquiz');

			this.clear();
			nowpage="cabinet";
			setPage(nowpage);
		}
	},
	clear: function() {
		sentenceno=0;
		resultsheet=new Array();
		rightcnt=0;
		totalscore=0;
		avg=0;
		charpos=0;
		questxts = new Array();
		nowval = '';
	},
	clearbtn: function() {
		for (var i=0; i<4; i++) {
			$("#choice"+i+" .label").removeClass("label-danger");
			$("#choice"+i+" .label").addClass("label-success");
		}
	},
	getChoices: function(ques) {
		var maxwordscnt = bookwords.length;
		var choices=new Array();
		var cnt=0;
		var rightno=Math.floor(Math.random()*4);
		rightanswers[sentenceno]=rightno+1;
		
		while (cnt<4 && maxwordscnt>4) {
			if (cnt==rightno) {
				choices[cnt]=ques;
				$("#choice"+cnt+" .choicetxt").text(ques);
				cnt++;
				
				continue;
			}
			
			var wordno=Math.floor(Math.random()*maxwordscnt);
			////console.log(wordno);
			var spell=bookwords[wordno].word;
			
			if (spell!=ques && synCheckWods(ques, spell)) {
				var dupcheck=true;			
				
				for (var i=0; i<cnt; i++) {
					if (spell==choices[i]) {
						dupcheck=false;
						break;
					}
				}
				
				if (dupcheck) {
					choices[cnt]=spell;
					$("#choice"+cnt+" .choicetxt").text(spell);
					cnt++;
				}
			}
		}
		
		////console.log(choices);
		multiples[sentenceno]=choices;
	},
	check: function() {
		var nowno = sentenceno+1;
		if (!isvoca && ((cawords.length<5 && nowno==cawords.length) || parseInt(cawords.length*.8)<nowno)) {
			var result = {"no":sentenceno+1,"question":cawords[sentenceno].wordmean,"choices":"","answer":$("#popquiz #answertxt").val(),"rightanswer":cawords[sentenceno].word};
			resultsheet.push(result);

			if ($("#popquiz #answertxt").val()==cawords[sentenceno].word) rightcnt++;
		} else {
			var result = {"no":sentenceno+1,"question":cawords[sentenceno].wordmean,"choices":multiples[sentenceno],"answer":answers[sentenceno],"rightanswer":rightanswers[sentenceno]};
			resultsheet.push(result);

			if (answers[sentenceno]==rightanswers[sentenceno]) rightcnt++;
		}
	},
	keyPadClick: function(key) {
		var selques = questxts[sentenceno].substr(charpos,1);
		//console.log(charpos+' '+selques);
		
		switch (key) {
			case "back":
				if (charpos>0) charpos--;
			break;
			case "space":
				if (charpos<questxts[sentenceno].length-1) {
					charpos++;
				}
			break;
			case "enter":
				if (!$("#popquiz #nextbtntop").attr("disabled")) popquiz.next();
			break;
			default: 
				if (charpos<questxts[sentenceno].length) {
					if (selques=="*") {
						var ans = $("#popquiz #answertxt").val();
						$("#popquiz #answertxt").val(ans.substr(0,charpos)+key+ans.substr(charpos+1));
					}
					if (charpos<questxts[sentenceno].length-1) {
						charpos++;
					}
				}
			break;
		}
		if (charpos==questxts[sentenceno].length) charpos--;
		
		setCursorPos($("#popquiz #answertxt")[0], charpos, charpos+1);
	},
	playMP3: function() {
		$("#dictation #nextbtn").attr("disabled",true);
		$("#dictation #playbtn").attr("disabled",true);

		var mp3url = "/android_asset/www/mp3/"+cawords[sentenceno].mp3;
		playAudio(mp3url);
	}
}

var tts = {
	init: function() {
		$("#ttstext").val('');
		top.spinner(0);
	},
	speak: function() {
		var text = $("#ttstext").val();
		ttsengine.speak(text);
	},
	speak2: function(text) {
		ttsengine.speak(text);
	}
}

var shadowing=false;
var shadow = {
	init: function() {
		top.spinner(0);
		$("#shadow").show();
		$("#shadow #recbtn").attr("disabled",false);
		// var ques = "This is Spotty. He's my dog. I like to hug him. Look at his eyes! They look sleepy. Look at his mouth! He is drooling. He looks silly. No, he is not silly. Look at his eyes and mouth. He is a silly dog. No, he is not silly. He is smart. He is a smart dog.";
		// var trans = "얘는 스포티야. 그는 내 개야. 나는 그를 안아주는걸 좋아해. Look at his eyes! They look sleepy. Look at his mouth! He is drooling. He looks silly. No, he is not silly. Look at his eyes and mouth. He is a silly dog. No, he is not silly. He is smart. He is a smart dog.";
		var ques = new Array("What does Mr. Brown look like?","He has long black hair and blue eyes.","What does your cousin look like?","She has short curly hair and blue eyes.","What does her friend look like?","She has long straight hair and green eyes.","What does your teacher look like?","He has a beard and a moustache.","What do you look like?","I have short black hair and black eyes.");
		var trans = new Array("브라운 씨는 어떻게 생겼니?","그는 긴 검은색 머리와 파란 눈을 가지고 있어.","너의 사촌은 어떻게 생겼니?","그녀는 짧은 곱슬머리와 파란 눈을 가지고 있어.","그녀의 친구는 어떻게 생겼니?","그녀는 긴 생머리와 초록색 눈을 가지고 있어.","너의 선생님은 어떻게 생겼니?","그는 턱수염과 콧수염이 있어.","너는 어떻게 생겼니?","나는 검은색 짧은 머리와 검은 눈을 가지고 있어.");
		sentences = new Array();

		$("#shadow #questiontxt").text('');
		for (var i=0; i<trans.length; i++) {
			$("#shadow #questiontxt").append(trans[i],"<br/>");
			sentences[i]={"sentence":ques[i],"trans":trans[i]};
		}

		

		// var sensplit = ques.split(/[.?!]/);
		// for (var i=0; i<sensplit.length-1; i++) {
		// 	console.log(sensplit[i]);
		// 	sentences[i]={"sentence":sensplit[i]};
		// }

		$("#shadowboard1").text(0);
		$("#shadowboard2").text(sentences.length);

		console.log(sentences);
		sentenceno=0;
		totalscore=0;
	},
	startStudy: function() {
		console.log(shadowing);
		if (shadowing) this.pause();
		else this.recognition();
	},
	next: function() {
		if (sentenceno<sentences.length-1) {
			sentenceno++;

			$("#shadowboard1").text(sentenceno);
			$("#shadowboard2").text(sentences.length-sentenceno);

			this.recognition();
		} else {
			console.log('end');
			this.end();
		}
	},
	pause: function() {
		console.log('pause');
		shadowing = false;
		voiceengine.stop();

		$("#shadow #recbtn").attr("disabled",false);
		$("#shadow #recbtn").text("Rec");
	},
	error: function(msg) {
		if (nowpage=='shadow') {
			console.log('error:'+msg);

			$("#shadow #recbtn").attr("disabled",false);
			$("#shadow #recbtn").text("Rec");
			// shadowing = false;
			// voiceengine.stop();
			// $("#shadow #recbtn").attr("disabled",false);
			// this.recognition();
		}
	},
	end: function() {
		shadowing = false;
		voiceengine.stop();
		$("#shadowboard1").text(sentences.length);
		$("#shadowboard2").text(0);

		$("#shadow #recbtn").attr("disabled",false);
		$("#shadow #recbtn").text("Rec");
	},
	recognition: function() {
		// $("#shadow #recbtn").attr("disabled",true);
		$("#shadow #recbtn").text("Stop");

		shadowing = true;

		var orgtxt = sentences[sentenceno].sentence;
		var transtxt = sentences[sentenceno].trans;
		
		$("#shadow #questiontxt").html($("#shadow #questiontxt").html().replace(transtxt, '<span style="color:#fff; font-weight:bolder">'+transtxt+'</span>'));

		voiceengine.start();
	},
	result: function(result) {
		//$("#speaking2 #recbtn").attr("disabled",false);
		//$("#speaking2 #nextbtn").attr("disabled",false);
		console.log(result);
		var score=-1;
        var checkScore=null;
        var final_script='';
        var orgtxt = sentences[sentenceno].sentence;
        var transtxt = sentences[sentenceno].trans;

        // for (var i=0; i<result.length; i++) {
        for (var i=0; i<result.length; i++) {
        	var check=checkSpeaking(result[i], orgtxt);
        	console.log(check);
        	if (check.score>score) {
        		score = check.score;
        		checkScore=check;
        		final_script = result[i];
        	}
    	}

		totalscore=totalscore+score;

		var avg = Math.ceil(totalscore/(sentenceno+1));
		$("#shadowboard3").text(avg);

		$("#shadow #questiontxt").html($("#shadow #questiontxt").html().replace('<span style="color:#fff; font-weight:bolder">'+transtxt+'</span>', checkScore.html));

		console.log('start');
		this.next();
		

		// $("#shadow #answertxt").html(checkScore.html+' ('+Math.ceil(score)+'점)');
	}
}

var sentencequiz = {
	sqoptions:[],
	selectcnt:0,
	init: function() {
		this.clear();
		sentences = new Array();

		sentences.push({"sentence":"{This} {is} {a} ball point pen.","transtxt":"이것은 볼펜이다."});
		sentences.push({"sentence":"{They} {are} {my} old friends.","transtxt":"그들은 나의 오랜 친구들이다."});
		sentences.push({"sentence":"{A} {fox} hunt {sheep}.","transtxt":"여우는 양들을 사냥한다."});
		sentences.push({"sentence":"{Children} don’t like to {brush} {teeth}.","transtxt":"아이들은 이 닦는 것을 싫어한다."});
		sentences.push({"sentence":"Put some {tomatoes} into {the} {boxes}.","transtxt":"약간의 토마토들을 그 상자들 안에 넣어라."});


		$("#sentencequiz .blackboardtxt").css("color","#79aae9");
		$("#sentencequiz #answertxt").css("color","#79aae9");

		top.spinner(0);

		this.startStudy();
	},
	startStudy: function() {
		//보기 초기화
		selectcnt=0;
		sqoptions = [];
		$("#sentencequiz #options").html('');
		$("#sentencequizresult").css("display","none");

		var nowno = sentenceno+1;
		$("#sentencequiz #labelsentences").text(nowno+" / "+sentences.length);
		
		var orgtxt=sentences[sentenceno].sentence;
		
		if (selbookid.substr(0,2)=='A-') {
			orgtxt = orgtxt.replace(/{A:}/g,'');
			orgtxt = orgtxt.replace(/{B:}/g,'');
			orgtxt = orgtxt.replace(/{C:}/g,'');
			orgtxt = orgtxt.replace(/{D:}/g,'');
			orgtxt = orgtxt.replace(/{E:}/g,'');
		}

		//보기 만들기
		var reg = /({\w*})/g;

		result = orgtxt.match(reg);

		// The matches are in elements 0 through n.
		for (var index = 0; index < result.length; index++)
		{
		    sqoptions.push(result[index].replace(/{/g,'').replace(/}/g,''));
		}

		shufflesqoptions = sqoptions.slice(0);

		for (var i=(shufflesqoptions.length-1); i>0; i--) {
			var rand = Math.floor(Math.random()*i);
			var change = shufflesqoptions[i];
			shufflesqoptions[i] = shufflesqoptions[rand];
			shufflesqoptions[rand] = change;
		}

		for (var i=0; i<shufflesqoptions.length; i++){
			$("#sentencequiz #options").append('<button class="btn btn-success" style="width:40%; margin-bottom:1%;" onclick="sentencequiz.select($(this));">'+shufflesqoptions[i]+'</button><br/>');
		}
		

		questxts[nowno-1] = orgtxt.replace(/({\w*})/g,'<span style="border-bottom:1px solid #fff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>');

		$("#sentencequiz .blackboardtxt").html(sentences[sentenceno].transtxt+'<br/><span class="sentencequiztxt">'+questxts[nowno-1]+'</span>');
	},
	next: function() {
		if (sentenceno<sentences.length-1) {
			sentenceno++;
			this.startStudy();
		} else {
			//study.sendResult('writing');
			this.clear();
			nowpage = 'cabinet';
			setPage('cabinet');
		}
	},
	clear: function() {
		sentenceno=0;
		resultsheet=new Array();
		totalscore=0;
		avg=0;
		questxts = new Array();
		sqoptions = [];
	},
	check: function() {
		//문장 확인
		var org = sentences[sentenceno].sentence.replace(/{/g,'').replace(/}/g,'');
		var answer = $(".sentencequiztxt").text();
		
		if (org==answer) {
			$("#sentencequizresult").attr("src","img/study/O.png");
		} else {
			$("#sentencequizresult").attr("src","img/study/X.png");
		}
		$("#sentencequizresult").css("display","block");

		// var score = study.checkSentences('', sentences[sentenceno].sentence);
		// totalscore=totalscore+score;

		// var orgtxt = sentences[sentenceno].sentence;
  //       if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
		// 	orgtxt = orgtxt.replace(/{/g,'');
		// 	orgtxt = orgtxt.replace(/}/g,'');
		// }

		// var result={"no":sentenceno+1,"question":sentences[sentenceno].transtxt,"answer":$("#writing #answertxt").val(),"rightanswer":orgtxt};
		// resultsheet.push(result);
	},
	select: function(obj) {
		obj.removeClass('btn-success');
		obj.attr('disabled',true);
		var html=$("#sentencequiz .blackboardtxt").html().replace('<span style="border-bottom:1px solid #fff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>','<span style="border-bottom:1px solid #fff">'+obj.text()+'</span>');
		$("#sentencequiz .blackboardtxt").html(html);
		selectcnt++;
		if (selectcnt==sqoptions.length) {
			this.check();
		}
	}
}

var canvas_width = parseInt($("#dictation .voicegraph").css("width"))
//console.log(canvas_width);
$("#speaking #canvas").attr("width",canvas_width);
$("#speaking #canvas2").attr("width",canvas_width);
//$("#speaking2 #canvas").attr("width",canvas_width);
$("#dictation #canvas").attr("width",canvas_width);
$("#speaking #canvas").attr("height",parseInt($("#dictation .voicegraph").css("height")));
$("#speaking #canvas2").attr("height",parseInt($("#dictation .voicegraph").css("height")));
//$("#speaking2 #canvas").attr("height",parseInt($("#dictation .voicegraph").css("height")));
$("#dictation #canvas").attr("height",parseInt($("#dictation .voicegraph").css("height")));
var canvas_height = parseInt($("#speaking #canvas").css("height"));
var ctx = null;
var prevvalue=canvas_height;
var x=0;
var recx=0;
var wavedata = "";
var gap=0;
var cnt=0;

function drawSpectrum(maxvalue, lineColor, timegap) {
	if (lineColor=='blue') {
		lineColor='rgba(0,0,255,.6)';
	} else {
		lineColor='rgba(255,0,0,.6)';
	}

	maxvalue=maxvalue*1.5;

	setTimeout(function(){
			//console.log(x+' '+maxvalue);
			if (nowpage=='speaking') {
				ctx = $("#speaking #canvas").get()[0].getContext("2d");
			}
			else if (nowpage=='speaking2') {
				//ctx = $("#speaking2 #canvas").get()[0].getContext("2d");
			} else {
				ctx = $("#dictation #canvas").get()[0].getContext("2d");
			}

			if (parseInt(x/gap)==15 && maxvalue<2) {}
			else {
				if (maxvalue>0) {
					ctx.beginPath();
					ctx.moveTo(x,prevvalue);
					ctx.lineTo(x+gap,canvas_height-maxvalue);
					ctx.lineTo(x+gap,canvas_height);
					ctx.lineTo(x,canvas_height);
					ctx.fillStyle=lineColor;
					// ctx.lineWidth = 3;
					ctx.fill();

					x=x+gap;	
				}	

				//console.log(prevvalue+' '+canvas_height);
			}
		
			prevvalue=canvas_height-maxvalue;
			cnt++;
			if (cnt<wavedata.length) drawSpectrum(wavedata[cnt], 'blue', timegap);	
			else {
				$("#speaking #canvas").css("visibility","visible");
				//$("#speaking2 #canvas").css("visibility","visible");
			}
	},timegap)
};

var recSpectrum = new Array();

function drawRecSpectrum() {
	//maxvalue=maxvalue*1.7;
	//console.log(gap*2+':'+maxvalue);
	if (nowpage=='speaking') {
		ctx = $("#speaking #canvas2").get()[0].getContext("2d");
	}
	else {
		ctx = $("#dictation #canvas").get()[0].getContext("2d");
	}

	for (var i=0; i<recSpectrum.length; i++) {
		maxvalue=recSpectrum[i]*1.2;

		//if (parseInt(recx/gap)==15 && maxvalue<20) {}
		if (parseInt(recx/gap)<15 && maxvalue<20) {}
		else {
			ctx.beginPath();
			ctx.moveTo(recx,prevvalue);
			ctx.lineTo(recx+gap,canvas_height-maxvalue);
			ctx.lineTo(recx+gap,canvas_height);
			ctx.lineTo(recx,canvas_height);
			ctx.fillStyle='rgba(255,0,0,.6)';
			// ctx.lineWidth = 3;
			ctx.fill();

			recx=recx+gap;

			prevvalue=canvas_height-maxvalue;
		}
		if (recx>=canvas_width) break;
	}

    $("#speaking #nextbtn").attr("disabled",false);
};

function inputRecSpectrum(maxvalue) {
	console.log(maxvalue);
	recSpectrum.push(maxvalue);
};

function clearCanvas() {
	ctx = $("#speaking #canvas").get()[0].getContext("2d");
    ctx.clearRect(0, 0, canvas_width+100, canvas_height+100);

    ctx = $("#speaking #canvas2").get()[0].getContext("2d");
    ctx.clearRect(0, 0, canvas_width+100, canvas_height+100);

	//ctx = $("#speaking2 #canvas").get()[0].getContext("2d");
    //ctx.clearRect(0, 0, canvas_width+100, canvas_height+100);

    ctx = $("#dictation #canvas").get()[0].getContext("2d");
    ctx.clearRect(0, 0, canvas_width+100, canvas_height+100);

    x = 0;
}

function clearCanvas2() {
	ctx = $("#speaking #canvas2").get()[0].getContext("2d");
    ctx.clearRect(0, 0, canvas_width+100, canvas_height+100);

    x=0;
}

	var checkwords = [
{"1":["amazed by", "surprised by"]},
{"2":["ago", "before"]},
{"3":["so as to", "in order to"]},
{"4":["be going to", "would", "will"]},
{"5":["plan to", "be planning to"]},
{"6":["was able to", "could"]},
{"7":["shop", "store"]},
{"8":["huge", "enormous"]},
{"9":["refuse", "reject"]},
{"10":["worry", "worry about", "care"]},
{"11":["idle", "lazy"]},
{"12":["marriage", "wedding"]},
{"13":["guard", "security guard"]},
{"14":["stair", "stairs"]},
{"15":["thank", "appreciate"]},
{"16":["employ", "hire"]},
{"17":["alter", "fix"]},
{"18":["bug", "insect"]},
{"19":["principal", "headmaster"]},
{"20":["army", "troop"]},
{"21":["cinema", "theater"]},
{"22":["blond", "blonde"]},
{"23":["ban", "forbid"]},
{"24":["grumpy", "upset"]},
{"25":["skill", "technology"]},
{"26":["cough", "sneeze"]},
{"27":["can", "tin"]},
{"28":["gum", "chewing gum"]},
{"29":["end", "finish"]},
{"30":["wood", "tree"]},
{"31":["bad", "horrible"]},
{"32":["appear", "show up"]},
{"33":["guy", "man"]},
{"34":["amaze", "surprise"]},
{"35":["amazing", "surprising", "incredible"]},
{"36":["bridge", "leg"]},
{"37":["close", "shut"]},
{"38":["college", "university"]},
{"39":["city", "town", "village"]},
{"40":["dolphin", "whale"]},
{"41":["rock", "stone"]},
{"42":["partner", "colleague"]},
{"43":["hear", "listen"]},
{"44":["smart", "clever"]},
{"45":["rod", "stick"]},
{"46":["a lot of", "lots of"]},
{"47":["say", "talk", "tell", "speak"]},
{"48":["tasty", "yummy"]},
{"49":["how old", "years old"]},
{"50":["scary", "frightening", "afraid"]},
{"51":["issue", "problem"]},
{"52":["crazy", "mad"]},
{"53":["wheat", "flour"]},
{"54":["foolish", "stupid"]},
{"55":["go out", "go outside"]},
{"56":["hospital", "clinic"]},
{"57":["look", "see", "take a look"]},
{"58":["jewel", "jewelry"]},
{"59":["boat", "ship", "ferry"]},
{"60":["wealthy", "rich"]},
{"61":["flight", "airplane"]},
{"62":["rapidly", "fast", "quick"]},
{"63":["quickly", "soon"]},
{"64":["take a picture", "take pictures"]},
{"65":["goods", "product"]},
{"66":["hurry up", "rush"]},
{"67":["sir", "teacher"]},
{"68":["wash the dishes", "do the dishes"]},
{"69":["speed", "pace"]},
{"70":["sofa", "couch"]},
{"71":["client", "customer"]},
{"72":["repair", "fix"]},
{"73":["swimming pool", "pool"]},
{"74":["skate", "ice-skate"]},
{"75":["hour", "time"]},
{"76":["loud", "noisy"]},
{"77":["attempt", "try"]},
{"78":["begin", "start"]},
{"79":["exam", "test"]},
{"80":["dining room", "restaurant"]},
{"81":["lab", "laboratory"]},
{"82":["cymbal", "cymbals"]},
{"83":["take out the garbage", "take out the"]},
{"84":["garbage can", "wastebasket", "trash"]},
{"85":["down", "below", "under"]},
{"86":["dad", "father"]},
{"87":["child", "kid"]},
{"88":["ill", "sick"]},
{"89":["alligator", "crocodile"]},
{"90":["hello", "hi"]},
{"91":["sit", "sit down"]},
{"92":["pill", "medicine"]},
{"93":["drugstore", "pharmacy"]},
{"94":["Father's day", "Parents' day"]},
{"95":["mom", "mommy", "mother"]},
{"96":["pimple", "zit"]},
{"97":["baggage", "suitcase"]},
{"98":["movie theater", "theater", "cinema"]},
{"99":["cottage", "hut"]},
{"100":["Olympic", "Olympics"]},
{"101":["right", "correct"]},
{"102":["mailman", "mail carrier"]},
{"103":["fortunate", "lucky"]},
{"104":["famous", "popular"]},
{"105":["name", "first name"]},
{"106":["yet", "already"]},
{"107":["get up", "stand up"]},
{"108":["assign", "appoint"]},
{"109":["cut", "chop"]},
{"110":["bicycle", "bike"]},
{"111":["cycle", "ride a bicycle"]},
{"112":["small", "tiny"]},
{"113":["dinner", "supper"]},
{"114":["plate", "dish"]},
{"115":["provide", "furnish"]},
{"116":["proposal", "offer"]},
{"117":["examine", "investigate"]},
{"118":["fine", "good", "nice"]},
{"119":["get ready", "prepare"]},
{"120":["reduce", "cut down"]},
{"121":["past", "last"]},
{"122":["terrible", "awful"]},
{"123":["apply", "supply"]},
{"124":["home", "house"]},
{"125":["focus", "concentrate"]},
{"126":["vehicle", "tea", "car"]},
{"127":["bookcase", "bookshelf"]},
{"128":["teen", "teenager"]},
{"129":["gym", "fitness center"]},
{"130":["celebrate", "congratulate"]},
{"131":["sufficient", "enough"]},
{"132":["clear", "put away"]},
{"133":["carpet", "rug"]},
{"134":["Coke", "coke"]},
{"135":["soy", "bean"]},
{"136":["soda", "soda pop"]},
{"137":["frame", "photo frame"]},
{"138":["ordinary", "normal"]},
{"139":["author", "writer"]},
{"140":["a", "one"]},
{"141":["hike", "go hiking"]},
{"142":["grandpa", "grandfather"]},
{"143":["aircraft", "airplane"]},
{"144":["all the time", "always"]},
{"145":["abroad", "overseas"]},
{"146":["deed", "behavior"]},
{"147":["allow", "give permission"]},
{"148":["chopper", "helicopter"]},
{"149":["work out", "exercise"]},
{"150":["at the moment", "current"]},
{"151":["anger", "temper"]},
{"152":["toilet", "restroom", "washroom"]},
{"153":["certain", "sure"]},
{"154":["wonderful", "great"]},
{"155":["cell phone", "cellphone"]},
{"156":["intermission", "break"]},
{"157":["amused", "be interested"]}
];

function synCheckWods(ques, checkspell) {
	var wcnt = checkwords.length;
	var checkno=0;

	for (var i=0;i<wcnt; i++) {
		var wgroupcnt = checkwords[i][i+1].length;
		var checkgroup=false;
		for (var j=0; j<wgroupcnt; j++){
			var spell = checkwords[i][i+1][j];

			if (spell==ques) {
				checkgroup=true;
				break;
			}
		}

		if (checkgroup) {
			checkno=i;
			break;
		}
	}

	for (var i=0; i<checkwords[checkno][checkno+1].length; i++) {
		var spell = checkwords[checkno][checkno+1][i];

		if (spell==checkspell) {
			return false;
		}
	}

	return true;
}

function getCursorPos(input) {
    if ("selectionStart" in input && document.activeElement == input) {
        return {
            start: input.selectionStart,
            end: input.selectionEnd
        };
    }
    else if (input.createTextRange) {
        var sel = document.selection.createRange();
        if (sel.parentElement() === input) {
            var rng = input.createTextRange();
            rng.moveToBookmark(sel.getBookmark());
            for (var len = 0;
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                len++;
            }
            rng.setEndPoint("StartToStart", input.createTextRange());
            for (var pos = { start: 0, end: len };
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                pos.start++;
                pos.end++;
            }
            return pos;
        }
    }
    return -1;
}

function initKeyBoard() {
	//KeyBoardInfo.isSoft();
	$("#"+nowpage+" #answertxt").removeClass("disabled_keyboard");

	if (!!isSoftkey) {
		if (nowpage=='writing' || nowpage=='dictation' || (nowpage=='popquiz' && sentenceno>0)) {
			$("#keyboard").show();
			setCursorPos($("#"+nowpage+" #answertxt")[0], 0, 1);
			if (nowpage=='popquiz') {
				$("#popquiz #dicvocaimg").css("display","block");
				$("#popquiz #nextbtntop").css("display","block");
				//파닉스는 화이트보드
				if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
					$("#popquiz #answertxt").css("color","#000");
					$("#popquiz .blackboardtxt").css("color","#000");
					$("#popquiz #questiontxt").css("color","#000");
				} else {
					$("#popquiz #answertxt").css("color","#fff");
					$("#popquiz .blackboardtxt").css("color","#fff");
					$("#popquiz #questiontxt").css("color","#fff");
				}
			}
		}
		else {
			$("#keyboard").hide();
			if (nowpage=='writing') $("#"+nowpage+" #answertxt").addClass("disabled_keyboard");
			if (nowpage=='popquiz') {
				$("#popquiz #dicvocaimg").css("display","none");
				$("#popquiz #nextbtntop").css("display","none");
				//파닉스는 화이트보드
				if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
					$("#popquiz #answertxt").css("color","#000");
					$("#popquiz .blackboardtxt").css("color","#000");
					$("#popquiz #questiontxt").css("color","#000");
				} else {
					$("#popquiz #answertxt").css("color","#fff");
					$("#popquiz .blackboardtxt").css("color","#fff");
					$("#popquiz #questiontxt").css("color","#000");
				}
			}
		}
	} else {
		$("#keyboard").hide();
		if (nowpage=='writing') $("#"+nowpage+" #answertxt").addClass("disabled_keyboard");
		if (nowpage=='popquiz') {
			$("#popquiz #dicvocaimg").css("display","none");
			$("#popquiz #nextbtntop").css("display","none");
			//파닉스는 화이트보드
			if (selbookid=='K-3' || selbookid=='K-4' || selbookid=='K-5' || selbookid=='K-6' || selbookid=='L-12') {
				$("#popquiz #answertxt").css("color","#000");
				$("#popquiz .blackboardtxt").css("color","#000");
				$("#popquiz #questiontxt").css("color","#000");
			} else {
				$("#popquiz #answertxt").css("color","#fff");
				$("#popquiz .blackboardtxt").css("color","#fff");
				$("#popquiz #questiontxt").css("color","#000");
			}
		}
	}
}

function setCursorPos(input, start, end) {
	if (start==undefined) {
		start=0;
		end=1;
		charpos=0;
	}
	input.setSelectionRange(start, end);
	// if (arguments.length < 3) end = start;
	// if ("selectionStart" in input) {
	// 	setTimeout(function() {
	// 		input.selectionStart = start;
	// 		input.selectionEnd = end;
	// 	}, 1);
	// }
	// else if (input.createTextRange) {
	// 	var rng = input.createTextRange();
	// 	rng.moveStart("character", start);
	// 	rng.collapse();
	// 	rng.moveEnd("character", end - start);
	// 	rng.select();
	// 	alert('select');
	// }
}

//이미지 프리로드	
$.fn.preload = function() {
	this.each(function(){
		$('<img/>')[0].src = this;
	});
}

function mp3Start() {
	if (nowpage=='dictation') dictation.mp3Start();
	else if (nowpage=='speaking') speaking.mp3Start();
}

function mp3Done() {
	if (nowpage=='dictation') dictation.mp3Done();
	else if (nowpage=='speaking') speaking.mp3Done();
}