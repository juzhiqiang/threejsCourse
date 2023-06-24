import * as THREE from "three";
// @ts-ignore
import vertexShader from "../../shader/lightWall/vertex.glsl";
// @ts-ignore
import fragmentShader from "../../shader/lightWall/fragment.glsl";
import { gsap } from "gsap";
export default class LineWall {
  geometry: THREE.CylinderGeometry;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh<THREE.CylinderGeometry, THREE.ShaderMaterial>;
  constructor() {
    this.geometry = new THREE.CylinderGeometry(5, 5, 5, 32, 1, true);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 1, 0);

    // 获取物体高度差
    this.mesh.geometry.computeBoundingBox();
    let { min, max }: any = this.mesh.geometry.boundingBox;
    let uHeight = max.y - min.y;
    this.material.uniforms.uHeight = {
      value: uHeight,
    };

    // 光墙动画
    gsap.to(this.mesh.scale, {
      x: 2,
      z: 2,
      duration: 2,
      repeat: -1,
    });
  }
}
