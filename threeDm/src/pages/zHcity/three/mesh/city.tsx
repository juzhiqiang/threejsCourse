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
import { FlyLineShader } from "./FlyLineShader";
import MeshLine from "./line";
/**
 * @description: 创建城市
 * @return {*}
 */
export const createCity = () => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./mode/city.glb", (gltf: { scene: any }) => {
    // 循环改变模型材质
    gltf.scene.traverse(
      (item: {
        type: string;
        material: THREE.MeshBasicMaterial;
        name: string;
        geometry: THREE.EdgesGeometry;
        scale: THREE.Vector3;
      }) => {
        if (item.type === "Mesh") {
          // 城市轮廓

          const cityMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x0c0e6f),
          });
          item.material = cityMaterial;
          modifyCityMaterial(item);

          if (item.name === "Layerbuildings") {
            const meshLine = new MeshLine(item.geometry);
            meshLine.mesh.scale.set(item.scale.x, item.scale.y, item.scale.z);
            scene.add(meshLine.mesh);
          }
        }
      }
    );
    scene.add(gltf.scene);

    // 添加飞线
    const flyLine = new FlyLine();
    scene.add(flyLine.mesh);

    // 添加着色器飞线
    const flyLineShader = new FlyLineShader();
    scene.add(flyLineShader.mesh);
  });
};
