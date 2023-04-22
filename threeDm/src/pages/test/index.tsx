import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default function HomePage() {
  useEffect(() => {
    // 创建一个场景
    const scene = new THREE.Scene();

    // 创建一个摄像机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 创建一个渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 创建一个区块
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器的阻尼，模仿惯性想过
  controls.enableDamping = true;

    // 定义区块的初始高度
    let height = 1;

    // 定义一个变量，用于控制动画循环
    let animateFlag = true;
    let heightStep = 10;

    // 定义一个动画循环函数
    function animate() {
      if (!animateFlag) return;

      requestAnimationFrame(animate);

      // 每一帧更新区块的高度
      mesh.scale.y = height;

      // 如果高度小于等于0，则改变高度增加的方向
      if (height <= 0) {
        heightStep = 0.01;
      }

      // 如果高度大于等于1，则改变高度增加的方向
      if (height >= 1) {
        heightStep = -0.01;
      }

      // 改变区块的高度
      height += heightStep;

      // 渲染场景
      renderer.render(scene, camera);
    }

    // 开始动画循环
    animate();
  }, []);
  return <div className={styles.content}></div>;
}
