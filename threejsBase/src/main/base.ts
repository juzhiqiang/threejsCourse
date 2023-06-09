import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { fullscreen } from "../until";
import { editPosition } from "./3dMove";
import { DEBUG } from "./datGui";
import { gsapAnimatas } from "./gsap";

export const base = () => {
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
  // 设置材质，金属材质
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: "red",
  });
  // 根据材质创建物体
  const cube = new THREE.Mesh(cubeGeomentry, cubeMaterial);
  // 将几何体放入场景
  scene.add(cube);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 将canvas内容添加到body中
  document.body.appendChild(renderer.domElement);

  // 使用渲染器，将相机场景渲染出来
  renderer.render(scene, camera);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器的阻尼，模仿惯性想过
  controls.enableDamping = true;

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 09-直接使用动画库,使用09时候可以不使用08手动计算改为由动画库辅助计算变化值
  gsapAnimatas(cube);

  // 11 全屏控制
  window.addEventListener("dblclick", () => {
    fullscreen(renderer.domElement, !document.fullscreenElement);
  });

  // 不断更新渲染
  function render() {
    //08-修改位置
    // editPosition(cube);

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    // 10-监听画面变化，更新渲染画面
    window.addEventListener("resize", () => {
      // 更新摄像头
      camera.aspect = window.innerWidth / window.innerHeight;
      // 更新摄像机投影矩阵
      camera.updateProjectionMatrix();
      // 更新渲染器
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 设置渲染器像素比
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }

  render();

  // 开启调试
  const debugParm = [
    {
      _type: "number",
      type: cube.position,
      name: "x",
      min: 0,
      max: 5,
      step: 0.01,
      change: (value) => {
        console.log("被改变的值：", value);
      },
    },
    {
      _type: "color",
      name: "color",
      color: {
        color: "#ff6060",
      },
      change: (value) => {
        cube.material.color.set(value);
      },
    },
    {
      type: cube,
      name: "visible",
      change: (value) => {
        cube.material.color.set(value);
      },
    },
  ];
  DEBUG(debugParm);

  console.log(THREE);
};
