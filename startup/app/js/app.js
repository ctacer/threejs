
$.ready(function () {

  "use strict";

  function makeSkybox( urls, size ) {
    var skyboxCubemap = THREE.ImageUtils.loadTextureCube( urls );
    skyboxCubemap.format = THREE.RGBFormat;

    var skyboxShader = THREE.ShaderLib['cube'];
    skyboxShader.uniforms['tCube'].value = skyboxCubemap;

    return new THREE.Mesh(
      new THREE.BoxGeometry( size, size, size ),
      new THREE.ShaderMaterial({
        fragmentShader : skyboxShader.fragmentShader, vertexShader : skyboxShader.vertexShader,
        uniforms : skyboxShader.uniforms, depthWrite : false, side : THREE.BackSide
      })
    );
  };

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 9000);

  var renderer = new THREE.WebGLRenderer({ antialias : true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  $.append(renderer.domElement);


  var geometry = new THREE.BoxGeometry(5, 5, 5);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var cube = new THREE.Mesh(geometry, material);
  scene.add( cube );

  scene.add( makeSkybox( [
      'textures/skybox/px.jpg', // right
      'textures/skybox/nx.jpg', // left
      'textures/skybox/py.jpg', // top
      'textures/skybox/ny.jpg', // bottom
      'textures/skybox/pz.jpg', // back
      'textures/skybox/nz.jpg'  // front
    ], 8000 ));

  camera.position.z = 50;

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;
  }
  render();

});