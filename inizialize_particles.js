// Create Particles

// Parameters Particles
var particle_opacity = 0.7;
var particleCountH = 80000;
var particleCountB = 80000;
var minNumParticle = 500;
var maxNumParticle = 150000;
var sizeH=2;
var sizeB=2;
var RGB_H = [0.5, 0.2, 0.7];
var RGB_B = [0, 1, 0];
var radius = 100;
var i = 0;
var j = 0;
var k = 0;
var texture_particlesH = new THREE.TextureLoader().load("Texture/text2.png");
var texture_particlesB = new THREE.TextureLoader().load("Texture/flare.png");

function create_particles(){

    var particleGeometry_H = new THREE.BufferGeometry();
    var particleGeometry_B = new THREE.BufferGeometry();


    // Inizialize Particle H
    var Ver_Mov_High = createVertexMovementsParticlesH(particleCountH, sizeH, RGB_H);
    var vertices_particlesH = Ver_Mov_High[0];
    var movements_particlesH = Ver_Mov_High[1];
    var sizesH = Ver_Mov_High[2];
    var colorH = Ver_Mov_High[3];

    i=0;
    j=0;
    k=0;
    // Inizialize Particle B
    var Ver_Mov_Bass = createVertexMovementsParticlesB(particleCountB, sizeB, RGB_B);
    var vertices_particlesB = Ver_Mov_Bass[0];
    var movements_particlesB = Ver_Mov_Bass[1];
    var sizesB = Ver_Mov_Bass[2];
    var colorB = Ver_Mov_Bass[3];

    i=0;
    j=0;
    k=0;
    //Binding buffers to the shaders
    particleGeometry_H.addAttribute('position', new THREE.BufferAttribute(vertices_particlesH, 3));
    particleGeometry_H.addAttribute('movements', new THREE.BufferAttribute(movements_particlesH, 3));
    particleGeometry_H.addAttribute('customSize', new THREE.BufferAttribute(sizesH, 1));
    particleGeometry_H.addAttribute('customColor', new THREE.BufferAttribute(colorH, 3));

    particleGeometry_B.addAttribute('position', new THREE.BufferAttribute(vertices_particlesB, 3));
    particleGeometry_B.addAttribute('movements', new THREE.BufferAttribute(movements_particlesB, 3));
    particleGeometry_B.addAttribute('customSize', new THREE.BufferAttribute(sizesB, 1));
    particleGeometry_B.addAttribute('customColor', new THREE.BufferAttribute(colorB, 3));

    //Inizializing uniforms variable for each type of particles
    var uniforms_particleH = {
        texture_sampler: {type: 't', value: texture_particlesH},
        opacity: {value: particle_opacity},
        frequency:{type: "iv1", value:[new Array(512)]}
    };

    var uniforms_particleB = {
        texture_sampler: {type: 't', value: texture_particlesB},
        opacity: {value: particle_opacity},
        frequency:{type: "iv1", value:[new Array(512)]}
    };

    //Inizializing custom shaders
    particleMaterial_H = new THREE.ShaderMaterial({
        uniforms: uniforms_particleH,
        vertexShader: document.getElementById('vertex_particlesH').textContent,
        fragmentShader: document.getElementById('fragment_particles').textContent,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    particleMaterial_B = new THREE.ShaderMaterial({
        uniforms: uniforms_particleB,
        vertexShader: document.getElementById('vertex_particlesB').textContent,
        fragmentShader: document.getElementById('fragment_particles').textContent,
        blending: THREE.AdditiveBlending,
        transparent: true
    });


    //Adding particles to the scene
    var particlePoints_H = new THREE.Points( particleGeometry_H, particleMaterial_H );
    var particlePoints_B = new THREE.Points( particleGeometry_B, particleMaterial_B );
    particlePoints_H.sortParticles = true;
    particleGeometry_B.sortParticles = true;

    scene.add(particlePoints_H);
    scene.add(particlePoints_B);

    // GUI
    var guiControls =  new function () {
        this.HighParticles = particleCountH;
        this.BassParticles = particleCountB;
        this.HighDimension = sizeH;
        this.BassDimension = sizeB;
    };

    datGui = new dat.GUI();

    var HighFolder = datGui.addFolder('Highs');
    var BassFolder = datGui.addFolder('Basses');

    HighFolder.add(guiControls, 'HighParticles', minNumParticle, maxNumParticle).onFinishChange(function (newValue) {
        particleCountH = Math.floor(newValue);
        //console.log(particleCountH);
        i=0;
        j=0;
        k=0;
        var newData = createVertexMovementsParticlesH(particleCountH, sizeH, RGB_H);


        particleGeometry_H.removeAttribute('position');
        particleGeometry_H.removeAttribute('movements');

        particleGeometry_H.addAttribute('position', new THREE.BufferAttribute(newData[0],3));
        particleGeometry_H.addAttribute('movements', new THREE.BufferAttribute(newData[1], 3));

        particleGeometry_H.attributes.position.needsUpdate = true;
        particleGeometry_H.attributes.movements.needsUpdate = true;
    });

    HighFolder.add(guiControls, 'HighDimension', 0.5, 5).onFinishChange(function (newValue) {
        sizeH = newValue;
        var p;
        for (p=0; p < particleCountH; p++){
            particleGeometry_H.attributes.customSize.array[p] = newValue;
        }
        particleGeometry_H.attributes.customSize.needsUpdate = true;
    });

    BassFolder.add(guiControls, 'BassParticles', minNumParticle, maxNumParticle).onFinishChange(function (newValue) {
        particleCountB = Math.floor(newValue);
        i=0;
        j=0;
        k=0;

        var newData = createVertexMovementsParticlesB(particleCountB, sizeB, RGB_B);
        //console.log(newData);


        particleGeometry_B.removeAttribute('position');
        particleGeometry_B.removeAttribute('movements');
        //console.log(particleGeometry_B.attributes);
        particleGeometry_B.addAttribute('position', new THREE.BufferAttribute(newData[0],3));
        particleGeometry_B.addAttribute('movements', new THREE.BufferAttribute(newData[1], 3));
        //console.log(particleGeometry_B.attributes);


        particleGeometry_B.attributes.position.needsUpdate = true;
        particleGeometry_B.attributes.movements.needsUpdate = true;
        particleGeometry_B.attributes.customSize.needsUpdate = true;
    });

    BassFolder.add(guiControls, 'BassDimension', 0.5, 5).onFinishChange(function (newValue) {
        sizeB = newValue;
        var p;
        for (p=0; p < particleCountH; p++){
            particleGeometry_B.attributes.customSize.array[p] = newValue;
        }
        particleGeometry_B.attributes.customSize.needsUpdate = true;
    });






    return [particleMaterial_H, particleMaterial_B];
}


function createVertexMovementsParticlesH(particleCount, size,RGB) {
    var p, x, y, z;
    var vertices_particles = new Float32Array(maxNumParticle*3);
    var movements_particles = new Float32Array(maxNumParticle*3);
    var color_particle = new Float32Array(maxNumParticle*3);

    var sizes = new Float32Array(maxNumParticle);
    //console.log(particleCount);

    for (p = 0; p < particleCount; p++){

        sizes[p] = size;
        x = Math.random() * 4*radius - 2*radius;
        z = Math.random() * 4*radius - 2*radius;
        y = Math.random() * 20;
        var check = (Math.pow(x,2)) + (Math.pow(z,2));
        while (check > Math.pow(1.5*radius,2)){
            x = Math.random() * 4*radius - 2*radius;
            z = Math.random() * 4*radius - 2*radius;
            check = (Math.pow(x,2)) + (Math.pow(z,2));
        }

        vertices_particles[i++] = x;
        vertices_particles[i++] = y;
        vertices_particles[i++] = z;

        movements_particles[j++] = x;
        movements_particles[j++] = y;
        movements_particles[j++] = z;

        color_particle[k++] = RGB[0];
        color_particle[k++] = RGB[1];
        color_particle[k++] = RGB[2];

    }

    return [vertices_particles, movements_particles, sizes, color_particle];
}

function createVertexMovementsParticlesB(particleCount, size, RGB) {
    var p, x, y, z;
    var vertices_particles = new Float32Array(maxNumParticle*3);
    var movements_particles = new Float32Array(maxNumParticle*3);
    var sizes = new Float32Array(maxNumParticle);
    var color_particle = new Float32Array(maxNumParticle*3);

    for (p = 0; p < particleCount; p++) {
        sizes[p] = size;
        x = Math.random() * 5 * radius - 2.5 * radius;
        z = Math.random() * 5 * radius - 2.5 * radius;
        y = Math.random() * 20;
        check = (Math.pow(x, 2)) + (Math.pow(z, 2));
        while (check > Math.pow(2 * radius, 2) || (check < Math.pow(1.5 * radius, 2))) {
            x = Math.random() * 5 * radius - 2.5 * radius;
            z = Math.random() * 5 * radius - 2.5 * radius;
            check = (Math.pow(x, 2)) + (Math.pow(z, 2));
        }

        vertices_particles[i++] = x;
        vertices_particles[i++] = y;
        vertices_particles[i++] = z;

        movements_particles[j++] = x;
        movements_particles[j++] = y;
        movements_particles[j++] = z;

        color_particle[k++] = RGB[0];
        color_particle[k++] = RGB[1];
        color_particle[k++] = RGB[2];
    }

    return [vertices_particles, movements_particles, sizes, color_particle];
}
