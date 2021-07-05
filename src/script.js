import * as THREE from 'THREE'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { MapControls,OrbitControls } from './mapcontrols';
class DegRadHelper {
    constructor(obj, prop) {
        this.obj = obj;
        this.prop = prop;
    }
    get value() {
        return THREE.MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
        this.obj[this.prop] = THREE.MathUtils.degToRad(v);
    }
}


//const gui = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,

});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 500);
camera.position.set(36, 21, -17);
/*camera.lookAt(0, 0, 0);*/
camera.zoom = 20
//console.log(camera)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
/*gui.add(camera.rotation, 'x').min(0).max(360)
gui.add(camera.rotation, 'y').min(0).max(360)
gui.add(camera.rotation, 'z').min(0).max(360)*/
/*gui.add(camera.rotation, 'x').min(-359).max(360)*/

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282828);
//console.log(scene.background)
let hlight = new THREE.AmbientLight(0xc4c4c4, 1);
scene.add(hlight)

//car light
const dirlight = new THREE.RectAreaLight(0xffffff, 2, 2.4, 2.2)
dirlight.position.set(5, 1, -4)
dirlight.castShadow = true
dirlight.rotation.set(-Math.PI / 2, 0, 0)
/*const dirhelp = new RectAreaLightHelper(dirlight)
scene.add(dirhelp)*/
/*gui.add(dirlight.position, 'x').min(-100).max(100)
gui.add(dirlight.position, 'y').min(-100).max(100)
gui.add(dirlight.position, 'z').min(-100).max(100)
gui.add(dirlight, 'intensity', 0, 10, 0.01);
gui.add(dirlight, 'width', 0, 20);
gui.add(dirlight, 'height', 0, 20);
gui.add(new DegRadHelper(dirlight.rotation, 'x'), 'value', -180, 180).name('x rotation');
gui.add(new DegRadHelper(dirlight.rotation, 'y'), 'value', -180, 180).name('y rotation');
gui.add(new DegRadHelper(dirlight.rotation, 'z'), 'value', -180, 180).name('z rotation');
gui.add(dirlight.position, 'x').min(-10).max(30)
gui.add(dirlight.position, 'y').min(-10).max(30)
gui.add(dirlight.position, 'z').min(-10).max(30)*/
scene.add(dirlight)



let light = new THREE.PointLight(0xc4c4c4, 1)
//console.log(light)
light.scale.set(.5, .5, .5)

light.position.set(97, 45, 168)

scene.add(light)

let light1 = new THREE.RectAreaLight(0xc4c4c4, 2, 2.4, 2.2);
light1.position.set(-.1, 1.6, .5)
light1.rotation.set(-Math.PI / 2, 0, 0)
console.log(light1)

scene.add(light1)
var params = {
    modelcolor: "#ff0000"
};



let loader = new GLTFLoader()
loader.load('campfire.glb', (gltf) => {
    //console.log(gltf)
    let car = gltf.scenes[0].children[0];
    car.scale.set(3, 3, 3);
    car.rotation.set(0, 5.7, 0)
    car.castShadow = true

  
    scene.add(gltf.scene)

    tick()
    
})
loader.load('cupjug.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('plate.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('dustbin.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('bottle.glb', (gltf) => {
    scene.add(gltf.scene)
    gui.add(gltf.position, 'z').min(-359).max(360)
    tick()
})
loader.load('deadbody.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('seats.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('fire.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
//loader.load('fence.glb',(gltf)=>{
//    scene.add(gltf.scene)
//   tick()
//})
loader.load('lantern.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('donotcross.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('tyreprint.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
loader.load('gtr1.glb', (gltf) => {
    scene.add(gltf.scene)
    tick()
})
let controls = new OrbitControls(camera, renderer.domElement);

controls.maxZoom = 20
controls.maxDistance = 100
controls.minPolarAngle = -2 * (Math.PI) / 2; // radians
controls.maxPolarAngle = Math.PI / 2.3;
controls.enablePan=false
controls.zoomSpeed=2


controls.zoomToCursor=true

//controls.screenSpacePanning=true
controls.addEventListener('move', renderer)

renderer.render(scene, camera);
window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})
const clock = new THREE.Clock()
const tick = () => {
    controls.update()
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