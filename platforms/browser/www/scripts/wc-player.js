var player;
var progressbar;
var playKnop;
var pauseKnop;

/* window.onload = function(){
		setTimeout(function () {
			alert("timeout over");
			player= document.getElementById('player');
			alert("player ingeladen");
			progressbar = document.getElementById('seekbar');
			alert("balk ingeladen");
			tijdIndicatie = document.getElementById('tijdindicatie');
			alert("tijdIndicatie ingeladen");
			totaalTijd = document.getElementById('totaaltijd');
			alert("totaalTijd ingeladen");
			playKnop = document.getElementById('playKnop');
			alert("play ingeladen");
			pauseKnop = document.getElementById('pauseKnop');
			alert("pause ingeladen");			
			
			progressbar.addEventListener("click", zoek);
			pauseKnop.style.display='none';	
			alert("player loaded");
	   }, 500); 
	} */

		setTimeout(function () {
			player= document.getElementById('player');
			progressbar = document.getElementById('seekbar');
			tijdIndicatie = document.getElementById('tijdindicatie');
			totaalTijd = document.getElementById('totaaltijd');
			playKnop = document.getElementById('playKnop');
			pauseKnop = document.getElementById('pauseKnop');	
			
			progressbar.addEventListener("click", zoek);
			pauseKnop.style.display='none';	
	   }, 10); 

	
	
	function playMusic()
	{
		player.play();
		playKnop.style.display='none';
		pauseKnop.style.display='inline';
	}
	function pauseMusic()
	{
		player.pause();
		pauseKnop.style.display='none';
		playKnop.style.display='inline';
	}
	function stopMusic()
	{
		player.pause();
		player.currentTime = 0;
		pauseKnop.style.display='none';
		playKnop.style.display='inline';
	}
	function zoek(e) 
	{
		var percent = e.offsetX / this.offsetWidth;
		player.currentTime = percent * player.duration;
		progressbar.value = percent / 100;
	}
	function udpateProgress() 
	{				
		progressbar.value = (player .currentTime / player .duration);
		if (progressbar.value == 1){pauseKnop.style.display='none'; playKnop.style.display='inline';};
		var NUTIJD = new Date(null);
			NUTIJD.setSeconds(player.currentTime); 
		var telangetijd = NUTIJD.toISOString().substr(11, 8);
		tijdIndicatie.innerHTML = telangetijd.substr(telangetijd.length - 5);
		
		var TOTAALETIJD = new Date(null);
			TOTAALETIJD.setSeconds (player.duration);
		var langeTotaalTijd = TOTAALETIJD.toISOString().substr(11, 8);
		totaalTijd.innerHTML = langeTotaalTijd.substr(telangetijd.length - 5);
	}

