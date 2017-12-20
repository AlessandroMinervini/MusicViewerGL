// Create Particles

// Parameters Particles
var stats;
var particle_opacity =0.7;
var particleCountH = 80000;
var particleCountB = 80000;
var particleCountM = 80000;
var minNumParticle = 500;
var maxNumParticle = 150000;
var sizeH=2;
var sizeB=2;
var sizeM=2;
var GreenBlue = true;
var boolMusic = 2;
var trasparents = true;
var RGB_H_1 = [0.21, 0.33, 0.57];
var RGB_M_1= [1, 1 ,1];
var RGB_B_1 = [0.34, 0.76,0 ];
var RGB_H_2 = [0.816, 0.816, 0.816];
var RGB_M_2 = [0.972, 0.484, 0.512];
var RGB_B_2 = [0.996, 0.664,0.355];
var unlockCamera = false;
var radius = 100;
var i = 0;
var j = 0;
var k = 0;
var texture_particlesH = new THREE.TextureLoader().load("Texture/particleW.png");
var texture_particlesM = new THREE.TextureLoader().load("Texture/particleW.png");
var texture_particlesB = new THREE.TextureLoader().load("Texture/particleW.png");

function create_particles(){

    var particleGeometry_H = new THREE.BufferGeometry();
    var particleGeometry_M =  new THREE.BufferGeometry();
    var particleGeometry_B = new THREE.BufferGeometry();

    // Inizialize Particle H
    if (GreenBlue) {
        var Ver_Mov_High = createVertexMovementsParticlesH(particleCountH, sizeH, RGB_H_1);
    }else{
        var Ver_Mov_High = createVertexMovementsParticlesH(particleCountH, sizeH, RGB_H_2);
    }
    var vertices_particlesH = Ver_Mov_High[0];
    var movements_particlesH = Ver_Mov_High[1];
    var sizesH = Ver_Mov_High[2];
    var colorH = Ver_Mov_High[3];

    i=0;
    j=0;
    k=0;
    // Inizialize Particle M
    if (GreenBlue) {
        var Ver_Mov_Mid = createVertexMovementsParticlesM(particleCountM, sizeM, RGB_M_1);
    }else{
        var Ver_Mov_Mid = createVertexMovementsParticlesM(particleCountM, sizeM, RGB_M_2);
    }
    var vertices_particlesM = Ver_Mov_Mid[0];
    var movements_particlesM = Ver_Mov_Mid[1];
    var sizesM = Ver_Mov_Mid[2];
    var colorM = Ver_Mov_Mid[3];

    i=0;
    j=0;
    k=0;
    // Inizialize Particle B
    if (GreenBlue) {
        var Ver_Mov_Bass = createVertexMovementsParticlesB(particleCountB, sizeB, RGB_B_1);
    }else{
        var Ver_Mov_Bass = createVertexMovementsParticlesB(particleCountB, sizeB, RGB_B_2);
    }
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
    particleGeometry_H.addAttribute('boolColor', new THREE.BufferAttribute(GreenBlue, 1));
    //particleGeometry_H.addAttribute('customMusic', new THREE.BufferAttribute(boolMusic, 1));

    particleGeometry_M.addAttribute('position', new THREE.BufferAttribute(vertices_particlesM, 3));
    particleGeometry_M.addAttribute('movements', new THREE.BufferAttribute(movements_particlesM, 3));
    particleGeometry_M.addAttribute('customSize', new THREE.BufferAttribute(sizesM, 1));
    particleGeometry_M.addAttribute('customColor', new THREE.BufferAttribute(colorM, 3));
    particleGeometry_M.addAttribute('boolColor', new THREE.BufferAttribute(GreenBlue, 1));
    //particleGeometry_M.addAttribute('customMusic', new THREE.BufferAttribute(boolMusic, 1));

    particleGeometry_B.addAttribute('position', new THREE.BufferAttribute(vertices_particlesB, 3));
    particleGeometry_B.addAttribute('movements', new THREE.BufferAttribute(movements_particlesB, 3));
    particleGeometry_B.addAttribute('customSize', new THREE.BufferAttribute(sizesB, 1));
    particleGeometry_B.addAttribute('customColor', new THREE.BufferAttribute(colorB, 3));
    particleGeometry_B.addAttribute('boolColor', new THREE.BufferAttribute(GreenBlue, 1));
    //particleGeometry_B.addAttribute('customMusic', new THREE.BufferAttribute(boolMusic, 1));

    //Inizializing uniforms variable for each type of particles
    var uniforms_particleH = {
        texture_sampler: {type: 't', value: texture_particlesH},
        opacity: {value: particle_opacity},
        frequency:{type: "iv1", value:[new Array(512)]},
        boolColor:{value: GreenBlue},
        boolMusic:{value: boolMusic}
    };

    var uniforms_particleM = {
        texture_sampler: {type: 't', value: texture_particlesM},
        opacity: {value: particle_opacity},
        frequency:{type: "iv1", value:[new Array(512)]},
        boolColor:{value: GreenBlue},
        boolMusic:{value: boolMusic}
    };

    var uniforms_particleB = {
        texture_sampler: {type: 't', value: texture_particlesB},
        opacity: {value: particle_opacity},
        frequency:{type: "iv1", value:[new Array(512)]},
        boolColor:{value: GreenBlue},
        boolMusic:{value: boolMusic}
    };

    //Inizializing custom shaders
    particleMaterial_H = new THREE.ShaderMaterial({
        uniforms: uniforms_particleH,
        vertexShader: document.getElementById('vertex_particlesH').textContent,
        fragmentShader: document.getElementById('fragment_particles').textContent,
        blending: THREE.AdditiveBlending,
        transparent: false
    });

    particleMaterial_M = new THREE.ShaderMaterial({
        uniforms: uniforms_particleM,
        vertexShader: document.getElementById('vertex_particlesM').textContent,
        fragmentShader: document.getElementById('fragment_particles').textContent,
        blending: THREE.AdditiveBlending,
        transparent: false
    });

    particleMaterial_B = new THREE.ShaderMaterial({
        uniforms: uniforms_particleB,
        vertexShader: document.getElementById('vertex_particlesB').textContent,
        fragmentShader: document.getElementById('fragment_particles').textContent,
        blending: THREE.AdditiveBlending,
        transparent: false
    });



    //Adding particles to the scene
    var particlePoints_H = new THREE.Points( particleGeometry_H, particleMaterial_H );
    var particlePoints_M = new THREE.Points( particleGeometry_M, particleMaterial_M );
    var particlePoints_B = new THREE.Points( particleGeometry_B, particleMaterial_B );
    particlePoints_H.sortParticles = true;
    particleGeometry_M.sortParticles = true;
    particleGeometry_B.sortParticles = true;

    scene.add(particlePoints_M);
    scene.add(particlePoints_H);
    scene.add(particlePoints_B);

    // GUI
    var guiControls =  new function () {
        this.HighParticles = particleCountH;
        this.MidParticles = particleCountM;
        this.BassParticles = particleCountB;
        this.HighDimension = sizeH;
        this.MidDimension = sizeM;
        this.BassDimension = sizeB;
        this.toogleColor = function(){
            GreenBlue = !GreenBlue;
        };
        this.toogleMusic = function(){
            boolMusic++;
            boolMusic = boolMusic%3;
            console.log(boolMusic);
        };
        this.unlockCamera = function(){
            unlockCamera = !unlockCamera;
        }
        this.trasparents = function(){
            trasparents = !trasparents;
        }
    };

    datGui = new dat.GUI();

    var HighFolder = datGui.addFolder('Highs');
    var MidFolder = datGui.addFolder('Mid');
    var BassFolder = datGui.addFolder('Basses');

    HighFolder.add(guiControls, 'HighParticles', minNumParticle, maxNumParticle).onFinishChange(function (newValue) {
        particleCountH = Math.floor(newValue);
        //console.log(particleCountH);
        i=0;
        j=0;
        k=0;
        if (GreenBlue) {
            var newData = createVertexMovementsParticlesH(particleCountH, sizeH, RGB_H_1);
        }else{
            var newData = createVertexMovementsParticlesH(particleCountH, sizeH, RGB_H_2);
        }

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

    MidFolder.add(guiControls, 'MidParticles', minNumParticle, maxNumParticle).onFinishChange(function (newValue) {
        particleCountM = Math.floor(newValue);

        i=0;
        j=0;
        k=0;
        if (GreenBlue) {
            var newData = createVertexMovementsParticlesM(particleCountM, sizeM, RGB_M_1);
        }else{
            var newData = createVertexMovementsParticlesM(particleCountM, sizeM, RGB_M_2);
        }

        particleGeometry_M.removeAttribute('position');
        particleGeometry_M.removeAttribute('movements');

        particleGeometry_M.addAttribute('position', new THREE.BufferAttribute(newData[0],3));
        particleGeometry_M.addAttribute('movements', new THREE.BufferAttribute(newData[1], 3));

        particleGeometry_M.attributes.position.needsUpdate = true;
        particleGeometry_M.attributes.movements.needsUpdate = true;
    });
    MidFolder.add(guiControls, 'MidDimension', 0.5, 5).onFinishChange(function (newValue) {
        sizeH = newValue;
        var p;
        for (p=0; p < particleCountM; p++){
            particleGeometry_M.attributes.customSize.array[p] = newValue;
        }
        particleGeometry_M.attributes.customSize.needsUpdate = true;
    });

    BassFolder.add(guiControls, 'BassParticles', minNumParticle, maxNumParticle).onFinishChange(function (newValue) {
        particleCountB = Math.floor(newValue);
        i=0;
        j=0;
        k=0;
        if (GreenBlue) {
            var newData = createVertexMovementsParticlesB(particleCountB, sizeB, RGB_B_1);
        }else{
            var newData = createVertexMovementsParticlesB(particleCountB, sizeB, RGB_B_2);
        }


        particleGeometry_B.removeAttribute('position');
        particleGeometry_B.removeAttribute('movements');

        particleGeometry_B.addAttribute('position', new THREE.BufferAttribute(newData[0],3));
        particleGeometry_B.addAttribute('movements', new THREE.BufferAttribute(newData[1], 3));


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

    datGui.add(guiControls, 'toogleColor').name("Change Color").onFinishChange(function(){

        particleGeometry_H.removeAttribute('customColor');
        particleGeometry_B.removeAttribute('customColor');
        particleGeometry_M.removeAttribute('customColor');

        var p;
        var color_particle_H = new Float32Array(maxNumParticle*3);
        var color_particle_M = new Float32Array(maxNumParticle*3);
        var color_particle_B = new Float32Array(maxNumParticle*3);


        if(GreenBlue) {
            k = 0;
            for (p = 0; p < particleCountB; p++) {
                color_particle_B[k++] = RGB_B_2[0];
                color_particle_B[k++] = RGB_B_2[1];
                color_particle_B[k++] = RGB_B_2[2];
            }


            k = 0;
            for (p = 0; p < particleCountB; p++) {
                color_particle_H[k++] = RGB_H_2[0];
                color_particle_H[k++] = RGB_H_2[1];
                color_particle_H[k++] = RGB_H_2[2];
            }

            k = 0;
            for (p = 0; p < particleCountB; p++) {
                color_particle_M[k++] = RGB_M_2[0];
                color_particle_M[k++] = RGB_M_2[1];
                color_particle_M[k++] = RGB_M_2[2];
            }
        }else{
            k = 0;
            for (p = 0; p < particleCountB; p++) {
                color_particle_B[k++] = RGB_B_1[0];
                color_particle_B[k++] = RGB_B_1[1];
                color_particle_B[k++] = RGB_B_1[2];
            }
            k = 0;
            for (p = 0; p < particleCountB; p++) {
                color_particle_H[k++] = RGB_H_1[0];
                color_particle_H[k++] = RGB_H_1[1];
                color_particle_H[k++] = RGB_H_1[2];
            }
            k = 0;
            for (p = 0; p < particleCountB; p++) {
                color_particle_M[k++] = RGB_M_1[0];
                color_particle_M[k++] = RGB_M_1[1];
                color_particle_M[k++] = RGB_M_1[2];
            }
        }
        particleGeometry_B.addAttribute('customColor', new THREE.BufferAttribute(color_particle_B, 3));
        particleGeometry_B.attributes.customColor.needsUpdate = true;
        particleGeometry_H.addAttribute('customColor', new THREE.BufferAttribute(color_particle_H, 3));
        particleGeometry_H.attributes.customColor.needsUpdate = true;
        particleGeometry_M.addAttribute('customColor', new THREE.BufferAttribute(color_particle_M, 3));
        particleGeometry_M.attributes.customColor.needsUpdate = true;

        uniforms_particleB.boolColor.value = !GreenBlue;
        uniforms_particleH.boolColor.value = !GreenBlue;
        uniforms_particleM.boolColor.value = !GreenBlue;

    });
    datGui.add(guiControls, 'toogleMusic').name("Arctic Monkeys").onFinishChange(function(){
        if (boolMusic === 1){
            $('#signal').attr('src', 'sounds/AM.mp3');
            this.name('Arctic Monkeys');
        }else if(boolMusic === 2){
            $('#signal').attr('src', 'sounds/W.mp3');
            this.name('Police');
        }else if (boolMusic === 0){
            $('#signal').attr('src', 'sounds/Clint.mp3');
            this.name('Gorillaz');
        }
    });
    /*datGui.add(guiControls, 'unlockCamera').name("Unlock Camera").onFinishChange(function(){
        if(!unlockCamera){
            controls.minDistance = 0;
            controls.maxDistance = 5000;
            controls.minHeight = 0;
            controls.maxPolarAngle = Math.PI;
            this.name('Lock Camera');
        }else{
            controls.minDistance = 0;
            controls.maxDistance = 500;
            controls.minHeight = 0;
            controls.maxPolarAngle = Math.PI/2;
            this.name('UnLock Camera');
        }

    });*/
    datGui.add(guiControls, 'trasparents').name("Transparency").onFinishChange(function(){
        if(trasparents){
            particleMaterial_H.transparent = trasparents;
            particleMaterial_M.transparent = trasparents;
            particleMaterial_B.transparent = trasparents;
        }else{
            particleMaterial_H.transparent = trasparents;
            particleMaterial_M.transparent = trasparents;
            particleMaterial_B.transparent = trasparents;
        }
    });


    //STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

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
        while (check > Math.pow(0.75*radius,2)){
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

function createVertexMovementsParticlesM(particleCount, size,RGB) {
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
        while (check > Math.pow(1.5*radius,2) || check < Math.pow(0.75 * radius, 2)){
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
