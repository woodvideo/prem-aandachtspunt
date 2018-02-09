var globals = {};
globals.assetSubDir = "muziek";
globals.muziekServer = "http://www.woodvideo.nl/aandachtspuntaudio/";
globals.activeTrack = "";
globals.progressbar = "";

document.addEventListener("deviceready", init, false);
function init() {	
	getAssets();
	
$(document).on("pageshow", "#bodyscan-lang", function() { 
	downladOfnie ('bodyscan-lang');
});

$(document).on("pageshow", "#bodyscan-kort", function() { 
	downladOfnie ('bodyscan-kort');
	
	$("#flip").on("change", function(e){
   var newValue = $("#flag").val();
  if(newValue == "ja"){
     console.log('WE GAAN DOWNLAODEN');
  } else {
     console.log('WE GAAN WISSEN');
  }
	});
	
});

$(document).on("pageshow", "#zitmeditatie-lang", function() { 
	downladOfnie ('zitmeditatie-lang');
});


$(document).on("pageshow", "#zitmeditatie-kort", function() { 
	downladOfnie ('zitmeditatie-kort');
});

$(document).on("pageshow", "#veiligeplek", function() { 
	downladOfnie ('veiligeplek');
});

$(document).on("pageshow", "#compassionelevriend", function() { 
	downladOfnie ('compassionelevriend');
});

$(document).on("pageshow", "#ademruimtemetvriedelijkheid", function() { 
	downladOfnie ('ademruimtemetvriedelijkheid');
});

$(document).on("pageshow", "#ademoefening", function() { 
	downladOfnie ('ademoefening');
});

}



function fsError(e) {
	//Something went wrong with the file system. Keep it simple for the end user.
	console.log("FS Error", e);
	navigator.notification.alert("Sorry, er ging iets mis", null,"Error");
}


function getAssets() {
	var dirEntry = window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
		console.log("Hoofdmap geladen:",dir);
		dir.getDirectory(globals.assetSubDir+"/", {create:true}, function(aDir) {
			console.log("Submap geladen:", aDir);	
			globals.assetDirectory = aDir;			
		}, fsError);		
	}, fsError);
}



//DOWNLADEN EN VERWIJDEREN

function wegHalen(delFile){
var path = cordova.file.dataDirectory + 'muziek/';
var filename = 'ap-' + delFile +'.mp3';

console.log("gaat "+ path + filename+ " weghalen");

window.resolveLocalFileSystemURL(path, function(dir) {
	dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                  console.log("Bestand gewist");
				  downladOfnie(delFile);

				 				  
              },function(error){
                  console.log("er is iets mis gegeaan", error);
              },function(){
                 console.log("Bestand" + path + filename);
              });
	});
});
}

function downloadAudio (dllSongId){
	var url = globals.muziekServer + 'ap-' + dllSongId + '.mp3';	
	console.log("bron url",url);
	var localFileName = url.split("/").pop();
	var localFileURL = globals.assetDirectory.toURL() + localFileName;
	console.log("download naar "+localFileURL);
	
	var ft = new FileTransfer();
	ft.download(url, localFileURL, 
		function(entry) {
			console.log("Bestand " + localFileName + " gedownload");
			downladOfnie(dllSongId);

		},
		fsError); 				
}


//FILE CHECK

function downladOfnie (bestandsNaam){
	console.log("check of bestand er is",bestandsNaam);
	store = cordova.file.dataDirectory + 'muziek/';
	fileName = 'ap-' + bestandsNaam +'.mp3';
	window.resolveLocalFileSystemURL(store + fileName, wegKnop, downloadKnop);
	mp3Spelen(bestandsNaam);
	globals.progressbar = document.getElementById("zoekbalk");
	globals.progressbar.addEventListener("click", zoek);
}


// AFSPELEN EN INLADEN

function mp3Spelen (bestandsNaam){
	store = cordova.file.dataDirectory + 'muziek/';
	fileName = 'ap-' + bestandsNaam +'.mp3';
	globals.activeTrack = fileName
	window.resolveLocalFileSystemURL(store + fileName, lokaalSpelen, externSpelen);
}

function lokaalSpelen(){
	var lokaleBron = cordova.file.dataDirectory + 'muziek/' + globals.activeTrack;	
	console.log (lokaleBron + " Geladen");
	$("#audioPlayer").attr("src",lokaleBron);
}

function externSpelen(){
	var externeBron = globals.muziekServer + globals.activeTrack;
	console.log (externeBron + " Geladen");
	$("#audioPlayer").attr("src",externeBron);
}



function playAlternateAudio (songId){
	var lokaleBron = cordova.file.dataDirectory + 'muziek/ap-' + songId + '.mp3';
	
	if( device.platform === 'iOS' ) {
	lokaleBron = lokaleBron.replace('file://', '')}
	
	console.log (lokaleBron);
	var audio = new Media(lokaleBron, audio_win, audio_fail );
	audio.play()
}


// PLAYER FUNCTIES

function playMusic()
	{
		var player = document.getElementById('audioPlayer');
		player.play();
		document.getElementById("btnPlay").style.display = "none";
		document.getElementById("btnPauze").style.display = "block";
	}
function pauzeMusic()
	{
		var player = document.getElementById('audioPlayer');
		player.pause();
		document.getElementById("btnPlay").style.display = "block";
		document.getElementById("btnPauze").style.display = "none";
	}
	
function stopMusic()
	{
		var player = document.getElementById('audioPlayer');
		player.pause();
		document.getElementById("btnPlay").style.display = "block";
		document.getElementById("btnPauze").style.display = "none";
	}
	
function zoek(e) 
	{
		var player = document.getElementById('audioPlayer');
		var percent = e.offsetX / this.offsetWidth;
		player.currentTime = percent * player.duration;
		globals.progressbar.value = percent / 100;
	}

function udpateProgress() 
	{	
		var player = document.getElementById('audioPlayer');
		totaalTijd = document.getElementById('totaaltijd');
		var tijdIndicatie = document.getElementById('tijdindicatie');
		
		globals.progressbar.value = (player .currentTime / player .duration);
		if (globals.progressbar.value == 1){stopMusic();};
		var NUTIJD = new Date(null);
			NUTIJD.setSeconds(player.currentTime); 
		var telangetijd = NUTIJD.toISOString().substr(11, 8);
		tijdIndicatie.innerHTML = telangetijd.substr(telangetijd.length - 5);
		
		var TOTAALETIJD = new Date(null);
			TOTAALETIJD.setSeconds (player.duration);
		var langeTotaalTijd = TOTAALETIJD.toISOString().substr(11, 8);
		totaalTijd.innerHTML = langeTotaalTijd.substr(telangetijd.length - 5);
	}





// INTERFACE LOGIC

function flipChanged(e) {
        var id = this.id,
            value = this.value;
        console.log(id + " has been changed! " + value);
		var dllTrackId = globals.activeTrack.slice(3,-4);
		console.log(dllTrackId);
		if (value == "ja"){
		console.log("START HET DOWNLADEN VAN " + globals.activeTrack);
			downloadAudio(dllTrackId);
			}
		if (value == "nee"){
			console.log("START HET WISSEN VAN " + globals.activeTrack)
			wegHalen(dllTrackId);
			}
    }
		


function wegKnop (){
console.log('Bestand aanwezig');
// document.getElementById("statusweergave").innerHTML = "Gebruikt offline versie";
 // var btnDll = document.getElementById("btnDownload");
 // var btnWis = document.getElementById("btnWissen");
				  $("#flip")
					.off("change")
					.val('ja')
					.flipswitch('refresh')
					.on("change", flipChanged);

	// btnDll.style.display = "none";
	// btnWis.style.display = "block";
}






function downloadKnop (){
console.log('Bestand niet aanwezig')
// document.getElementById("statusweergave").innerHTML = "Gebruikt de online versie";
 // var btnDll = document.getElementById("btnDownload");
 // var btnWis = document.getElementById("btnWissen");
 
 				  $("#flip")
					.off("change")
					.val('nee')
					.flipswitch('refresh')
					.on("change", flipChanged);
					
	// btnDll.style.display = "block";
	// btnWis.style.display = "none";
}





// NOG EVEN NAAR KIJKEN
/* 
$("#flip").on"change", function(e){
   var newValue = $("#flag").val();
  if(newValue == "ja"){
     console.log('WE GAAN DOWNLAODEN');
  } else {
     console.log('WE GAAN WISSEN');
  }
 */




