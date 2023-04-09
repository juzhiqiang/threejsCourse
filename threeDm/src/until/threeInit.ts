import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const threeInit = (
  dom: Document
): {
  scene?: THREE.Scene;
  camera?: THREE.Camera;
} => {
  if (!dom) return {};
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 设置相机位置
  camera.position.set(0, 0, 15);
  scene.add(camera);

  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  // 设置渲染大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器透明
  dom.appendChild(renderer.domElement);

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器的阻尼，模仿惯性想过
  controls.enableDamping = true;

  renderer.render(scene, camera);
  let clock = new THREE.Clock();

  const render = () => {
    // const time = clock.getElapsedTime();
    // 两者同时使用时有干扰
    const deltaTime = clock.getDelta();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  return { scene, camera };
};
