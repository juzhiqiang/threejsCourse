import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import * as dat from "dat.gui";
// 顶点着色器
// @ts-ignore
import vertexShader from "./shader/vertex.glsl";
// @ts-ignore
import fragmentShader from "./shader/fragment.glsl";

export default function PointShader() {
  const shaderRef = useRef<any>();
  const gui = new dat.GUI();
  // 设置星系的参数
  const params: any = {
    count: 1000,
    size: 0.1,
    radius: 5,
    branches: 4,
    spin: 0.5,
    color: "#ff6030",
    outColor: "#1b3984",
  };
  // GalaxyColor
  let galaxyColor = new THREE.Color(params.color);
  let outGalaxyColor = new THREE.Color(params.outColor);
  let material: THREE.ShaderMaterial;
  const renderFn = (clock: THREE.Clock, controls: any) => {
    controls.update();
    const elapsedTime = clock.getElapsedTime();
    if (material) {
      material.uniforms.uTime.value = elapsedTime;
    }
  };
  useEffect(() => {
    const { scene, camera, renderer, controls } = threeInit(
      shaderRef.current,
      renderFn
    );

    let geometry: THREE.BufferGeometry | null | undefined = null;
    let points: THREE.Object3D<THREE.Event> | null = null;

    // 纹理导入
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(require("./images/10.png"));
    const texture1 = textureLoader.load(require("./images/9.png"));
    const texture2 = textureLoader.load(require("./images/11.png"));

    const generateGalaxy = () => {
      // 如果已经存在这些顶点，那么先释放内存，在删除顶点数据
      if (points !== null) {
        geometry?.dispose();
        material.dispose();
        scene?.remove(points);
      }
      // 生成顶点几何
      geometry = new THREE.BufferGeometry();
      //   随机生成位置
      const positions = new Float32Array(params.count * 3);
      const colors = new Float32Array(params.count * 3);
      const scales = new Float32Array(params.count);

      //图案属性
      const imgIndex = new Float32Array(params.count);

      //   循环生成点
      for (let i = 0; i < params.count; i++) {
        const current = i * 3;

        // 计算分支的角度 = (计算当前的点在第几个分支)*(2*Math.PI/多少个分支)
        const branchAngel =
          (i % params.branches) * ((2 * Math.PI) / params.branches);

        const radius = Math.random() * params.radius;
        // 距离圆心越远，旋转的度数就越大
        // const spinAngle = radius * params.spin;

        // 随机设置x/y/z偏移值
        const randomX =
          Math.pow(Math.random() * 2 - 1, 3) *
          0.5 *
          (params.radius - radius) *
          0.3;
        const randomY =
          Math.pow(Math.random() * 2 - 1, 3) *
          0.5 *
          (params.radius - radius) *
          0.3;
        const randomZ =
          Math.pow(Math.random() * 2 - 1, 3) *
          0.5 *
          (params.radius - radius) *
          0.3;

        // 设置当前点x值坐标
        positions[current] = Math.cos(branchAngel) * radius + randomX;
        // 设置当前点y值坐标
        positions[current + 1] = randomY;
        // 设置当前点z值坐标
        positions[current + 2] = Math.sin(branchAngel) * radius + randomZ;

        const mixColor = galaxyColor.clone();
        mixColor.lerp(outGalaxyColor, radius / params.radius);

        //   设置颜色
        colors[current] = mixColor.r;
        colors[current + 1] = mixColor.g;
        colors[current + 2] = mixColor.b;

        // 顶点的大小
        scales[current] = Math.random();

        // 根据索引值设置不同的图案；
        imgIndex[current] = i % 3;
      }
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
      geometry.setAttribute("imgIndex", new THREE.BufferAttribute(imgIndex, 1));

      //   设置点材质
      //   material = new THREE.PointsMaterial({
      //     color: new THREE.Color(0xffffff),
      //     size: params.size,
      //     sizeAttenuation: true,
      //     depthWrite: false,
      //     blending: THREE.AdditiveBlending,
      //     map: particlesTexture,
      //     alphaMap: particlesTexture,
      //     transparent: true,
      //     vertexColors: true,
      //   });

      //   设置点的着色器材质
      material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uTime: {
            value: 0,
          },
          uTexture: {
            value: texture,
          },
          uTexture1: {
            value: texture1,
          },
          uTexture2: {
            value: texture2,
          },
        },
      });

      //   生成点
      points = new THREE.Points(geometry, material);
      scene?.add(points);
      console.log(points);
    };

    generateGalaxy();
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
}
