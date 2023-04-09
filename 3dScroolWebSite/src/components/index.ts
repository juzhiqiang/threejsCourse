// 投射光线
// 粒子效果
import { useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { meshSjxGroup } from "./sj";
import { Ray } from "./ray";
import { Points } from "./points";
import { gsap } from "gsap";
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
  const { cubeGroup, mouse } = Ray(scene, camera);
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

  gsap.to(cubeGroup.rotation, {
    x: "+=" + Math.PI,
    y: "+=" + Math.PI,
    duration: 5,
    repeat: -1,
    ease: "none",
  });

  gsap.to(MeshSjxGroup.rotation, {
    x: "+=" + Math.PI,
    y: "+=" + Math.PI,
    duration: 5,
    repeat: -1,
    ease: "none",
  });

  gsap.to(smallBall.position, {
    x: -3,
    duration: 6,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(smallBall.position, {
    y: 0,
    duration: 0.5,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });

  const render = () => {
    // const time = clock.getElapsedTime();
    // 两者同时使用时有干扰
    const deltaTime = clock.getDelta();

    // 跟进当前滚动距离设置相机镜头
    camera.position.y = -(window.scrollY / window.innerHeight) * 30;
    // 鼠标晃动
    camera.position.x += (mouse.x * 10 - camera.position.x) * deltaTime * 5;

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
      gsap.to(arrGroup[newPage].rotation, {
        z: "+=" + Math.PI * 2,
        x: "+=" + Math.PI * 2,
        duration: 1,
      });
      //   文字动画
      gsap.fromTo(
        `.pages${newPage + 1} h1`,
        {
          rotate: 0,
          x: -300,
          direction: 0.5,
        },
        { rotate: "+=360", x: 0, direction: 0.5 }
      );
    }
  });
};
