// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CameraModule from "./carame";
import { renderer } from "./renderer";
export const controls = new OrbitControls(
  CameraModule.activeCamera,
  renderer.domElement
);
controls.enableDamping = true;
