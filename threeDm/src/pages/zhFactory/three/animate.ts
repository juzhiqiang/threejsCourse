import CameraModule from "./carame";
import { controls } from "./control";
import { renderer } from "./renderer";
import { scene } from "./scene";
import { updateMesh } from "./createMesh";
import * as THREE from "THREE";

const clock = new THREE.Clock();
export const render = (t: number) => {
  controls.update();
  const time = clock.getDelta();
  updateMesh(time);
  renderer?.render(scene, CameraModule.activeCamera);
  requestAnimationFrame(render);
};
