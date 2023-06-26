import * as THREE from "three";
export const scene = new THREE.Scene();

// 添加场景天空盒
const textureCubeLoader = new THREE.CubeTextureLoader().setPath(
  "/textures/zhCity"
);
const textureCube = textureCubeLoader.load([
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
]);

scene.background = textureCube;
scene.environment = textureCube;
