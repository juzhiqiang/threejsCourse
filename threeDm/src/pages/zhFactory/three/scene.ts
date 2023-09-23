import * as THREE from "three";
// @ts-ignore
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export const scene = new THREE.Scene();

// 导入hdr纹理
const hdrLoader = new RGBELoader();
hdrLoader.loadAsync("/hdr/023.hdr").then((texture: any) => {
  scene.background = texture;
  scene.environment = texture;
  if (scene.environment)
    scene.environment.mapping = THREE.EquirectangularReflectionMapping;
});

// 添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 100, 10);
scene.add(light);
