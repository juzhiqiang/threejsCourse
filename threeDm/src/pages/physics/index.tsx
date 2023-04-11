import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Sphere } from "@/components/sphere";

// 使用cannon引擎
const Physics = () => {
  const physicsRef = useRef<any>();
  console.log(CANNON);
  const config: any = {};
  const renderFn = (clock: THREE.Clock) => {
    let deltaTime = clock.getDelta();
    if (config.World) {
      // 更新物理世界中的物体
      config.World.step(1 / 120, deltaTime);
    }
    if (config.sphere) {
      config.sphere.position.copy(config.sphereBody.position);
    }
  };
  useEffect(() => {
    const { scene, camera } = threeInit(physicsRef.current, renderFn);
    config.scene = scene;
    config.camera = camera;

    if (scene) {
      const { World, sphere, sphereBody } = Sphere(scene);
      config.sphere = sphere;
      config.World = World;
      config.sphereBody = sphereBody;
    }
  }, [physicsRef.current]);

  return <div className={styles.main} ref={physicsRef}></div>;
};

export default Physics;
