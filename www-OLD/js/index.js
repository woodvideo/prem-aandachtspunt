document.addEventListener('deviceready', deviceready, false);


function deviceready() {
    console.log('dv ready voor test');
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
                var url = window.URL.createObjectURL(blob);
				console.log(url);
				var theFile = new Blob([this.response], { type: 'audio/mpeg' });
				console.log('BELANGRIJK');
				console.log(theFile);
				saveFile(dirEntry, theFile, "adem.mp3");
				localStorage.setItem('adem', url);
				bestandIsDaar();
                /* document.getElementById('muziek').src = url; */
            } else console.error('we didnt get an XHR response!');
        };
        oReq.send(null);
    }, function (err) { console.error('error getting file! ' + err); });
}, function (err) { console.error('error getting persistent fs! ' + err); });
}


//NIEUWE FUNCTIES


function saveFile(dirEntry, fileData, fileName) {

    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

        writeFile(fileEntry, fileData);

    }, onErrorCreateFile);
}

function writeFile(fileEntry, dataObj, isAppend) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            if (dataObj.type == "audio/mpeg") {
                readBinaryFile(fileEntry);
            }
            else {
                readFile(fileEntry);
            }
        };

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj);
    });
}


function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            displayFileData(fileEntry.fullPath + ": " + this.result);

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            displayImage(blob);
        };

        reader.readAsArrayBuffer(file);

    }, onErrorReadFile);
}




function bestandIsDaar(){// the check if there is a cached file
var remoteSrc = "http://woodvideo.nl/aandachtspuntaudio/ap-ademruimtemetvriedelijkheid.mp3";
var localSrc = localStorage.getItem('adem');

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

function resetApp(){
	localStorage.clear();
	bestandIsDaar();
}