/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-05-29 22:46:09
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-05-31 22:52:59
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
import { gsap } from "gsap";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import RoomShapeMesh from "./threeMesh/RoomShapeMesh";
import { WallShaderMaterial } from "./threeMesh/WallshaderMaterial";
import Wall from "./threeMesh/Wall";

const ViewHouse = () => {
  const viewHome = useRef<HTMLDivElement | null>(null);
  const roomData = useRef<any>({
    roomIndex: 0,
    timeline: gsap.timeline(),
    dir: new THREE.Vector3(),
  });
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
    console.log(camera)
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

    // 加载全景图
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/dataHouse/sky.jpg");
    // 环境球星映射
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;

    roomData.current.camera = camera;
    roomData.current.scene = scene;
    roomData.current.controls = controls;
    // 获取接口数据
    let roomIdToPanorama: any = {};
    fetch("/api/three0313/demo720.json")
      .then((res) => res.json())
      .then((obj) => {
        roomData.current.panoramaLocation = obj.panoramaLocation;
        // 循环创建房间
        for (let i = 0; i < obj.objData.roomList.length; i++) {
          // 获取房间数据
          const room = obj.objData.roomList[i];
          // 创建房间
          let roomMesh = new RoomShapeMesh(room);
          let roomMesh2 = new RoomShapeMesh(room, true);
          scene.add(roomMesh, roomMesh2);

          // 房间全景图映射
          obj.panoramaLocation.forEach(
            (roomImgs: { material: THREE.ShaderMaterial; roomId: any }) => {
              if (roomImgs.roomId === room.roomId) {
                let material = WallShaderMaterial(roomImgs);
                roomImgs.material = material;
                roomIdToPanorama[room.roomId] = roomImgs;
              }
            }
          );

          roomMesh.material = roomIdToPanorama[room.roomId].material;
          roomMesh.material.side = THREE.DoubleSide;
          roomMesh2.material = roomIdToPanorama[room.roomId].material.clone();
          roomMesh2.material.side = THREE.FrontSide;
        }

        // 创建墙
        obj.wallRelation.forEach(
          (wall: { wallPoints: any; faceRelation: any }) => {
            let wallPoints = wall.wallPoints;
            let faceRelation = wall.faceRelation;

            faceRelation.forEach(
              (item: { panorama: any; roomId: string | number }) => {
                item.panorama = roomIdToPanorama[item.roomId];
              }
            );

            let mesh = new Wall(wallPoints, faceRelation);
            scene.add(mesh);
          }
        );
      });

    // 统一监听进度
    // THREE.DefaultLoadingManager.onProgress = (item, loaded, total) => {
    //   setProgress(((loaded / total) * 100).toFixed(2));
    // };
  }, [viewHome.current]);

  const changeRoom = () => {
    let room = roomData.current.panoramaLocation[roomData.current.roomIndex];
    roomData.current.dir = roomData.current.camera.position
      .clone()
      .sub(
        new THREE.Vector3(
          room.point[0].x / 100,
          room.point[0].z / 100,
          room.point[0].y / 100
        )
      )
      .normalize();

    roomData.current.timeline.to(roomData.current.camera.position, {
      duration: 1,
      x: room.point[0].x / 100 + roomData.current.dir.x * 0.01,
      y: room.point[0].z / 100,
      z: room.point[0].y / 100 + roomData.current.dir.z * 0.01,
    });
    // 改变相机关注点
    console.log(roomData.current.camera)
    // roomData.current.camera.looAt(
    //   room.point[0].x / 100,
    //   room.point[0].z / 100,
    //   room.point[0].y / 100
    // );

    roomData.current.controls.target.set(
      room.point[0].x / 100,
      room.point[0].z / 100,
      room.point[0].y / 100
    );
    roomData.current.roomIndex = roomData.current.roomIndex + 1;
    if (
      roomData.current.roomIndex >= roomData.current.panoramaLocation.length
    ) {
      roomData.current.roomIndex = 0;
    }
  };

  return (
    <>
      <div className={styles.main} ref={viewHome}></div>
      <div className={styles.btn} onClick={() => changeRoom()}>
        切换房间
      </div>
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
