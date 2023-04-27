import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const threeInit = (
  dom: Document,
  renderFn: Function
): {
  scene?: THREE.Scene;
  camera?: THREE.Camera;
  renderer?: THREE.Renderer;
  controls?: any;
} => {
  if (!dom) return {};
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    300
  );

  // 设置相机位置
  camera.position.set(0, 0, 18);
  scene.add(camera);

  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  // 设置渲染大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
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
    renderFn(clock, controls);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  return { scene, camera, renderer, controls };
};
