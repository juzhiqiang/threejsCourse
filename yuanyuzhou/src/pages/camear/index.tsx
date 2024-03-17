import { useEffect, useRef } from "react";
import styles from "./index.less";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import { Octree } from "three/examples/jsm/math/octree";
// @ts-ignore
import { Capsule } from "three/examples/jsm/math/Capsule";
// @ts-ignore
import Stats from "three/examples/jsm/libs/stats.module";

const Camear = () => {
  const container = useRef<HTMLDivElement>(null);
  const init = () => {
    const clock = new THREE.Clock();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x88ccee);
    scene.fog = new THREE.Fog(0x88ccee, 0, 50);

    const camear = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );
    camear.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    // renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.current?.appendChild(renderer.domElement);

    // 性能检测器开启
    const state = new Stats();
    state.domElement.style.position = "absolute";
    state.domElement.style.top = "0px";
    container.current?.appendChild(state.domElement);

    const controls = new OrbitControls(camear, renderer.domElement);
    controls.target.set(0, 0, 0);

    function animate() {
      const deltaTime = clock.getDelta();
      updatePlayer(deltaTime);
      resetPlayer();
      renderer.render(scene, camear);
      state.update();
      controls.update();
      requestAnimationFrame(animate);
    }

    const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x223344,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // 创建一个空间
    const world = new Octree();

    // 创建一个胶囊
    const playerCollider = new Capsule(
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(0, 1.35, 0),
      0.35
    );

    // 创建一个胶囊物体
    const capsuleGeometry = new THREE.CapsuleGeometry(0.35, 1, 32);
    const CapsuleMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff000,
      side: THREE.DoubleSide,
    });
    const playerCapsule = new THREE.Mesh(capsuleGeometry, CapsuleMaterial);
    playerCapsule.position.set(0, 0.85, 0);
    scene.add(playerCapsule);

    // 设置重力
    const gravity = -9.8;
    // 设置加速度
    const playerVelocity = new THREE.Vector3(0, 0, 0);
    // 玩家方向
    const playerDirection = new THREE.Vector3(0, 0, 0);

    function updatePlayer(deltaTime: number) {
      playerVelocity.y += gravity * deltaTime;
      // 更新位置，计算移动距离
      const playerMoveDistance = playerVelocity
        .clone()
        .multiplyScalar(deltaTime);
      playerCollider.translate(playerMoveDistance);
      playerCollider.getCenter(playerCapsule.position);

      // 碰撞检测
      playerCollisions();
    }

    const playerCollisions = () => {};

    // 状态重置
    const resetPlayer = () => {
      if (playerCapsule.position.y < -20) {
        playerCollider.start.set(0, 2.35, 0);
        playerCollider.end.set(0, 3.35, 0);
        playerCollider.radius = 0.35;
        playerVelocity.set(0, 0, 0);
        playerDirection.set(0, 0, 0);
      }
    };
    // 添加到空间中
    // world.addObject(playerCapsule, playerCollider);
    animate();
  };

  useEffect(() => {
    init();
  }, []);
  console.log("camear");

  return <div className={styles.camear} ref={container}></div>;
};

export default Camear;
