var globals = {};
globals.checkedServer = false;
globals.assetServer = "http://woodvideo.nl/aandachtspuntaudio/img.json";
globals.assetSubDir = "muziek";
globals.muziekServer = "http://www.woodvideo.nl/aandachtspuntaudio/";
globals.activeTrack = ""

document.addEventListener("deviceready", init, false);
function init() {
	
	$(document).on("pageshow", "#downloadPage", function(e) {
	
		console.log("page show for downloads");
		
		//get the current list of assets
		var assetReader = getAssets();
		assetReader.done(function(results) {
			console.log("promise done", results);
			if(results.length === 0) {
				$("#assetDiv").html("<p>Sorry, but no assets are currently available.</p>");	
			} else {
				var list = "<ul data-role='listview' data-inset='true' id='assetList'>";
				for(var i=0, len=results.length; i<len; i++) {
					list += "<li data-url='"+results[i].toURL()+"'>"+results[i].name+"<img src='"+results[i].toURL()+"'> </li>";
					
	
				}
				list += "</ul>";
				console.log(list);
				$("#assetDiv").html(list);
				$("#assetList").listview();
				
			}
			
			if(!globals.checkedServer) {
				$.get(globals.assetServer).done(function(res) {
					/*
					Each asset is a URL for an asset. We check the filename
					of each to see if it exists in our current list of assets					
					*/
					console.log("server assets", res);
					for(var i=0, len=res.length; i<len; i++) {
						var file = res[i].split("/").pop();
						var haveIt = false;

						for(var k=0; k<globals.assets.length; k++) {
							if(globals.assets[k].name === file) {
								console.log("we already have file "+file);
								haveIt = true;
								break;
							}
						}
						
						if(!haveIt) fetch(res[i]);
						
					}
				});
			}
		});
		
		//click handler for list items
		$(document).on("touchend", "#assetList li", function() {
			var loc = $(this).data("url");
			console.dir(loc);
			console.log ("Dit is de locatie dus", loc);
			$("#assetImage").attr("src", loc);
			$("#popupImage").popup("open");
		});
		
	});
	
}

function fsError(e) {
	//Something went wrong with the file system. Keep it simple for the end user.
	console.log("FS Error", e);
	navigator.notification.alert("Sorry, an error was thrown.", null,"Error");
}

/*
I will access the device file system to see what assets we have already. I also take care of, 
once per operation, hitting the server to see if we have new assets.
*/
function getAssets() {
	var def = $.Deferred();

	if(globals.assets) {
		console.log("returning cached assets");
		def.resolve(globals.assets);
		return def.promise();
	}
	
	var dirEntry = window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
		//now we have the data dir, get our asset dir
		console.log("got main dir",dir);
		dir.getDirectory(globals.assetSubDir+"/", {create:true}, function(aDir) {
			console.log("ok, got assets", aDir);	
			
			var reader = aDir.createReader();
			reader.readEntries(function(results) {
				console.log("in read entries result", results);
				globals.assets = results;
				def.resolve(results);
			});
			
			//we need access to this directory later, so copy it to globals
			globals.assetDirectory = aDir;
			
		}, fsError);
		
	}, fsError);
	
	return def.promise();
}

function fetch(url) {
	console.log("fetch url",url);
	var localFileName = url.split("/").pop();
	var localFileURL = globals.assetDirectory.toURL() + localFileName;
	console.log("fetch to "+localFileURL);
	
	var ft = new FileTransfer();
	ft.download(url, localFileURL, 
		function(entry) {
			console.log("I finished it");
			globals.assets.push(entry);
		},
		fsError); 
				
}



//EIGEN FUNCTIES

function mp3Spelen (bestandsNaam){
	store = cordova.file.dataDirectory + 'muziek/';
	fileName = 'ap-' + bestandsNaam +'.mp3';
	globals.activeTrack = fileName
	window.resolveLocalFileSystemURL(store + fileName, lokaalSpelen, externSpelen);
}

function lokaalSpelen(){
	var lokaleBron = cordova.file.dataDirectory + 'muziek/' + globals.activeTrack;
	
/* 	if( device.platform === 'iOS' ) {
	lokaleBron = lokaleBron.replace('file://', '')} */
	
	console.log (lokaleBron);
	$("#audioPlayer").attr("src",lokaleBron);
}

function externSpelen(){
	var externeBron = globals.muziekServer + globals.activeTrack;
	console.log (externeBron);
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




function downloadAudio (dllSongId){
	var doel = cordova.file.dataDirectory + 'muziek/ap-' + dllSongId + '.mp3';
	var bron = globals.muziekServer + 'ap-' + dllSongId + '.mp3';
	console.log (bron, doel);	
	fetch(bron)
}

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


function downladOfnie (bestandsNaam){
	store = cordova.file.dataDirectory + 'muziek/';
	fileName = 'ap-' + bestandsNaam +'.mp3';
	window.resolveLocalFileSystemURL(store + fileName, wegKnop, downloadKnop);
}



function wegKnop (){
console.log('Bestand aanwezig');
document.getElementById("statusweergave").innerHTML = "Bestand aanwezig";
 var btnDll = document.getElementById("btnDownload");
 var btnWis = document.getElementById("btnWissen");
	btnDll.style.display = "none";
	btnWis.style.display = "block";
}

function downloadKnop (){
console.log('Bestand niet aanwezig')
document.getElementById("statusweergave").innerHTML = "Bestand niet aanwezig";
 var btnDll = document.getElementById("btnDownload");
 var btnWis = document.getElementById("btnWissen");
	btnDll.style.display = "block";
	btnWis.style.display = "none";
}



