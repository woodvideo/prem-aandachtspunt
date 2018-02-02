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


Function ditIsEenTest(){
var xhr = new XMLHttpRequest();

xhr.addEventListener('progress', function(e) {
    if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        console.log('Downloading: ' + percentComplete + '%');
    }
});

xhr.addEventListener('load', function(blob) {
    if (xhr.status == 200) {
        audioLink.src = window.URL.createObjectURL(xhr.response);        
    }
});

xhr.open('GET', src);
xhr.responseType = 'blob';
xhr.send(null);
}