// 粒子效果
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const grain = () => {
  // 1. 创建场景
  const scene = new THREE.Scene();
  // 创建相机--透视相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // 创建球几何体
  const sphereGeometry = new THREE.SphereGeometry(3, 20, 20);
  //   创建点材质
  const pointsMaterial = new THREE.PointsMaterial();
  pointsMaterial.size = 0.1;
  pointsMaterial.color.set(0xfff000);
  //   加入纹理
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/particles/2.png");
  //   设置材质纹理
  pointsMaterial.map = texture;
  //   设置透明材质
  pointsMaterial.alphaMap = texture;
  //   允许使用透明
  pointsMaterial.transparent = true;
  pointsMaterial.depthWrite = false;
  //   叠加算法,防止后面的电叠加到前面来
  pointsMaterial.blending = THREE.AdditiveBlending;
  const points = new THREE.Points(sphereGeometry, pointsMaterial);
  scene.add(points);

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器的阻尼，模仿惯性想过
  controls.enableDamping = true;

  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
