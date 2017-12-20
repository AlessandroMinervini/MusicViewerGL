var play = true;
var audio = document.getElementById('signal');

function onKeyDown(event) {
    switch (event.keyCode) {
        case 32: //SpaceBar
            //console.log(play);
            if (play) {
                audio.pause();
                play = false;
                rot = false;
            } else {
                audio.play();
                play = true;
                rot = true;
            }
            break;
    }
    return false;
}

window.addEventListener("keydown", onKeyDown, false);