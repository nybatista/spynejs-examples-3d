// External dependencies:
import { SpyneTrait, SpyneAppProperties } from "spyne";

// Three.js core and extra modules:
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const vespaScooterFile = "models/vespa_50_final_00.fbx";

export class ThreejsTraits extends SpyneTrait {
  // Class fields (optional, but helps keep track of references)
  container = null;
  camera = null;
  scene = null;
  renderer = null;
  clock = new THREE.Clock();
  mixer = null;
  controls = null;

  constructor(context) {
    let traitPrefix = "threejs$";
    super(context, traitPrefix);
  }

  threejs$OnLoad() {
    // FBXLoader is a static import — it is always available by the time
    // this module executes, so initialize directly (the previous setTimeout
    // polling loop only added an artificial 100ms boot delay)
    this.threejs$Initialize();
  }

  // The container drives the render size; window is the fallback while the
  // container has no CSS-driven dimensions of its own (canvas defines them)
  threejs$GetStageSize() {
    const width = this.container?.clientWidth || window.innerWidth;
    const height = this.container?.clientHeight || window.innerHeight;
    return { width, height };
  }

  threejs$Initialize() {
    // We wrap in an `init` function to organize setup code
    const init = () => {
      // Use a CSS selector for your container
      this.container = this.props.el;

      const { width, height } = this.threejs$GetStageSize();

      // CAMERA
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
      this.camera.position.set(100, 200, 300);

      this.clock = new THREE.Clock();

      // SCENE
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x2c3e50);
      // this.scene.fog = new THREE.Fog(0x6CCFB4, 200, 1000);

      // LIGHTS

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemiLight.position.set(0, 300, 0);
      this.scene.add(hemiLight);

      let dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(120, 300, 50);
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 380;
      dirLight.shadow.camera.bottom = -300;
      dirLight.shadow.camera.left = -320;
      dirLight.shadow.camera.right = 320;
      this.scene.add(dirLight);

      // GROUND MESH
      const groundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2100, 2100),
        new THREE.MeshPhongMaterial({
          color: 0x3f5360,
          depthWrite: true,
        }),
      );
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.receiveShadow = true;
      this.scene.add(groundMesh);

      // FBX LOADER
      const loader = new FBXLoader();
      // If you imported directly with `import vespaScooterURL from 'imgs/v-scooter.fbx';`
      // you could just do: loader.load(vespaScooterURL, ...)
      const imgPath = SpyneAppProperties.config?.IMG_PATH ?? "";
      const vespaScooterURL = `${imgPath}${vespaScooterFile}`;

      loader.load(vespaScooterURL, (object) => {
        this.mixer = new THREE.AnimationMixer(object);

        const degreesToRadians = (deg) => (deg * Math.PI) / 180;

        // Rotate 90° around Y axis
        object.rotation.set(0, degreesToRadians(-90), 0);

        object.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.scene.add(object);
      });

      // RENDERER
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // cap the pixel ratio: beyond 2x the extra pixels cost real GPU time
      // for imperceptible gains on high-density displays
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setSize(width, height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.container.appendChild(this.renderer.domElement);

      // CONTROLS
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 100, 0);
      this.controls.update();
    };

    // The animate function can reference `this` now that we store objects as class fields
    const animate = () => {
      if (this.props?.animateScooter === true) {
        requestAnimationFrame(animate);
      } else {
        // the chain exits here — release the guard so the next START event
        // can begin a fresh loop, and pass the resting azimuth angle on
        this.props.isAnimating = false;
        this.threejs$OnFrameUpdate?.(this.controls?.getAzimuthalAngle());
      }

      const delta = this.clock.getDelta();
      if (this.mixer) this.mixer.update(delta);

      this.renderer?.render(this.scene, this.camera);
    };

    // Single-chain guard: animate() schedules its own next frame, so calling
    // it while a chain is live stacks a second concurrent loop — every START
    // event (mousedown, wheel tick, resize) would multiply the render work
    const startLoop = () => {
      if (this.props.isAnimating === true) return;
      this.props.isAnimating = true;
      animate();
    };

    // Keep track of it, if needed in other parts of your code
    this.props.animateFn = animate;
    this.props.startAnimationLoop = startLoop;

    // INIT & ANIMATE
    init();
    startLoop();
  }

  // Example helper: adjusts camera & renderer on window resize.
  // Renders ONE frame rather than starting the animation loop — a resize on
  // a static scene should not leave a 60fps loop running indefinitely
  threejs$onWindowResize() {
    if (!this.camera || !this.renderer) return;

    const { width, height } = this.threejs$GetStageSize();

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.render(this.scene, this.camera);
  }

  threejs$OnFrameUpdate(controlRads) {
    let angle = this.props.angleUtils.checkAngle(controlRads);
    if (angle !== null) {
      let action = "CHANNEL_THREEJS_ANGLE_CHANGE_EVENT";
      //SEND INFO TO CHANNEL THREEEJS
      this.sendInfoToChannel("CHANNEL_THREEJS", angle, action);
    }
  }
  threejs$OnStartAnimation() {
    this.props.animateScooter = true;
    this.props.startAnimationLoop();
  }

  threejs$OnEndAnimation() {
    this.props.animateScooter = false;
  }
}
