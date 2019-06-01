// JavaScript Document
function getScore(kind, answer, rightanswer) {
	//알파벳
	if (kind=='alphabet') {
		return checkAlphabet(answer, rightanswer);
	}	
	//파닉스
	var regex = /\s+/gi;
	if (kind=='speaking' && rightanswer.trim().replace(regex, ' ').split(' ').length==1) {
		//console.log('pho');
		return checkPhonics(answer, rightanswer);
	}
	//말하기
	if (kind=='speaking') {
		return checkSpeaking(answer, rightanswer);
	}	
}

function checkAlphabet(user, org) {
	var orgdim = org.split("");
	
	//user 변환
	user=user.replace(/capital/gi,"");
	user=user.replace(/capitol/gi,"");
	user=user.replace(/cap/gi,"");
	user=user.replace(/smallletter/gi,"");
	user=user.replace(/Small/gi,"");
	user=user.replace(/letter/gi,"");
	var userdim = user.replace(/ /g,"").split("");
	
	var checkdim = new Array();
	var offset=0;
	
	var rightwordcnt=0;
	var html="";
	
	for (var i=0; i<orgdim.length; i++) {
		var org1 = orgdim[i];		
		var checkword=false;		
		
		for (var j=offset; j<userdim.length; j++) {
			var user1 = userdim[j];
			
			if (user1==undefined) user1='';
	
			org1 = org1.replace(/[^a-zA-Z0-9 ]/g,"");
			user1 = user1.replace(/[^a-zA-Z0-9 ]/g,"");
			
			org1 = org1.toLowerCase();
			user1 = user1.toLowerCase();
			
			if (user1.indexOf(org1)>=0) {	
				offset=j+1;
				checkword=true;				
				break;
			}
		}
		
		checkdim[i]=checkword;
		
		if (checkword) {
			html = html+"<span style='color:blue'>"+orgdim[i]+"</span>";
			rightwordcnt++;
		}
		else {
			if (org1=='e') {
				html = html+"<span style='color:orange'>"+orgdim[i]+"</span>";
				rightwordcnt=rightwordcnt+.6;
			} else {
				html = html+"<span style='color:red'>"+orgdim[i]+"</span>";
				rightwordcnt=rightwordcnt+.5;
			}
		}
		////console.log(i+':'+checkword);
	}
	
	var score = (rightwordcnt/orgdim.length)*100;
	
	return {"html":html,"score":score};
	
}

var covorg = new Array(
	"It is not","It's not","It isn't","It isnt"
	,"it is not","it's not","it isn't","it isnt"
	,"There is not","There's not","There isn't","There isnt"
	,"there is not","there's not","there isn't","there isnt"
	,"He is not","He's not","He isn't","He isnt"
	,"he is not","he's not","he isn't","he isnt"
	,"She is not","She's not","She isn't","She isnt"
	,"she is not","she's not","she isn't","she isnt"
	,"That is not","That's not","That isn't","That isnt"
	,"that is not","that's not","that isn't","that isnt"
	,"I am\\.","It is\\.","You are\\.","That is\\.","She is\\.","He is\\.","We are\\.","They are\\.","There is\\."
	,"i am\\.","it is\\.","you are\\.","that is\\.","she is\\.","he is\\.","we are\\.","they are\\.","there is\\."
	,"were not ","was not ","did not ","do not ","does not ","is not ","could not ","would not ","should not ","have not ","has not "
	,"could have ","would have ","must not "
	,"I am ","It is ","You are ","Your ","What is ","That is ","Is not ","Who is ","She is ","He is ","Am i ","Are not ","We are "
	,"i am ","it is ","you are ","your ","what is ","that is ","is not ","who is ","she is ","he is ","am i ","are not ","we are "	
	,"They are ", "Is not ", "There is ","Where is ","How is ","When is ","Why is "	
	,"they are ", "is not ", "there is ","where is ","how is ","when is ","why is "	
	//,"I am","It is","You are","That is","She is","He is","We are","They are","There is"
	,"I will ","You will ","He will ","She will ","They will ","We will ","It will ","Will not "
	,"i will ","you will ","he will ","she will ","they will ","we will ","it will ","will not "
	,"I have ","You have ","He have ","She have ","They have ","We have ","It have "
	,"i have ","you have ","he have ","she have ","they have ","we have ","it have "
	,"He has ","She has "
	,"he has ","she has "
	,"I would ","You would ","He would ","She would ","They would ","We would ","It would "
	,"i would ","you would ","he would ","she would ","they would ","we would ","it would "
	,"1st","2nd","3rd"
	,"cell phone","fire fighter","a clock","milk shake","a lot","ice skate","roller coaster"
	,"hair stylists","hot dog","home run","lunch box","high school","weather girl","one way"
	,"Jay Z","fortune tellers","air base","anti smoking","ball park","push ups","sit ups"
	,"round trip","short sleeved","hair pins","re open","rain forest","hip hop"
	,"roller blades","ice-skate"
	,"seven twenty","six fifteen","eleven twenty five","three thirty five"
	,"one hundred","forty five","fifty three","fifty two"
	,"forty","sixty"
	,"ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"
	,"one","two","three","four","five","six","seven","eight","nine"
	);
var covcheck = new Array(
	"{It:isn:t}","{It:isn~t}","{It:isn!t}","{It:isn_t}"
	,"{it:isn:t}","{it:isn~t}","{it:isn!t}","{it:isn_t}"
	,"{There:isn:t}","{There:isn~t}","{There:isn!t}","{There:isn_t}"
	,"{there:isn:t}","{there:isn~t}","{there:isn!t}","{there:isn_t}"
	,"{He:isn:t}","{He:isn~t}","{He:isn!t}","{He:isn_t}"
	,"{he:isn:t}","{he:isn~t}","{he:isn!t}","{he:isn_t}"
	,"{She:isn:t}","{She:isn~t}","{She:isn!t}","{She:isn_t}"
	,"{she:isn:t}","{she:isn~t}","{she:isn!t}","{she:isn_t}"
	,"{That:isn:t}","{That:isn~t}","{That:isn!t}","{That:isn_t}"
	,"{that:isn:t}","{that:isn~t}","{that:isn!t}","{that:isn_t}"
	,"{I:m}.","{It:s}.","{You:re}.","{That:s}.","{She:s}.","{He:s}.","{We:re}.","{They:re}.","{There:s}."
	,"{i:m}.","{it:s}.","{you:re}.","{that:s}.","{she:s}.","{he:s}.","{we:re}.","{they:re}.","{there:s}."
	,"{weren:t} ","{wasn:t} ","{didn:t} ","{don:t} ","{doesn:t} ","{isn:t} ","{couldn:t} ","{wouldn:t} ","{shouldn:t} ","{haven:t} ","{hasn:t} "
	,"{could:ve} ","{would:ve} ","{mustn:t} "
	,"{I:m} ","{It:s} ","{You:re} ","{You~re} ","{What:s} ","{That:s} ","{Isn:t} ","{Who:s} ","{She:s} ","{He:s} ","{M:i} ","{Aren:t} ","{We:re} "
	,"{I:m} ","{it:s} ","{you:re} ","{you~re} ","{what:s} ","{that:s} ","{isn:t} ","{who:s} ","{she:s} ","{he:s} ","{m:i} ","{aren:t} ","{we:re} "	
	,"{They:re} ", "{Isn:t} ", "{There:s} ","{Where:s} ","{How:s} ","{When:s} ","{Why:s} "
	,"{they:re} ", "{isn:t} ", "{there:s} ","{where:s} ","{how:s} ","{when:s} ","{why:s} "
	//,"{I:m}","{it:s}","{you:re}","{that:s}","{she:s}","{he:s}","{we:re}","{they:re}","{there:s}"
	,"{I:ll} ","{You:ll} ","{He:ll} ","{She:ll} ","{They:ll} ","{We:ll} ","{It:ll} ","{Won:t} "
	,"{i:ll} ","{you:ll} ","{he:ll} ","{she:ll} ","{they:ll} ","{we:ll} ","{it:ll} ","{won:t} "
	,"{I:ve} ","{You:ve} ","{He:ve} ","{She:ve} ","{They:ve} ","{We:ve} ","{It:ve} "
	,"{i:ve} ","{you:ve} ","{he:ve} ","{she:ve} ","{they:ve} ","{we:ve} ","{it:ve} "
	,"{He~s} ","{She~s} "
	,"{he~s} ","{she~s} "
	,"{I:d} ","{You:d} ","{He:d} ","{She:d} ","{They:d} ","{We:d} ","{It:d} "
	,"{i:d} ","{you:d} ","{he:d} ","{she:d} ","{they:d} ","{we:d} ","{it:d} "
	,"{first:}","{second:}","{third:}"
	,"{cellphone}","{firefighter}","{o:clock}","{milkshake}","{alot}","{iceskate}","rollercoaster"
	,"{hairstylists}","{hotdog}","{homerun}","{lunchbox}","{highschool}","{weathergirl}","{one-way}"
	,"{Jay-Z}","{fortunetellers}","{airbase}","{antismoking}","{ballpark}","{push-ups}","{sit-ups}"
	,"{round-trip}","{short-sleeved}","{hairpins}","{reopen}","{rainforest}","{hiphop}"
	,"{rollerblades}","{iceskate}"
	,"{720:}","{615:}","{1125:}","{335:}"
	,"{100:}","{45:}","{53:}","{52:}"
	,"{40:}","{60:}"
	,"{10:}","{11:}","{12:}","{13:}","{14:}","{15:}","{16:}","{17:}","{18:}","{19:}","{20:}"
	,"{1:}","{2:}","{3:}","{4:}","{5:}","{6:}","{7:}","{8:}","{9:}"
	);

var covorgword = new Array(
	"their","there","those","dosar","pens","nyan","hello","jenny","eraser","cold","pear","don't","ax","chug","GOG","sit"
	,"tiger","zero","sink","cent","pond","kick","meat","glue","say","Phillip","see","sea","poi","wrap","knight"
	,"whose","you","and","hes","Thai","Pi","die","moustache","be","gimbap","Jay","Ireland"
	,"Incheon","Mrs","Jays","too","Jim","Sarah","Zero","ink"
	);
var covcheckword = new Array(
	"theyre","theyre","does","does","pence","9","hi","jennie","racer","chord","pair","don","x","jug","jug","st"
	,"tyga","0","sync","sent","pwned","kik","meet","gluu","se","philip","c","c","tie","rap","night"
	,"whos","u","n","his","tie","tie","tie","mustache","b","kimbap","J","island"
	,"inchon","misses","js","to","gym","sara","0","pink"
	);

var alwaysright = new Array("Minsu","Kyungki","Jisu","3030","Kwangju","Hanbok","Namsan","Zulu");

function convertCheckMode(sentence) {
	for (var i=0; i<covorg.length; i++) {
		var reg = new RegExp(covorg[i],"g");
		sentence = sentence.replace(reg,covcheck[i]);
	}

	//console.log(sentence);
	
	return sentence;
}

function convertOrgMode(sentence) {
	for (var i=0; i<covcheck.length; i++) {
		var reg = new RegExp(covcheck[i].trim(),"g");
		sentence = sentence.replace(reg,covorg[i]);
	}

	sentence = sentence.replace(/\\/gi,"");
//console.log(sentence);
	return sentence;
}

function convertCheckModeWord(word) {
	for (var i=0; i<covorgword.length; i++) {
		var reg = new RegExp(covorgword[i],"gi");
		word = word.replace(reg,covcheckword[i]);
	}

	//console.log(sentence);
	
	return word;
}

function convertOrgModeWord(word) {
	for (var i=0; i<covcheckword.length; i++) {
		var reg = new RegExp(covcheckword[i],"gi");
		word = word.replace(reg,covorgword[i]);
	}
	
	return sentence;
}

function checkAlwaysRight(word) {
	for (var i=0; i<alwaysright.length; i++) {
		if (word.toLowerCase()==alwaysright[i].toLowerCase()) return true;
	}
	return false;
}

function checkSpeaking(user, org) {
	//org = org.toLowerCase();
	//user = user.toLowerCase();

	org = convertCheckMode(org);
	user = convertCheckMode(user);

	var orgdim = org.split(" ");
	var userdim = user.split(" ");
	
	var checkdim = new Array();
	var offset=0;
	
	var checkwords=new Array();
	var html="";
	var rightwordcnt=0;
	
	for (var i=0; i<orgdim.length; i++) {
		var org1 = orgdim[i];		
		var checkword=false;
		checkwords[i]=0;
		
		for (var j=offset; j<userdim.length; j++) {
			var user1 = userdim[j];
			
			if (user1==undefined) user1='';
			
			org1 = org1.toLowerCase();
			user1 = user1.toLowerCase();
			
			org1 = org1.replace(/[^a-zA-Z0-9 ]/g,"");
			user1 = user1.replace(/[^a-zA-Z0-9 ]/g,"");
			//console.log(org1+' '+user1);


			if (convertCheckModeWord(org1)==convertCheckModeWord(user1) || checkAlwaysRight(org1)) {				
				offset=j+1;
				checkwords[i] = 1;
				break;
			} else {
				//동일 단어가 아닌 경우 스펠링 확인
				var rightspellcnt=0;
				for(var sorg=0; sorg<org1.length; sorg++) {
					//console.log(org1.substr(sorg,1)+' : '+user1.substr(sorg,1));
					if (org1.substr(sorg,1)==user1.substr(sorg,1)) {
						rightspellcnt++;
					}
				}
				var spellscore = rightspellcnt/org1.length;
				if (checkwords[i]<spellscore) checkwords[i] = spellscore;
				//console.log(rightspellcnt+' '+spellscore);
			}
		}		
		
		//console.log(i+':'+checkwords[i]);
		
		var orgsentence = convertOrgMode(orgdim[i]);
		
		if (checkwords[i]==1) {
			html = html+" <span style='color:blue'>"+orgsentence+"</span>";
			rightwordcnt++;
		}
		else {
			if (checkwords[i]==0) {
				html = html+" <span style='color:red'>"+orgsentence+"</span>";
			} else {
				html = html+" <span style='color:orange'>"+orgsentence+"</span>";
				rightwordcnt=rightwordcnt+checkwords[i];
			}
		}
	}
	
	var score = (rightwordcnt/orgdim.length)*100;
	
	return {"html":html,"score":score};
}

function checkPhonics(user, org) {
	var orgdim = org.split(" ");
	var userdim = user.split(" ");
	
	var checkdim = new Array();
	var offset=0;
	
	var checkwords=new Array();
	var html="";

	var score=0;
	var maxscore=0;
	
	for (var i=0; i<orgdim.length; i++) {
		var org1 = orgdim[i];		
		var checkword=false;
		checkwords[i]=0;
		
		for (var j=offset; j<userdim.length; j++) {
			score=0;
			var user1 = userdim[j];			
			if (user1==undefined) user1='';
			
			org1 = org1.toLowerCase();
			user1 = user1.toLowerCase();
			
			org1 = org1.replace(/[^a-zA-Z0-9 ]/g,"");
			user1 = user1.replace(/[^a-zA-Z0-9 ]/g,"");
			//console.log(convertCheckModeWord(org1)+' : '+convertCheckModeWord(user1));
			if (convertCheckModeWord(org1)==convertCheckModeWord(user1)) {				
				offset=j+1;
				checkwords[i] = 1;
				maxscore=100;
				break;
			} else {
				//동일 단어가 아닌 경우 스펠링 확인
				var rightspellcnt=0;
				for(var sorg=0; sorg<org1.length; sorg++) {
					//console.log(org1.substr(sorg,1)+' : '+user1.substr(sorg,1));
					if (org1.substr(sorg,1)==user1.substr(sorg,1)) {
						rightspellcnt++;
					}
				}
				var spellscore = rightspellcnt/org1.length;
				if (checkwords[i]<spellscore) checkwords[i] = spellscore;
				//console.log(rightspellcnt+' '+spellscore);
	
				if (rightspellcnt>0) {
					score=score+((rightspellcnt-1)/(org1.length-1))*50;
					if (score<=50) score=score+50;
				}
			}

			if (maxscore<score) maxscore=score;
			//console.log(score);
		}	

		

		//console.log(i+':'+checkwords[i]);
		
		var orgsentence = orgdim[i];
		
		if (checkwords[i]==1) {
			html = html+" <span style='color:blue'>"+orgsentence+"</span>";
		}
		else {
			if (checkwords[i]==0) {
				html = html+" <span style='color:red'>"+orgsentence+"</span>";
			} else {
				html = html+" <span style='color:orange'>"+orgsentence+"</span>";
			}
		}
	}
	
	return {"html":html,"score":maxscore};
}