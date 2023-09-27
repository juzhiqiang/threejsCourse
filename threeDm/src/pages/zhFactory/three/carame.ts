import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  100000
);

camera.position.set(1000, 1000, 1000);

// 创建相机模块
class CameraModule {
  activeCamera: THREE.PerspectiveCamera;
  collection: { default: THREE.PerspectiveCamera; [name: string]: any };
  constructor() {
    // 当前活动的相机
    this.activeCamera = camera;
    // 相机集合
    this.collection = {
      default: camera,
    };
  }

  // 添加相机
  add(name: string, camera: THREE.PerspectiveCamera) {
    this.collection[name] = camera;
  }

  // 设置当前活动相机
  setActive(name: string) {
    this.activeCamera = this.collection[name];
  }

}

export default new CameraModule();
