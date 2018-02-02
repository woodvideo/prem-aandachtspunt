document.addEventListener('deviceready', deviceready, false);


function deviceready() {
    console.log('dv ready');
	bestandIsDaar();
}

function DllFill(){
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile('ap-ademruimtemetvriedelijkheid.mp3', { create: true, exclusive: false }, function (fileEntry) {
        console.log('fileEntry is file? ' + fileEntry.isFile.toString());
        var oReq = new XMLHttpRequest();
        // Make sure you add the domain name to the Content-Security-Policy <meta> element.
        oReq.open("GET", "http://woodvideo.nl/aandachtspuntaudio/ap-ademruimtemetvriedelijkheid.mp3", true);
        // Define how you want the XHR data to come back
        oReq.responseType = "blob";
        oReq.onload = function (oEvent) {
            var blob = oReq.response; // Note: not oReq.responseText
            if (blob) {
                // Create a URL based on the blob
				blob.lastModifiedDate = new Date();
				blob.name = 'adem.mp3';
                var url = window.URL.createObjectURL(blob);
				console.log(blob);
				localStorage.setItem('adem', blob)
				bestandIsDaar();
                /* document.getElementById('muziek').src = url; */
            } else console.error('we didnt get an XHR response!');
        };
        oReq.send(null);
    }, function (err) { console.error('error getting file! ' + err); });
}, function (err) { console.error('error getting persistent fs! ' + err); });
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
	//var sUrl = window.URL.createObjectURL(localSrc);
    document.getElementById('muziek').src = localSrc;
	document.getElementById('moetweg').style="display:block";
	document.getElementById('downloadknop').style="display:none";
}
}


function moetWeg(){
	localStorage.removeItem('adem');
	bestandIsDaar();
}