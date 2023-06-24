import { gsap } from "gsap";
import * as THREE from "three";
// @ts-ignore
import vertex from "../../shader/flyLine/vertex.glsl";
// @ts-ignore
import fragment from "../../shader/flyLine/fragment.glsl";
// 利用着色器做飞线
export class FlyLineShader {
  lineCurve: THREE.CatmullRomCurve3;
  geometry: THREE.BufferGeometry;
  shaderMaterial: THREE.ShaderMaterial;
  mesh: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  constructor() {
    // 根据点生成曲线
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-5, 4, 0),
      new THREE.Vector3(-8, 0, 0),
    ];
    // 创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    const points = this.lineCurve.getPoints(1000);
    // 根据曲线创建管道几何体
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    // 给每一个点设置属性
    const aSizeArr = new Float32Array(points.length);
    for (let i = 0; i < aSizeArr.length; i++) {
      aSizeArr[i] = i;
    }
    // 设置几何体属性
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(aSizeArr, 1));
    // 设置着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new THREE.Color(0xfffff00),
        },
        uLength:{
          value:points.length
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      // 深度检测关闭
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial);

    // 动画
    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      direction: 1,
      repeat: -1,
      ease: "none",
    });
  }
}
