import CameraModule from "./carame";
import ControlsModuls from "./control";
import { renderer } from "./renderer";
import { scene } from "./scene";
import { updateMesh } from "./createMesh";
import * as THREE from "THREE";

const clock = new THREE.Clock();
export const render = (t: number) => {
  const time = clock.getDelta();
  ControlsModuls.controls.update(time);
  updateMesh(time);
  renderer?.render(scene, CameraModule.activeCamera);
  requestAnimationFrame(render);
};
