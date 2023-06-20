const {Singleton} = require('./lib/singleton');
const {OrbitControls} = require('three/examples/jsm/controls/OrbitControls');
const {Cube} = require('./lib/cube');
const {Camera} = require('./lib/camera');
const THREE = Singleton.getInstance().THREE;

//Bloom Effect
const {RenderPass} = require("three/examples/jsm/postprocessing/RenderPass");
const {EffectComposer} = require("three/examples/jsm/postprocessing/EffectComposer");
const {UnrealBloomPass} = require("three/examples/jsm/postprocessing/UnrealBloomPass");



(async () => {
	window.Singleton = Singleton;
	const scene = Singleton.getInstance().scene;
	const camera = Singleton.getInstance().camera
	const renderer = new THREE.WebGLRenderer({antialias: true,});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	const controls = new OrbitControls( camera, renderer.domElement );
	const light = 	await Singleton.getInstance().light;
	scene.add( light );


	// Creating a box geometery
  const cube = new Cube(0,0,0,0xff0000);
	cube.create();
	Singleton.getInstance().cube = cube;

	// Creating a camera
	new Camera(0,0,-150).create();


	//BloomEffect
	const renderScene = new RenderPass(scene, camera);
	const composer = new EffectComposer(renderer);
	composer.addPass(renderScene);
	const bloomPass = new UnrealBloomPass(
		new THREE.Vector2(window.innerWidth, window.innerHeight),
		2,
		0.5,
		0
	);
	composer.addPass(bloomPass);
	renderer.toneMapping = THREE.ReinhardToneMapping;
	renderer.toneMappingExposure = 16;


	window.camera = camera;

	function animate() {
		controls.update()
		// renderer.render(scene,camera);
		composer.render();
		requestAnimationFrame(animate);
	}

	setInterval(()=>{
		Singleton.getInstance().updateDeltaTime();
	},500);
	animate();
  Singleton.getInstance().load()
})();


window.config = Singleton.getInstance();