import * as THREE from "three";
import { camera } from "../carame";

export default class AlarmSprite {
  map: THREE.Texture;
  material: THREE.SpriteMaterial;
  textLoader: THREE.TextureLoader;
  mesh: THREE.Sprite;
  fns: Function[];
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  constructor(type = "火警", position = { x: -1.8, z: 3 }, color = 0xff0000) {
    this.textLoader = new THREE.TextureLoader();
    const typeImg: any = {
      火警: "/textures/zhCity/tag/fire.png",
      治安: "/textures/zhCity/tag/jingcha.png",
      电力: "/textures/zhCity/tag/e.png",
    };
    this.map = this.textLoader.load(typeImg[type]);
    this.material = new THREE.SpriteMaterial({
      map: this.map,
      color: color,
      transparent: true,
      // blending: THREE.AdditiveBlending,
      depthTest: false,
    });
    this.mesh = new THREE.Sprite(this.material);

    // 设置图片位置
    this.mesh.position.set(position.x, 3.5, position.z);

    // 点击事件集合
    this.fns = [];

    // 创建射线
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // 监听点击事件
    window.addEventListener("click", (event: any) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      //   y轴与平面反方向
      this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
      this.raycaster.setFromCamera(this.mouse, camera);

      event.mesh = this.mesh;
      event.alarm = this;

      //   进行碰撞检测
      const intersects = this.raycaster.intersectObject(this.mesh);
      if (intersects.length > 0) {
        this.fns.forEach((fn) => fn?.(event));
      }
    });
  }

  // 封装点击事件
  onClick(fn: Function) {
    this.fns.push(fn);
  }

  // 移除方法
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
