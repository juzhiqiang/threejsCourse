import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sphere } from "@/components/sphere";
import { Room } from "./Room";
import { SpriteText } from "./SpriteText";
import { gsap } from "gsap";
import { MouseLinster } from "./mouseLinster";

const ViewHouse = () => {
  const viewHome = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState("0");
  const [init, setInit] = useState(0);
  useEffect(() => {
    if (!viewHome.current || init === 1) return;
    setInit(1);
    // 初始化场景
    const scene = new THREE.Scene();
    // 初始化相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // 设置相机初始w位置
    camera.position.set(0, 0, 0);
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 临时添加的辅助坐标系
    const axies = new THREE.AxesHelper(5);
    scene.add(axies);

    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();

    viewHome.current.appendChild(renderer.domElement);

    // 鼠标移动监控
    new MouseLinster(viewHome.current, camera);

    // 创建客厅
    let livingRoom = new Room("客厅", 0, "/viewHouse/living/").create();
    scene.add(livingRoom);

    // 创建厨房
    let kitchenPosition = new THREE.Vector3(-5, 0, -10);
    const kitchenEulerr = new THREE.Euler(0, -Math.PI / 2, 0);
    let kitchen = new Room(
      "厨房",
      3,
      "/viewHouse/kitchen/",
      kitchenPosition
    ).create();

    scene.add(kitchen);

    const kitchenTextPostion = new THREE.Vector3(-1, 0, -3);
    const textKitchen = new SpriteText(
      "厨房",
      kitchenTextPostion,
      camera,
      scene
    );
    textKitchen.create();
    // 让相机移动到厨房
    textKitchen.onClick(() => {
      gsap.to(camera.position, {
        duration: 1,
        x: kitchenPosition.x,
        y: kitchenPosition.y,
        z: kitchenPosition.z,
      });
      console.log("kdq");
    });

    // 统一监听进度
    THREE.DefaultLoadingManager.onProgress = (item, loaded, total) => {
      setProgress(((loaded / total) * 100).toFixed(2));
    };
  }, [viewHome.current]);

  return (
    <>
      <div className={styles.main} ref={viewHome}></div>
      <div
        style={{
          position: "fixed",
          zIndex: 999,
          left: "50%",
          top: "50%",
          color: "#Fff",
        }}
        hidden={progress === "100.00"}
      >
        {progress}%
      </div>
    </>
  );
};

export default ViewHouse;
