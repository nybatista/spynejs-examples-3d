import {SpyneTrait} from 'spyne';

export class ThreejsTrait extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'threejs$';
    super(context, traitPrefix);

  }

  threejs$Initialize(){



    if ( WEBGL.isWebGLAvailable() === false ) {

      document.body.appendChild( WEBGL.getWebGLErrorMessage() );

    }




    var container, stats, controls;
    var camera, scene, renderer, light;

    var clock = new THREE.Clock();

    var mixer;

    var previousRad=-1000;

    var init = ()=>{

      container = document.querySelector( '#threejs' );
      // document.body.appendChild( container );

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

      // scene.add( new THREE.CameraHelper( light.shadow.camera ) );

      // ground
      var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2100,2100 ), new THREE.MeshPhongMaterial( { color: 0x787878, depthWrite: true } ) );
      mesh.rotation.x = - Math.PI / 2;
      mesh.receiveShadow = true;
      scene.add( mesh );

      //var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
      //grid.material.opacity = 0.2;
      //grid.material.transparent = true;
      //scene.add( grid );

      // model
      var loader = new THREE.FBXLoader();
      let url = 'assets/models/vespa-2.fbx';
      url = 'assets/models/vespa-2b.fbx';
      url = '//holdrr.com/vespa-3d/v-scooter.fbx';
      // url = 'assets/models/vespa-maya-v2.fbx';

      loader.load( url, function ( object ) {

        mixer = new THREE.AnimationMixer( object );

        //var action = mixer.clipAction( object.animations[ 0 ] );
        //action.play();

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

      //angleUtils = new AngleUtils(controls);

      window.addEventListener( 'resize', onWindowResize, false );


      // stats
      //stats = new Stats();
      //	container.appendChild( stats.dom );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }



    const animate=()=> {

      requestAnimationFrame( animate );

      var delta = clock.getDelta();

      if ( mixer ) mixer.update( delta );
      this.onFrameUpdate(controls.getAzimuthalAngle());
      //getAngle();
      //angleUtils.checkAngle( controls.getAzimuthalAngle());
      renderer.render( scene, camera );

      //stats.update();

    }
    init();
    animate();



  }


}
