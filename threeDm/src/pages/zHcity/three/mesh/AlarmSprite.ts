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
  constructor() {
    this.textLoader = new THREE.TextureLoader();
    this.map = this.textLoader.load("/textures/zhCity/warning.png");
    this.material = new THREE.SpriteMaterial({ map: this.map });
    this.mesh = new THREE.Sprite(this.material);

    // 设置图片位置
    this.mesh.position.set(-4.2, 3.5, -1);

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
}
