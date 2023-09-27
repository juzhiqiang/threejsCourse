// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CameraModule from "./carame";
import { renderer } from "./renderer";
// @ts-ignore
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
// @ts-ignore
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

class ControlsModuls {
  controls: any;
  constructor() {
    this.setOrbitControls();
  }

  // 设置轨道控制器
  setOrbitControls() {
    this.controls = new OrbitControls(
      CameraModule.activeCamera,
      renderer.domElement
    );
    this.controls.enableDamping = true;

    // 设置垂直最大0到90都 看地面上
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = 0;
  }

  // 设置飞行控制器
  setFlyControls() {
    this.controls = new FlyControls(
      CameraModule.activeCamera,
      renderer.domElement
    );
    this.controls.movementSpeed = 100;
    this.controls.rollSpeed = Math.PI / 30;
  }

  // 第一人称
  setFirstPersonControls() {
    this.controls = new FirstPersonControls(
      CameraModule.activeCamera,
      renderer.domElement
    );
    this.controls.movementSpeed = 100;
    this.controls.rollSpeed = Math.PI / 30;
  }
}

export default new ControlsModuls();
