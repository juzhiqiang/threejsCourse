/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-05-28 13:00:16
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-05-28 16:41:46
 * @FilePath: \threejsCourse\threeDm\src\pages\viewHouse\Room.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from "three";

/**
 * @parmes
 *  name 标签名称
 *  position 标签位置
 * @description: 标签盒子生成
 * @return {*}
 */
export class SpriteText {
  name: string;
  position: any;
  camera: THREE.Camera;
  callbake: Function[];
  scene: THREE.Scene;
  constructor(
    text: string,
    position = new THREE.Vector3(0, 0, 0),
    camera: THREE.Camera,
    scene: THREE.Scene
  ) {
    this.name = text;
    this.position = position;
    this.camera = camera;
    this.scene = scene;
    this.callbake = [];
  }

  public create() {
    const canvas: any = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    let context: CanvasRenderingContext2D = canvas.getContext("2d");
    context.fillStyle = "rgba(0,0,0,.7)";
    context.fillRect(0, 256, 1024, 512);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 200px Arial";
    context.fillStyle = "#fff";
    context.fillText(this.name, 512, 512);
    let texture = new THREE.CanvasTexture(canvas);
    // 设置精灵材质
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(this.position);
    this.scene.add(sprite);


    // 创建射线检测点击是否碰撞到标签
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    window.addEventListener("click", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      raycaster.setFromCamera(mouse, this.camera);
      let instersects = raycaster.intersectObject(sprite);
      if (instersects.length > 0) {
        this.callbake.forEach((callbake) => {
          callbake();
        });
      }
    });
  }

  // 标签点击
  public onClick(callback: any) {
    this.callbake.push(callback);
  }
}
