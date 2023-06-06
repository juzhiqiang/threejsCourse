import { camera } from "./carame";
import { controls } from "./control";
import { renderer } from "./renderer";
import { scene } from "./scene";

export const render = () => {
  controls.update();
  renderer?.render(scene, camera);
  requestAnimationFrame(render);
};
