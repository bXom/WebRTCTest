function hasUserMedia() {
    var status = (navigator.getUserMedia || navigator.mediaDevices.getUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    console.log(status);
    return !!status;
}
  
if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var constraints = {
        video: {
            mandatory: {
            minWidth: 640,
            minHeight: 480
            }
        },
        audio: true
    };
  
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // The user is using a mobile device, lower our minimum resolution
        constraints = {
            video: {
                mandatory: {
                    minWidth: 480,
                    minHeight: 320,
                    maxWidth: 1024,
                    maxHeight: 768
                }
            },
            audio: true
        };
    }
  
    navigator.getUserMedia(constraints, function (mediaStream) {
        var video1 = document.getElementById('video1');
        video1.srcObject = mediaStream;
        var trackArray = mediaStream.getTracks();
        var cloneMedia = mediaStream.clone();
        var video2 = document.getElementById("video2");
        video2.srcObject = cloneMedia;
        video1.onloadedmetadata = function(e) {
            var id = mediaStream.id;
            var videoStream = (mediaStream.getVideoTracks())[0];
            console.log("id: " + id);
            console.log("AudioTracks" , mediaStream.getAudioTracks());
            console.log("VideoTracks" , (mediaStream.getVideoTracks())[0].id);
            console.log("getTracks", mediaStream.getTracks());
            console.log("getTracksById", mediaStream.getTrackById(id));
        };
    }, function (error) {
        console.log("Raised an error when capturing:", error);
    });
} else {
    alert("Sorry, your browser does not support getUserMedia.");
}