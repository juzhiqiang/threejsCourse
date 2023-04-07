// 投射光线
// 粒子效果
import { useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { meshSjxGroup } from "./sj";
import { Ray } from "./ray";
import { Points } from "./points";
export const threeCanvas = () => {
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
  camera.position.set(0, 0, 15);
  scene.add(camera);
  const datas = useRef({
    curPage: 0,
  });

  //   设置光线投射几何体
  const { cubeGroup } = Ray(scene, camera);
  // 三角形;
  const MeshSjxGroup = meshSjxGroup(scene);
  //   弹跳小球
  const { smallBall, pointGroup } = Points(scene);
  const arrGroup = [cubeGroup, MeshSjxGroup, pointGroup];

  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  // 设置渲染大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器透明

  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);
  let clock = new THREE.Clock();

  const render = () => {
    const time = clock.getElapsedTime();
    cubeGroup.rotation.x = time * 0.5;
    cubeGroup.rotation.y = time * 0.5;

    MeshSjxGroup.rotation.x = time * 0.3;
    MeshSjxGroup.rotation.y = time * 0.3;

    smallBall.position.x = Math.sin(time) * 3;
    smallBall.position.z = Math.cos(time) * 3;
    smallBall.position.y = 2 + Math.sin(time * 10) / 2;
    pointGroup.rotation.z = Math.sin(time) * 0.05;
    pointGroup.rotation.x = Math.sin(time) * 0.05;
    // 跟进当前滚动距离设置相机镜头
    camera.position.y = -(window.scrollY / window.innerHeight) * 30;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  // 监听滚动事件
  //   设置当前页
  window.addEventListener("scroll", (e) => {
    const newPage = Math.round(window.scrollY / window.innerHeight);
    if (newPage !== datas.current.curPage) {
      datas.current.curPage = newPage;
      console.log("改变页面", newPage);
    }
  });
};
