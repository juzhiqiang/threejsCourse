/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-06-07 01:25:12
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-06-07 01:30:11
 * @FilePath: \threejsCourse\threeDm\src\pages\zHcity\three\createMesh.ts
 * @Description:
 */

// @ts-ignore
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { scene } from "./scene";
/**
 * @description: 创建物体
 * @return {*}
 */
export const createMesh = () => {
  const palne = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial()
  );
  palne.position.set(0, 0, -6);
  palne.receiveShadow = true;
  scene.add(palne);
};
