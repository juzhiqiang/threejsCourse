// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera } from "./carame";
import { renderer } from "./renderer";
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
