import * as THREE from "three";
export const renderer = new THREE.WebGLRenderer({
  // 开启抗锯齿
  antialias: true,
  // 优化渲染器-------------
  // [设置深度防止某些模型因为位置太近计算闪烁]
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
