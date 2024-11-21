import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Renderer setup
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Camera setup
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Scene setup
const scene = new THREE.Scene();

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.03;

// Geometry and materials
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});

// Hemisphere light for soft ambient lighting
const hemilight = new THREE.HemisphereLight(0x50EBEC, 0xF6BE00);
scene.add(hemilight);

// Main mesh
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Wireframe overlay
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// Animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001; // Rotate the mesh
  controls.update(); // Update controls
  renderer.render(scene, camera);
}
animate();
