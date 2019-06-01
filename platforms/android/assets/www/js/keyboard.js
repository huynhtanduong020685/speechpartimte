var shifton = "off";
var charpos=0;

var keyboard = {
	keyset: {"line1":["1","2","3","4","5","6","7","8","9","0"],"line2":["q","w","e","r","t","y","u","i","o","p"],"line3":["a","s","d","f","g","h","j","k","l"],"line4":["shift","z","x","c","v","b","n","m","back"],"line5":["?","!","'","space",",",".","enter"]},
	keysetshift: {"line1":["1","2","3","4","5","6","7","8","9","0"],"line2":["Q","W","E","R","T","Y","U","I","O","P"],"line3":["A","S","D","F","G","H","J","K","L"],"line4":["shift","Z","X","C","V","B","N","M","back"],"line5":["?","!","'","space",",",".","enter"]},
	init: function() {
		var html = '<div style="background-color:#f5f5f5; width:100%">&nbsp;</div><div style="margin:1% 0;">';
		var keycss = "btn-lg";
		if (winHeight<500) {
			keycss = "btn-xs";
		}

		for (var i=1; i<=5; i++) {
			if (shifton=="on") var ks = this.keysetshift["line"+i];
			else var ks = this.keyset["line"+i];

			if (i==1) {
				var keygray="_gray";
			}
			else {
				var keygray="";
			}
			for (var j=0; j<ks.length; j++) {
				html=html+'<button class="'+keycss+' keybtn'+keygray+'" id="softkey_'+ks[j]+'">'+ks[j]+'</button>';
			}
			html=html+'<br/>';
		}
		$("#keyboard").html(html+"</div>");

		$(".keybtn").click(function() {
			//console.log(this.id);
			var clickkey = this.id.replace("softkey_","");

			if (clickkey=='shift') {
				keyboard.shift();
			} else {
				if (nowpage=='writing') {
					writing.keyPadClick(clickkey);
				} else if (nowpage=='dictation') {
					dictation.keyPadClick(clickkey);
				} else if (nowpage=='popquiz') {
					popquiz.keyPadClick(clickkey);
				}

				if (shifton=='on') {
					keyboard.shift();
				}
			}
		});

		$(".keybtn_gray").click(function() {
			//console.log(this.id);
			var clickkey = this.id.replace("softkey_","");
			
			if (nowpage=='writing') {
				writing.keyPadClick(clickkey);
			} else if (nowpage=='dictation') {
				dictation.keyPadClick(clickkey);
			} else if (nowpage=='popquiz') {
				popquiz.keyPadClick(clickkey);
			}
		});
	},
	shift: function() {
		if (shifton=="off") {
			shifton = "on";
			this.init();
		} else if (shifton=="on") {
			shifton = "off";
			this.init();
		}
	}
}