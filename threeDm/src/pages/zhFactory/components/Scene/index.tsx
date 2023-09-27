/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-06-05 00:39:51
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-06-07 01:33:48
 * @FilePath: \threejsCourse\threeDm\src\pages\zHcity\components\Scene\index.tsx
 * @Description: 场景相关主入口
 */
import { useContext, useEffect, useRef } from "react";
import styles from "./index.less";
import * as THREE from "three";
import { scene } from "../../three/scene";
import CameraModule from "../../three/carame";
import { gui } from "../../three/gui";
import { renderer } from "../../three/renderer";
import { axies } from "../../three/axesHelper";
import { controls } from "../../three/control";
import { resetWindow } from "../../three/init";
import { render } from "../../three/animate";
import { createMesh, hotQiuselectAnimata } from "../../three/createMesh";
import AlarmSprite from "../../three/mesh/AlarmSprite";
import { gsap } from "gsap";
import { MyContext } from "../..";
let spMesh: any = [];
const Scene = ({ eventData, onSpriteClick }: any) => {
  const { eventHandle, setEventHandle }: any = useContext(MyContext);
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
    three.current.camera = CameraModule.activeCamera;
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

  useEffect(() => {
    if (eventHandle.hotQiuAction) {
      hotQiuselectAnimata(eventHandle.hotQiuAction);
    }

    if (eventHandle.cameraActive) {
      CameraModule.setActive(eventHandle.cameraActive)
    }
  }, [eventHandle]);

  return <div className={styles.scene} ref={sceneRef}></div>;
};

export default Scene;
