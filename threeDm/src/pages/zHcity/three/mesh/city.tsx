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
import { scene } from "../scene";
import { modifyCityMaterial } from "../modify/cityMaterial";
import { FlyLine } from "./FlyLine";
/**
 * @description: 创建城市
 * @return {*}
 */
export const createCity = () => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./mode/city.glb", (gltf: { scene: any }) => {
    // 循环改变模型材质
    gltf.scene.traverse(
      (item: { type: string; material: THREE.MeshBasicMaterial }) => {
        if (item.type === "Mesh") {
          const cityMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x0c0e6f),
          });
          item.material = cityMaterial;
          modifyCityMaterial(item);
        }
      }
    );
    scene.add(gltf.scene);

    // 添加飞线
    const flyLine = new FlyLine();
    scene.add(flyLine.mesh);
  });
};
