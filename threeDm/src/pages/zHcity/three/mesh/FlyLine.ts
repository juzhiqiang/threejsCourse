import { gsap } from "gsap";
import * as THREE from "three";
// 利用管道做飞线
export class FlyLine {
  lineCurve: THREE.CatmullRomCurve3;
  geometry: THREE.TubeGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial>;
  texture: THREE.Texture;
  constructor() {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 4, 0),
      new THREE.Vector3(8, 0, 0),
    ];
    // 创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    // 根据曲线创建管道几何体
    this.geometry = new THREE.TubeGeometry(this.lineCurve, 100, 0.1, 2, false);
    // 设置飞线材质
    // 创建纹理
    const textureLoader = new THREE.TextureLoader();
    this.texture = textureLoader.load("/textures/zhCity/z_11.png");
    this.texture.repeat.set(1, 2);
    // 镜像重复
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.MirroredRepeatWrapping;
    this.material = new THREE.MeshBasicMaterial({
      //   color: 0xfff000,
      map: this.texture,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // 创建飞线动画
    gsap.to(this.texture.offset, {
      x: -1,
      direction: 8,
      repeat: -1,
      ease: "none",
    });
  }
}
