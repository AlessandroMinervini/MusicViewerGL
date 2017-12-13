// Create Particles

// Parameters Particles
var particle_size = 2.0;
var particle_opacity = 0.4;
var particleCountH = 80000;
var particleCountB = 80000;
var minNumParticle = 500;
var maxNumParticle = 150000;
var radius = 100;
var i = 0;
var j = 0;

var texture_particlesH = new THREE.TextureLoader().load("Texture/redT.jpg");
var texture_particlesB = new THREE.TextureLoader().load("Texture/greenT.jpg");

function create_particles(){

    var x,y,z,check,indexH,indexB;
    var vertices_particlesH = new Float32Array(particleCountH*3);
    var vertices_particlesB = new Float32Array(particleCountB*3);
    var movements_particlesH = new Float32Array(particleCountH*3);
    var movements_particlesB = new Float32Array(particleCountB*3);
    //var indexFFT_H = new Float32Array(particleCount);
    //var indexFFT_B = new Float32Array(particleCount);

    var particleGeometry_H = new THREE.BufferGeometry();
    var particleGeometry_B = new THREE.BufferGeometry();


    // Inizialize Particle H
    var Ver_Mov_high = createVertexMovementsParticlesH(particleCountH, vertices_particlesH, movements_particlesH);
    vertices_particlesH = Ver_Mov_high[0];
    movements_particlesH = Ver_Mov_high[1];

    i,j=0;
    // Inizialize Particle B
    var Ver_Mov_Bass = createVertexMovementsParticlesB(particleCountB, vertices_particlesB, movements_particlesB);
    vertices_particlesB = Ver_Mov_Bass[0];
    movements_particlesB = Ver_Mov_Bass[1];
    i,j=0;

    //Binding buffers to the shaders
    particleGeometry_H.addAttribute('position', new THREE.BufferAttribute(vertices_particlesH, 3));
    particleGeometry_H.addAttribute('movements', new THREE.BufferAttribute(movements_particlesH, 3));

    particleGeometry_B.addAttribute('position', new THREE.BufferAttribute(vertices_particlesB, 3));
    particleGeometry_B.addAttribute('movements', new THREE.BufferAttribute(movements_particlesB, 3));

    //Inizializing uniforms variable for each type of particles
    var particleH_color = new Float32Array(3);
        particleH_color[0] = 1;
        particleH_color[1] = 1;
        particleH_color[2] = 1;

    var uniforms_particleH = {
        texture_sampler: {type: 't', value: texture_particlesH},
        pointDim: {value: particle_size},
        opacity: {value: particle_opacity},
        frequency:{type: "iv1", value:[new Array(512)]},
        customColor: {value: particleH_color}
    };

    var particleB_color = new Float32Array(3);
        particleB_color[0] = 200;
        particleB_color[1] = 200;
        particleB_color[2] = 200;

    var uniforms_particleB = {
        texture_sampler: {type: 't', value: texture_particlesB},
        opacity: {value: particle_opacity},
        pointDim: {value: particle_size},
        frequency:{type: "iv1", value:[new Array(512)]},
        customColor: {value: particleB_color}
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
        //this.HighDimesion = particleSizeH;
        //this.BassDimesion = particleSizeB;
    };

    datGui = new dat.GUI();

    var HighFolder = datGui.addFolder('Highs');
    var BassFolder = datGui.addFolder('Basses');

    HighFolder.add(guiControls, 'HighParticles', minNumParticle, maxNumParticle).onFinishChange(function (newValue) {
       particleCountH = newValue;


    });


// devo ritornare per forza qualcosa?
return [particleMaterial_H, particleMaterial_B]; 
}


function createVertexMovementsParticlesH(particleCount, vertices_particles, movements_particles) {
    var p, x, y, z;
    for (p = 0; p < particleCount; p++){
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
    }

    return [vertices_particles, movements_particles];
}

function createVertexMovementsParticlesB(particleCount, vertices_particles, movements_particles) {
    var p, x, y, z;
    for (p = 0; p < particleCount; p++) {
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
    }

    return [vertices_particles, movements_particles];
}