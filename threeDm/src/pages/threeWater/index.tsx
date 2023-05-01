import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import * as dat from "dat.gui";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 顶点着色器
// @ts-ignore
import vertexShader from "./shader/vertex.glsl";
// @ts-ignore
import fragmentShader from "./shader/fragment.glsl";
// 导入rgb
// @ts-ignore
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";

// 导入threejs water原生水
// @ts-ignore
import { Water } from "three/examples/jsm/objects/Water2";

export default function ThreeWater() {
  const shaderRef = useRef<any>();
  const gui = new dat.GUI();

  const renderFn = (clock: THREE.Clock, controls: any) => {
    let elapsedtime = clock.getElapsedTime();
    controls.update();
  };
  useEffect(() => {
    const { scene, camera, renderer, controls } = threeInit(
      shaderRef.current,
      renderFn
    );

    const water = new Water(new THREE.PlaneGeometry(1, 1, 1024, 1024), {
      color: "#ffffff",
      scale: 1,
      // 设置水纹方向
      flowDirection: new THREE.Vector2(1, 1),
      textureHeight: 1024,
      textureWidth: 1024,
    });

    // 创建面
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 512, 512),
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
      })
    );
    plane.rotation.x = -Math.PI / 2;
    scene?.add(plane);
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
}
