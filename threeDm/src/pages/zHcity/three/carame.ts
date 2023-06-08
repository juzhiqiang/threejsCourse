import * as THREE from "three";

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  50000
);

camera.position.set(0, 0, 10);
