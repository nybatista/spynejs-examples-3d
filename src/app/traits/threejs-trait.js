// External dependencies:
import { SpyneTrait } from "spyne";
import { defaultTo, prop } from "ramda";

// Three.js core and extra modules:
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const vespaScooterURL = IMG_PATH + "models/vespa_50_final_00.fbx";

export class ThreejsTrait extends SpyneTrait {
  // Class fields (optional, but helps keep track of references)
  container = null;
  camera = null;
  scene = null;
  renderer = null;
  clock = new THREE.Clock();
  mixer = null;
  controls = null;

  constructor(context) {
    super(context, "threejs$");
  }

  threejs$OnLoad() {
    // If you'd like to detect whether FBXLoader is available:
    const start3d = () => {
      // Ramda usage remains as in the original code
      const threeTest = defaultTo({});
      const isLoaded =
        prop("FBXLoader", threeTest({ FBXLoader })) !== undefined;

      if (isLoaded) {
        this.threejs$Initialize();
      } else {
        setTimeout(start3d, 100);
      }
    };

    setTimeout(start3d, 100);
  }

  threejs$Initialize() {
    // We wrap in an `init` function to organize setup code
    const init = () => {
      // Use a CSS selector for your container
      this.container = document.querySelector("#threejs");

      // CAMERA
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000,
      );
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
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.container.appendChild(this.renderer.domElement);

      // CONTROLS
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 100, 0);
      this.controls.update();

      window.addEventListener(
        "resize",
        this.threejs$onWindowResize.bind(this),
        false,
      );
    };

    // The animate function can reference `this` now that we store objects as class fields
    const animate = () => {
      if (this.props?.animateScooter === true) {
        requestAnimationFrame(animate);
      } else {
        // e.g. we can pass the azimuth angle to some handler
        this.onFrameUpdate?.(this.controls?.getAzimuthalAngle());
      }

      // console.log("ANIMATE IS ",this.mixer);
      const delta = this.clock.getDelta();
      if (this.mixer) this.mixer.update(delta);

      this.renderer?.render(this.scene, this.camera);
    };

    // Keep track of it, if needed in other parts of your code
    this.props.animateFn = animate;

    // INIT & ANIMATE
    init();
    animate();

    // Extra init call if desired
    const initAnim = () => animate();
    requestAnimationFrame(initAnim);
  }

  // Example helper: adjusts camera & renderer on window resize
  threejs$onWindowResize() {
    if (!this.camera || !this.renderer) return;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
