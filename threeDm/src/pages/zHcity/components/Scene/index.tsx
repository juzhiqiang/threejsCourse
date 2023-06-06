/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-06-05 00:39:51
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-06-07 01:33:48
 * @FilePath: \threejsCourse\threeDm\src\pages\zHcity\components\Scene\index.tsx
 * @Description: 场景相关主入口
 */
import { useEffect, useRef } from "react";
import styles from "./index.less";
import * as THREE from "three";
import { scene } from "../../three/scene";
import { camera } from "../../three/carame";
import { gui } from "../../three/gui";
import { renderer } from "../../three/renderer";
import { axies } from "../../three/axesHelper";
import { controls } from "../../three/control";
import { resetWindow } from "../../three/init";
import { render } from "../../three/animate";
import { createMesh } from "../../three/createMesh";
const Scene = () => {
  const three = useRef<{
    gui?: dat.GUI;
    scene?: THREE.Scene;
    camera?: THREE.Camera;
    renderer?: THREE.Renderer;
    axies?: THREE.AxesHelper;
    controls?: any;
  }>({});
  const sceneRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    three.current.gui = gui;
    three.current.scene = scene;
    three.current.camera = camera;
    // 初始化渲染器
    three.current.renderer = renderer;
    three.current.axies = axies;
    three.current.controls = controls;

    three.current.scene.add(three.current.camera);
    three.current.scene.add(axies);
    resetWindow();

    createMesh();

    sceneRef.current?.appendChild(three.current.renderer.domElement);

    render();
  }, []);

  return <div className={styles.scene} ref={sceneRef}></div>;
};

export default Scene;
