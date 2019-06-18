import {SpyneTrait} from 'spyne';
import {defaultTo,prop} from 'ramda';

export class ThreejsTrait extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'threejs$';
    super(context, traitPrefix);

  }

  threejs$OnLoad(){
    const start3d = ()=>{
      let threeTest = defaultTo({});
      const isLoaded = prop('FBXLoader', threeTest(THREE)) !==undefined;
      if (isLoaded===true){
        this.threejs$Initialize();
      } else {
        window.setTimeout(start3d, 500);
      }
    };
    window.setTimeout(start3d, 1000);

  }

  threejs$Initialize(){
    var container, stats, controls;
    var camera, scene, renderer, light, clock;
    var clock = new THREE.Clock();
    var mixer;

    var previousRad=-1000;

    var init = ()=>{

      container = document.querySelector( '#threejs' );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
      camera.position.set( 100, 200, 300 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x6CCFB4 );
      scene.fog = new THREE.Fog( 0x6CCFB4, 200, 1000 );

      light = new THREE.HemisphereLight( 0xffffff, 0x6CCFB4 );
      light.position.set( 0, 200, 0 );
      scene.add( light );

      light = new THREE.DirectionalLight( 0x6CCFB4 );
      light.position.set( 0, 400, 100 );
      light.castShadow = true;
      light.shadow.camera.top = 380;
      light.shadow.camera.bottom = - 300;
      light.shadow.camera.left = - 320;
      light.shadow.camera.right = 320;
      scene.add( light );

      var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2100,2100 ), new THREE.MeshPhongMaterial( { color: 0x787878, depthWrite: true } ) );
      mesh.rotation.x = - Math.PI / 2;
      mesh.receiveShadow = true;
      scene.add( mesh );

      var loader = new THREE.FBXLoader();
      let url = '//holdrr.com/vespa-3d/v-scooter.fbx';

      loader.load( url, function ( object ) {

        mixer = new THREE.AnimationMixer( object );


        object.traverse( function ( child ) {

          if ( child.isMesh ) {

            child.castShadow = true;
            child.receiveShadow = true;

          }

        } );

        scene.add( object );

      } );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild( renderer.domElement );

      controls = new THREE.OrbitControls( camera, renderer.domElement );
      controls.target.set( 0, 100, 0 );
      controls.update();
      window.addEventListener( 'resize', onWindowResize, false );

    };
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
      animate();
    }

    const animate=()=> {
      if (this.props.animateScooter === true) {
        requestAnimationFrame( animate );
      } else {
        this.onFrameUpdate(controls.getAzimuthalAngle());
      }
      var delta = clock.getDelta();
      if ( mixer ) mixer.update( delta );
      renderer.render( scene, camera );
    };

    this.props.animateFn = animate;

    init();
    animate();
    const initAnim = ()=> animate();
    window.setTimeout(initAnim, 1000);

  }


}
