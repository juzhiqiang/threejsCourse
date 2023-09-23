import * as THREE from "three";
// @ts-ignore
import vertex from "../../shader/lightShadar/vertex.glsl";
// @ts-ignore
import fragment from "../../shader/lightShadar/fragment.glsl";
import { gsap } from "gsap";

export default class LightRadar {
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  eventIndex: any;
  constructor(
    randius: number = 2,
    position: { x: number; z: number } = { x: 0, z: 0 },
    color: any = "#ff0000"
  ) {
    this.geometry = new THREE.PlaneGeometry(randius, randius);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new THREE.Color(color),
        },
        uTime: {
          value: 0.0,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, 1, position.z);
    this.mesh.rotation.x = -Math.PI / 2;

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }
}
