import * as THREE from 'THREE'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const gui = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 15);
camera.lookAt(0, 0, 0);
/*gui.add(camera.position, 'x').min(0).max(600)
gui.add(camera.position, 'y').min(0).max(600)
gui.add(camera.position, 'z').min(0).max(600)
gui.add(camera.rotation, 'x').min(-359).max(360)*/

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282828);
let hlight=new THREE.AmbientLight(0x404040,10);
scene.add(hlight)

const dirlight = new THREE.DirectionalLight(0xffffff, 1)
dirlight.position.set(0, 1, 0)
dirlight.castShadow = true
gui.add(dirlight.position, 'x').min(0).max(600)
gui.add(dirlight.position, 'y').min(0).max(600)
gui.add(dirlight.position, 'z').min(0).max(600)
scene.add(dirlight)

let light = new THREE.PointLight(0xc4c4c4, 1)
console.log(light)
//light.scale.set(.5,.5,.5)
light.position.set(324, 415, 0)

scene.add(light)

let light1 = new THREE.PointLight(0xc4c4c4, 1)
light1.position.set(500, 100, 0)

scene.add(light1)

let light2 = new THREE.PointLight(0xc4c4c4, 1)
light2.position.set(0, 100, -500)
scene.add(light2)

let light3 = new THREE.PointLight(0xc4c4c4, 1)
light3.position.set(200, 300, 500)
scene.add(light3)

let loader = new GLTFLoader()
loader.load('gtr1.glb', (gltf) => {
    console.log(gltf)
    let car = gltf.scenes[0].children[0];
    car.scale.set(3, 3, 3);
    car.rotation.set(0, 5.7, 0)
    car.castShadow=true
    gui.add(car.rotation, 'y').min(-359).max(360)
    scene.add(gltf.scene)
    animate()
    //renderer.render(scene,camera)
})
function animate() {
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
let controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change', renderer)

renderer.render(scene, camera);
const clock = new THREE.Clock()
const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime
    //plane.rotation.z=.2*elapsedTime
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()