import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {useEffect} from 'react';
import * as lil from 'lil-gui';
import gsap from 'gsap';
function App() {
  useEffect(() => {
     const scene = new THREE.Scene();
    const geometry=new THREE.CapsuleGeometry(0.5, 2, 4, 8);
    const texture=new THREE.TextureLoader().load('/checkerboard-1024x1024.png');
    texture.minFilter=THREE.NearestFilter;
    const material=new THREE.MeshBasicMaterial({map:null,color: 0xffffff ,wireframe:true});
    const object=new THREE.Mesh(geometry,material);
    scene.add(object);


  const camera =new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene.add(camera);
  const canvas = document.querySelector('.webgl');
  const renderer = new THREE.WebGLRenderer({canvas});
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  const clock=new THREE.Clock();
    renderer.setSize(window.innerWidth, window.innerHeight);
  const gui=new lil.GUI();
  gui.add(object.position,'y').min(-3).max(3).step(1).name('Height');
  gui.add(object.rotation,'y').min(-3).max(3).step(1).name('Rotation');
  gui.add(object,'visible').name('Visible');
  gui.add(material,'wireframe').name('Wireframe');
  const materialParams = {color: material.color.getHex()
};
const spin=()=>{
    gsap.to(object.rotation,{y:object.rotation.y+5,duration:1});
  }
gui.addColor(materialParams,'color').onChange(()=>{
  material.color.set(materialParams.color);
  spin();
  material.map=null;
});
gui.add({spin},'spin')
const folder=gui.addFolder('camera');
folder.add(camera.position,'x',-10,10).step(1).name('x');
folder.add(camera.position,'y',-10,10).step(1).name('y');
folder.add(camera.position,'z',-10,10).step(1).name('z');
const shapecontrol={
  toBox:()=>{
    object.geometry.dispose();
    spin();
    object.geometry=new THREE.BoxGeometry(1,1,1);
  },
  toCapsule:()=>{
    object.geometry.dispose();
    spin();
    object.geometry=new THREE.CapsuleGeometry(0.5, 2, 4, 8);
  },
  toSphere:()=>{
    object.geometry.dispose();
    spin();
    object.geometry=new THREE.SphereGeometry(1,32,32);
  },
  toTorus:()=>{
    object.geometry.dispose();
    spin();
    object.geometry=new THREE.TorusGeometry(1,0.2,16,100);
  },
  toIcosahedron:()=>{
    object.geometry.dispose();
    spin();
    object.geometry=new THREE.IcosahedronGeometry(1,0);
  },

  toTetrahedron:()=>{
    object.geometry.dispose();
    spin();
    object.geometry=new THREE.TetrahedronGeometry(1);
  },

  toTorusKnot:()=>{
    object.geometry.dispose();
    spin();
    object.geometry=new THREE.TorusKnotGeometry(1,0.2,64,8);
  }
}
const folder2=gui.addFolder('shape');
folder2.add(shapecontrol,'toBox').name('Box');
folder2.add(shapecontrol,'toCapsule').name('Capsule');
folder2.add(shapecontrol,'toSphere').name('Sphere');
folder2.add(shapecontrol,'toTorus').name('Torus');
folder2.add(shapecontrol,'toIcosahedron').name('Icosahedron');
folder2.add(shapecontrol,'toTetrahedron').name('Tetrahedron');
folder2.add(shapecontrol,'toTorusKnot').name('TorusKnot');

gui.add({setTexture:()=>{
  material.map=texture;
  material.color.set(0xffffff);
  material.needsUpdate=true;
}},'setTexture').name('Set texture');
  function animate() {
    const elapsed=clock.getElapsedTime();
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    object.rotation.y=elapsed;  
    camera.position.z=3;
    camera.rotation.x=elapsed*Math.PI;

  }
  animate();
  } 
)
  return(
    <div>
    <canvas className="webgl"/>
    </div>
  )
}
export default App;
