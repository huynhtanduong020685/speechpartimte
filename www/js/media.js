// Audio player
//
var my_media = null;
var mediaTimer = null;

// Play audio
//
function playAudio(src) {
    stopAudio();
    
    // Create Media object from src
    my_media = new Media(src, PlayonSuccess, PlayonError);

    // Play audio
    my_media.play();

    // Update my_media position every second
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }
}

// Pause audio
//
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}

// Stop audio
//
function stopAudio() {
    if (my_media) {
        my_media.stop();
        my_media.release();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
    my_media = null;
}

// onSuccess Callback
//
function PlayonSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback
//
function PlayonError(error) {
    // alert('code: '    + error.code    + '\n' +
    //       'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position) {
    //document.getElementById('audio_position').innerHTML = position;
}