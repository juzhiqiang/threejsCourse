/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-05-28 13:00:16
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-05-28 16:50:05
 * @FilePath: \threejsCourse\threeDm\src\pages\viewHouse\Room.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from "three";

/**
 * @parmes
 *  name 名称
 *  roomIndex 图片索引
 *  roomUrl 图片地址
 *  position 图片位置
 *  euler 偏移角度
 * @description: 房间盒子生成
 * @return {*}
 */
export class Room {
  index: number;
  name: string;
  url: string;
  position: any;
  euler: any;
  constructor(
    name: string,
    roomIndex: number,
    roomUrl: string,
    position = new THREE.Vector3(0, 0, 0),
    euler = new THREE.Euler(0, 0, 0)
  ) {
    this.index = roomIndex;
    this.name = name;
    this.url = roomUrl;
    this.position = position;
    this.euler = euler;
  }

  public create() {
    // 创建立方体
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    // 设置立方体面朝里面
    geometry.scale(1, 1, -1);
    //
    const roomArr = [
      `${this.index}_l`,
      `${this.index}_r`,
      `${this.index}_u`,
      `${this.index}_d`,
      `${this.index}_b`,
      `${this.index}_f`,
    ];
    // 盒子材质数组
    let boxMaterials: any[] = [];

    roomArr.forEach((item) => {
      // 创建纹理加载
      const texture = new THREE.TextureLoader().load(this.url + item + ".jpg");
      if (item === `${this.index}_d` || item === `${this.index}_u`) {
        texture.rotation = Math.PI;
        texture.center = new THREE.Vector2(0.5, 0.5);
      } else {
      }
      boxMaterials.push(
        new THREE.MeshBasicMaterial({
          map: texture,
        })
      );
    });
    const cube = new THREE.Mesh(geometry, boxMaterials);
    cube.position.copy(this.position);
    cube.rotation.copy(this.euler);
    return cube;
  }
}
