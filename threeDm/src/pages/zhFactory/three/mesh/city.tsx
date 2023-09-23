/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-06-07 01:25:12
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-06-07 01:30:11
 * @FilePath: \threejsCourse\threeDm\src\pages\zHcity\three\createMesh.ts
 * @Description:
 */
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { scene } from "../scene";
import { Object3D, Event } from "three";
/**
 * @description: 创建城市
 * @return {*}
 */
export const createCity = () => {
  const loader = new GLTFLoader();

  // 模型压缩过需要解压
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
  //  载入模型
  loader.load("/mode/city2.glb", (gltf: { scene: Object3D<Event> }) => {
    scene.add(gltf.scene);
  });
};
