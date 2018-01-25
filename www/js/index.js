document.addEventListener('deviceready', deviceready, false);


function deviceready() {
    console.log('dv ready');
	bestandIsDaar();
}

function DllFill(){
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    console.log('file system open: ' + fs.name);
    getSampleFile(fs.root);

}, onErrorLoadFs);

function getSampleFile(dirEntry) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://cordova.apache.org/static/img/cordova_bot.png', true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status == 200) {

            var blob = new Blob([this.response], { type: 'image/png' });
            saveFile(dirEntry, blob, "downloadedImage.png");
        }
    };
    xhr.send();
}
}


function downloadSuccess(url) {
					localStorage.setItem(remoteURL, url.toURL());
					}


function bestandIsDaar(){// the check if there is a cached file
var remoteSrc = "http://woodvideo.nl/aandachtspuntaudio/ap-ademruimtemetvriedelijkheid.mp3";
var localSrc = localStorage.getItem('adem');

console.log(localSrc)
if(localSrc === null) {
    // when there is NO cached version, use remote
    document.getElementById('muziek').src = remoteSrc;
	document.getElementById('moetweg').style="display:none";
	document.getElementById('downloadknop').style="display:block";
	

} else {
    // when there IS a cached version, use local 
	console.log(localSrc);
	
    document.getElementById('muziek').src = localSrc;
	document.getElementById('moetweg').style="display:block";
	document.getElementById('downloadknop').style="display:none";
}
}


function moetWeg(){
	localStorage.removeItem('adem');
	bestandIsDaar();
}