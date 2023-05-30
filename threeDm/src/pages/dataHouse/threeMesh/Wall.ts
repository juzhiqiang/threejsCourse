/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-05-30 23:51:28
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-05-31 01:14:14
 * @FilePath: \threejsCourse\threeDm\src\pages\dataHouse\threeMesh\Wall.ts
 * @Description: 设置墙类
 */
import * as THREE from "three";
export default class Wall extends THREE.Mesh {
  wallPoints: any;
  faceRelation: any;
  constructor(wallPoints: any, faceRelation: any) {
    super();
    this.wallPoints = wallPoints;
    this.faceRelation = faceRelation;
    this.init();
  }

  private init() {
    let wallPoints = this.wallPoints;
    wallPoints.forEach((item: { x: number; y: number; z: number }) => {
      item.x = item.x / 100;
      item.y = item.y / 100;
      item.z = item.z / 100;
    });

    // 面索引
    let faceIndex = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [0, 3, 6, 5],
      [2, 1, 4, 7],
      [1, 0, 5, 4],
      [3, 2, 7, 6],
    ];
    // 材质索引
    let mIndex: any[] = [];
    faceIndex.forEach((item) => {
      // 根据面相关判断对应全景图
      let faceItem: any;
      let isFace = this.faceRelation.some((face: { index: any }) => {
        faceItem = face;
        return (
          item.includes(face.index[0]) &&
          item.includes(face.index[1]) &&
          item.includes(face.index[2]) &&
          item.includes(face.index[3])
        );
      });
      if (isFace) {
        mIndex.push(faceItem.panorama);
      } else {
        mIndex.push(0);
      }
    });

    let faces = faceIndex.map((item) => {
      return [
        [wallPoints[item[0]].x, wallPoints[item[0]].z, wallPoints[item[0]].y],
        [wallPoints[item[1]].x, wallPoints[item[1]].z, wallPoints[item[1]].y],
        [wallPoints[item[2]].x, wallPoints[item[2]].z, wallPoints[item[2]].y],
        [wallPoints[item[3]].x, wallPoints[item[3]].z, wallPoints[item[3]].y],
      ];
    });

    let positions: any[] = [];
    let uvs: any[] = [];
    let indices: any = [];
    let nomarls: any[] = [];
    let faceNormals = [
      [0, -1, 0],
      [0, 1, 0],
      [-1, 0, 0],
      [1, 0, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];
    let materialGroup: {
      start: number;
      count: number;
      materialIndex?: number | undefined;
    }[] = [];

    faces.forEach((face, i) => {
      let point = face;
      let facePositions = [];
      let faceUvs = [];
      let faceIndices = [];

      facePositions.push(...point[0], ...point[1], ...point[2], ...point[3]);
      faceUvs.push(0, 0, 1, 0, 1, 1, 0, 1);
      faceIndices.push(
        0 + i * 4,
        2 + i * 4,
        1 + i * 4,
        0 + i * 4,
        3 + i * 4,
        2 + i * 4
      );

      positions.push(...facePositions);
      uvs.push(...faceUvs);
      indices.push(...faceIndices);
      nomarls.push(
        ...faceNormals[i],
        ...faceNormals[i],
        ...faceNormals[i],
        ...faceNormals[i]
      );

      //   设置材质组
      materialGroup.push({
        start: i * 6,
        count: 6,
        materialIndex: i,
      });
    });

    // 创建几何体
    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 3));
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(nomarls, 3)
    );
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
    geometry.groups = materialGroup;

    // 拿对应材质
    this.geometry = geometry;
    this.material = mIndex.map((item) => {
      if (item == 0) {
        return new THREE.MeshBasicMaterial({ color: 0x333333 });
      } else {
        return item.material;
      }
    });
  }
}
