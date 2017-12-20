var particleSystem = create_particles();


var particleCountBack = 20000;
var particlesBack = new THREE.Geometry();
var rot = true;

for (var p = 0; p < particleCountBack; p++) {
  var particlesPosition = new THREE.Vector3();
  particlesPosition.x = Math.random() * 20000 - 10000;
  particlesPosition.y = Math.random() * 20000 - 10000;
  particlesPosition.z = Math.random() * 20000 - 10000;
  particlesBack.vertices.push(particlesPosition);
}

var texture_particles_scene = new THREE.TextureLoader().load("Texture/flare.png");
var pMaterial = new THREE.PointsMaterial({
  color: 0xFFFFFF,
  size: 40,
  map: texture_particles_scene,
  blending: THREE.AdditiveBlending,
  transparent: true
});

var particleSystem_BackScene = new THREE.Points(particlesBack, pMaterial);
scene.add(particleSystem_BackScene);
particleSystem_BackScene.sortParticles = true;


$ (document).ready(function() {

    orbitControls = new THREE.OrbitControls(camera);

    animate();
});


var animate = function () {
    stats.begin();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    particleSystem_BackScene.geometry.verticesNeedUpdate = true;

    analyser.getByteFrequencyData(frequencyData);

    particleMaterial_H.uniforms.frequency.value = Array.from(frequencyData);
    particleMaterial_B.uniforms.frequency.value = Array.from(frequencyData);

    for (var i = 0; i < 10000; i++) {
        var selected = particlesBack.vertices[i];
        if (selected.y < -10000 || selected.x < -10000 || selected.z < -10000) {
            selected.y = Math.random() * 20000 - 1000;
            selected.x = Math.random() * 20000 - 1000;
            selected.z = Math.random() * 20000 - 1000;
        }
        selected.y -= Math.random() * 1;
        selected.z -= Math.random() * 1;
    }
    if(rot){
        vinyl.rotation.z += 0.042;
    }

    stats.end();

};
