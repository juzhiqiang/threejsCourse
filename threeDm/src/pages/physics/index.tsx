import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";

// 使用cannon引擎
const Physics = () => {
  const physicsRef = useRef<any>();
  console.log(CANNON);
  useEffect(() => {
    const { scene, camera } = threeInit(physicsRef.current);
  }, [physicsRef.current]);
  return <div className={styles.main} ref={physicsRef}></div>;
};

export default Physics;
