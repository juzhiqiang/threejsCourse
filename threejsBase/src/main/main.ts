import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { editPosition } from "./3dMove";

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
// 添加到场景中
// 创建几何体
const cubeGeomentry = new THREE.BoxGeometry(1, 1, 1);
// 设置材质
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
});
// 根据材质创建物体
const cube = new THREE.Mesh(cubeGeomentry, cubeMaterial);
// 将几何体放入场景
scene.add(cube);
// 修改位置
// editPosition(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 将canvas内容添加到body中
document.body.appendChild(renderer.domElement);

// 使用渲染器，将相机场景渲染出来
renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 不断更新渲染
function render() {
  editPosition(cube);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

console.log(THREE);
