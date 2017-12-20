var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

camera.position.z = 0;
camera.position.y = 350;
camera.position.x = 370;


controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.minDistance = 50;
controls.maxDistance = 3000;
controls.minHeight = 0;
//controls.maxPolarAngle = Math.PI/2;

//Load the sound and setup the analyser
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
//var audioCtx = new window.AudioContext();
var audio = document.getElementById('signal');
var audioSrc = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();

audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

analyser.fftSize = 1024;
var bufferLength = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(bufferLength);


//Ambient White Light 
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//Spot Light1
var spotLight1 = new THREE.SpotLight(0xffffff, 10, 200, 0.3, 0, 1.0);
spotLight1.castShadow = true;
spotLight1.position.set(40,10,-70);
spotLight1.angle = 0.4;
spotLight1.distance = 1100;
scene.add(spotLight1);
//Light Helper
//var spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
//scene.add(spotLightHelper1);

//Spot Light2
var spotLight2 = new THREE.SpotLight(0xffffff, 10, 200, 0.3, 0, 1.0);
spotLight2.castShadow = true;
spotLight2.position.set(-40,10,70);
spotLight2.angle = 0.4;
spotLight2.distance = 1100;
scene.add(spotLight2);
//Light Helper
//var spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
//scene.add(spotLightHelper2);


//Add the ground

var vinylTex = new THREE.TextureLoader().load("Texture/vin2.png");

var vinylGeo = new THREE.CircleGeometry(450,128);
var vinylMat = new THREE.MeshPhongMaterial({map:vinylTex, side: THREE.DoubleSide});
var vinyl = new THREE.Mesh(vinylGeo,vinylMat);

vinyl.position.y = -1.9; //lower it
vinyl.rotation.x = -Math.PI/2; //-90 degrees around the xaxis
vinyl.doubleSided = true;
vinyl.receiveShadow = true;
scene.add(vinyl);





