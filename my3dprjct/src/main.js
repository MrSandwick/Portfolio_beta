import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //Custom obj loader

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


// Camera
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(0);

renderer.render(scene, camera);


//Torus 
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)


//Light
const pointLight = new THREE.PointLight(0xffffff, 3000)
pointLight.position.set(10,20,30)

const ambietLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambietLight)



//Stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar)


//Space texture
const spaceTexture = new THREE.TextureLoader().load('../obj/space.jpg');
scene.background = spaceTexture;


//CubeLogo
const myLogoTexture = new THREE.TextureLoader().load('../obj/aa.jpg');
const myLogo = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: myLogoTexture }));
scene.add(myLogo);


//Moon
const moonTexture = new THREE.TextureLoader().load('../obj/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('../obj/normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    // normalScale: new THREE.Vector2(1, 1), // Adjust normal map strength (optional)
  })
);
scene.add(moon);

moon.position.z = 20;
moon.position.setX(-10);
myLogo.position.z = -5;
myLogo.position.x = 2;


//Custom obj
const loader = new GLTFLoader();
let model;
loader.load(
  '../obj/bocchi_the_rock.glb',  // Path to your .glb file
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.z = 30;
    model.position.setX(10);
  }
);

// //Kars obj
// const loaderrrr = new GLTFLoader();
// let modelkar;
// loaderrrr.load(
//   '../obj/kars.glb',  // Path to your .glb file
//   function (gltf) {
//     modelkar = gltf.scene;
//     scene.add(modelkar);
//     model.position.z = 35;
//     model.position.setX(10);
//     mesh.scale.set(2,2,2);
//   }
// );

//Scroll Camera Movement
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;


  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  myLogo.rotation.y += 0.01;
  myLogo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();

//Torus animation, renderer initializer 
function animate(){
  requestAnimationFrame(animate);
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  moon.rotation.x += 0.005;

  model.rotation.x += 0.005;
  model.rotation.y += 0.0075;
  model.rotation.z += 0.005;

  controls.update();
  
  renderer.render(scene, camera);
  
}
//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper)
const controls = new OrbitControls(camera, renderer.domElement);
animate()

