import CameraModule from "./carame";
import { renderer } from "./renderer";

export const resetWindow = () => {
  window.addEventListener("resize", () => {
    CameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
    CameraModule.activeCamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  });
};
