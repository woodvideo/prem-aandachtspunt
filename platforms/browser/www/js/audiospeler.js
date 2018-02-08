function mp3Spelen (bestandsNaam){
	store = cordova.file.dataDirectory + 'muziek/';
	fileName = 'ap-' + bestandsNaam +'.mp3';
	window.resolveLocalFileSystemURL(store + fileName, lokaalSpelen(fileName), externSpelen(fileName));
}

function lokaalSpelen(songId){
	var lokaleBron = cordova.file.dataDirectory + songId;
	
	if( device.platform === 'iOS' ) {
	lokaleBron = lokaleBron.replace('file://', '')}
	
	console.log (lokaleBron);
	$("#audioPlayer").attr("src",lokaleBron);
}

function externSpelen(songId){
	var externeBron = globals.muziekServer + songId;
	console.log (externeBron);
	$("#audioPlayer").attr("src",externeBron);
}
