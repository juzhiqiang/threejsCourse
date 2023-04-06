// 投射光线
// 粒子效果
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const Ray = () => {
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
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial();
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  //   立方体
  const cubeArr = [];
  for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
      for (let z = -5; z < 5; z++) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(i, j, z);
        scene.add(cube);
        cubeArr.push(cube);
      }
    }
  }

  //   创建投射光线对象
  const raycaster = new THREE.Raycaster();
  //   设置鼠标位置对象
  const mouse = new THREE.Vector2();
  //   监听鼠标位置
  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
    raycaster.setFromCamera(mouse, camera);
    const result = raycaster.intersectObjects(cubeArr);
    if (result.length > 0) {
      result[0].object.material = redMaterial;
      console.log(result);
    }
  });

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
