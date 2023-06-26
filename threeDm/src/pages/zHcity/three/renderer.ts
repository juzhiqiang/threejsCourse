import * as THREE from "three";
export const renderer = new THREE.WebGLRenderer({
  // 开启抗锯齿
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
