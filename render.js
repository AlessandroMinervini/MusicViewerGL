var particleSystem = create_particles();


$ (document).ready(function() {

    orbitControls = new THREE.OrbitControls(camera);

    animate();
});


var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    analyser.getByteFrequencyData(frequencyData);

    particleMaterial_H.uniforms.frequency.value = Array.from(frequencyData);
    particleMaterial_B.uniforms.frequency.value = Array.from(frequencyData);

};
