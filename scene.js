var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 0;
camera.position.y = 300;
camera.position.x = 170;

//------------------------ ----------Load the sound and setup the analyser--------------------------------------------
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
//var audioCtx = new window.AudioContext();
var audio = document.getElementById('signal');
var audioSrc = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();

audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

// frequencyBinCount tells you how many values you'll receive from the analyser
analyser.fftSize = 1024;
var bufferLength = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(bufferLength);