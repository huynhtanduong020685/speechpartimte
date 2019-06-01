$('#trophy_page').carousel({
    interval: false,
    touch: true
});

$('#trophy_page').on('slid.bs.carousel', function () {
    currentIndex = $('div.active').index();
    var url = location.href;
    location.href = "#"+currentIndex;  
})

function initTrophy() {
	$.ajax({
		type: 'GET',
		url: top.getServer()+"/engtrain/getusertrophy/"+window.localStorage.getItem('ls_userid'),
		//url: top.getServer()+"/engtrain/getusertrophy/1",
		dataType: "json",	
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			var html="";	
			var cnt=0;

			var pagecnt = parseInt((data.length+1)/10)+1;
			var indihtml = "";
			for (var i=0; i<pagecnt; i++) {
				if (i==0) indihtml=indihtml+'<li class="active" data-target="#trophy_page" data-slide-to="'+i+'"></li>';
				else indihtml=indihtml+'<li data-target="#trophy_page" data-slide-to="'+i+'"></li>';
			}

			$("#trophy_page #indi").html(indihtml);

			for (var i=0; i<data.length; i++) {
				cnt++;
				var usecheck = data[i].usecheck;
				var msg = data[i].message.replace(/\'/gi,"\\\'");
				var usedisplay="none;"
				if (usecheck==1) usedisplay="block";
				
				if (i==0) {
					html=html+'<div class="item item_page col-xs-12 col-sm-12 col-md-12 col-lg-12 active">';
				} else if (i%10==0) {
					html=html+'<div class="item item_page col-xs-12 col-sm-12 col-md-12 col-lg-12">';
				}

				if (i%5==0) {
					html=html+'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><p style="position:relative; width:100%;"><img id="item_bar01" src="img/trophy/shelf.png" style="width:100%; position:absolute;"></p><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">&nbsp;</div>';
				}

				html=html+'<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 trophy_icon" onclick="Toast.show(\''+msg+'\');"><img src="img/trophy/trophy'+data[i].trtype+'.png" width="100%"><img src="img/trophy/used.png" style="position:absolute; top:25%; left:25%; width:50%; display:'+usedisplay+'"/></div>';

				if (i%10==9 && i>0) {
					html=html+'</div></div>';
					cnt=0;
				} else if (i%5==4 && i>0) {
					html=html+'</div><p class="col-xs-12 col-sm-12 col-md-12 col-lg-12 trophyspacing">&nbsp;</p>';''
				}
			}

			if (cnt>0 && cnt<=5) {
				html=html+'</div><p class="col-xs-12 col-sm-12 col-md-12 col-lg-12 trophyspacing">&nbsp;</p><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><p style="position:relative; width:100%;"><img id="item_bar01" src="img/trophy/shelf.png" style="width:100%; position:absolute;"></p><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">&nbsp;</div></div></div>';
			} else if (cnt>5) {
				html=html+'</div></div>';
			}


			if (data.length>0) $("#trophy_page #inner_page").html(html);

			$(".trophyspacing").css("height",(winHeight*.13)+"px");
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus);
		}
	});
}