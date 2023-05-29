/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-05-29 22:46:09
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-05-30 00:39:15
 * @FilePath: \threejsCourse\threeDm\src\pages\dataHouse\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-05-29 22:46:09
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-05-30 00:04:14
 * @FilePath: \threejsCourse\threeDm\src\pages\dataHouse\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.less";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Room } from "./Room";
import { SpriteText } from "./SpriteText";
import { gsap } from "gsap";
import { MouseLinster } from "./mouseLinster";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import RoomShapeMesh from "./threeMesh/RoomShapeMesh";

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
    camera.position.set(0, 2, 5.5);
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({
      // 抗锯齿
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls: OrbitControls = new OrbitControls(
      camera,
      renderer.domElement
    );
    controls.enableDamping = true;

    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();

    viewHome.current.appendChild(renderer.domElement);

    // 鼠标移动监控
    new MouseLinster(viewHome.current, camera);

    // 加载全景图
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/dataHouse/sky.jpg");
    // 环境球星映射
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;

    // 获取接口数据
    fetch("/api/three0313/demo720.json")
      .then((res) => res.json())
      .then((obj) => {
        // 循环创建房间
        for (let i = 0; i < obj.objData.roomList.length; i++) {
          // 获取房间数据
          const room = obj.objData.roomList[i];
          // 创建房间
          let roomMesh = new RoomShapeMesh(room);
          let roomMesh2 = new RoomShapeMesh(room, true);
          scene.add(roomMesh, roomMesh2);
          console.log(room);
        }
        console.log(obj);
      });

    // 统一监听进度
    // THREE.DefaultLoadingManager.onProgress = (item, loaded, total) => {
    //   setProgress(((loaded / total) * 100).toFixed(2));
    // };
  }, [viewHome.current]);

  return (
    <>
      <div className={styles.main} ref={viewHome}></div>
      {/* <div
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
      </div> */}
    </>
  );
};

export default ViewHouse;