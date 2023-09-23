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
import AlarmSprite from "../../three/mesh/AlarmSprite";
import LineWall from "../../three/mesh/LineWall";
import { FlyLineShader } from "../../three/mesh/FlyLineShader";
import LightRadar from "../../three/mesh/LightRadar";
import { gsap } from "gsap";
let spMesh: any = [];
const Scene = ({ eventData, onSpriteClick, eventHandle }: any) => {
  const three = useRef<{
    gui?: dat.GUI;
    scene?: THREE.Scene;
    camera?: THREE.Camera;
    renderer?: THREE.Renderer;
    axies?: THREE.AxesHelper;
    controls?: any;
  }>({});
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const imgRef: any = useRef({
    火警: (position: { x: any; z: any }, i: any) => {
      // 光墙
      const lightWall = new LineWall(1, 2, position, 0xff0020);
      lightWall.eventIndex = i;
      scene.add(lightWall.mesh);
      spMesh.push(lightWall);
    },
    治安: (position: { x: number; y: number }, i) => {
      // 添加着色器飞线
      const flyLineShader = new FlyLineShader(
        {
          x: position.x / 2,
          z: position.y / 2,
        },
        new THREE.Color(Math.random(), Math.random(), Math.random()).getHex()
      );
      flyLineShader.eventIndex = i;
      scene.add(flyLineShader.mesh);
      spMesh.push(flyLineShader);
    },
    电力: (position: { x: any; y: any }, i) => {
      // 添加雷达
      const radar = new LightRadar(
        2,
        { x: position.x / 2, z: position.y / 2 },
        new THREE.Color(Math.random(), Math.random(), Math.random()).getHex()
      );
      radar.eventIndex = i;
      scene.add(radar.mesh);
      spMesh.push(radar);
    },
  });
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

  useEffect(() => {
    spMesh.forEach((item: { remove: () => void }) => {
      item.remove();
    });
    eventData.forEach((item: { name: string; position: any }, i: number) => {
      let newPosition = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10,
      };
      const alarmSprite = new AlarmSprite(item.name, newPosition);
      scene.add(alarmSprite.mesh);
      spMesh.push(alarmSprite);
      alarmSprite.onClick((res: any) => {
        console.log(res);
        onSpriteClick?.(item, i);
      });

      if (["火警", "治安", "电力"].includes(item.name)) {
        imgRef.current[item.name]?.(item.position, i);
      }
    });
  }, [eventData]);

  useEffect(() => {
    spMesh.forEach((item) => {
      if (item.eventIndex === eventHandle.i) {
        item.mesh.visible = true;
        gsap.to(controls.target, {
          duration: 1,
          x: item.mesh.position.x,
          y: item.mesh.position.y,
          z: item.mesh.position.z,
        });
      } else {
        item.mesh.visible = false;
      }
    });
  }, [eventHandle]);

  return <div className={styles.scene} ref={sceneRef}></div>;
};

export default Scene;
