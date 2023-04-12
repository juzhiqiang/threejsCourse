import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Sphere } from "@/components/sphere";

// 使用cannon引擎
const Physics = () => {
  const physicsRef = useRef<any>();
  const config: any = {};
  const renderFn = (clock: THREE.Clock) => {
    let deltaTime = clock.getDelta();
    if (config.World) {
      // 更新物理世界中的物体
      config.World.step(1 / 120, deltaTime);
    }
    if (config.bodyArr && config.bodyArr.length > 0) {
      config.bodyArr.forEach((item: { mesh: THREE.CubeCamera; body: any }) => {
        item.mesh.position.copy(item.body.position);
        item.mesh.quaternion.copy(item.body.quaternion);
      });
    }
  };
  useEffect(() => {
    const { scene, camera } = threeInit(physicsRef.current, renderFn);
    config.scene = scene;
    config.camera = camera;

    if (scene) {
      const { World, bodyArr } = Sphere(scene);
      config.World = World;
      config.bodyArr = bodyArr;
    }
  }, [physicsRef.current]);

  return <div className={styles.main} ref={physicsRef}></div>;
};

export default Physics;
