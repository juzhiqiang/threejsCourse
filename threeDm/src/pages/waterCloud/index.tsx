import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import * as dat from "dat.gui";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 顶点着色器
// @ts-ignore
import vertexShader from "./shader/vertex.glsl";
// @ts-ignore
import fragmentShader from "./shader/fragment.glsl";
// 导入rgb
// @ts-ignore
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";

export default function WaterCloud() {
  const shaderRef = useRef<any>();
  const gui = new dat.GUI();
  const params = {
    // 频率
    wWaresFrequency: 20.0,
    // 波浪高度
    uScale: 0.1,
    uXzScale: 1.0,
    // 噪声频率
    uNoiseFrequency: 10,
    // 噪声缩放比例
    uNoiseScale: 0.1,
    uTime: 0,
    // 低位颜色
    uLowColor: "#ff0000",
    // 高位颜色
    uHighColor: "#ff6611",
    // 水流x轴速度
    uXspeed: 1,
    uZspeed: 1,
    // 噪音速度
    uNoiseSpeed: 1,
    // 烟雾透明度
    uOpacity: 1,
  };

  // 创建着色器材质
  const shaderMater = new THREE.ShaderMaterial({
    // 顶点着色器
    vertexShader: vertexShader,
    // 片元着色器
    fragmentShader: fragmentShader,
    // wireframe: true,
    side: THREE.DoubleSide,
    // 传入变量启动画
    uniforms: {
      wWaresFrequency: {
        value: params.wWaresFrequency,
      },
      uScale: {
        value: params.uScale,
      },
      uXzScale: {
        value: params.uXzScale,
      },
      uNoiseFrequency: {
        value: params.uNoiseFrequency,
      },
      uNoiseScale: {
        value: params.uNoiseScale,
      },
      uTime: {
        value: params.uTime,
      },
      uHighColor: {
        value: new THREE.Color(params.uHighColor),
      },
      uLowColor: {
        value: new THREE.Color(params.uLowColor),
      },
      uXspeed: {
        value: params.uXspeed,
      },
      uZspeed: {
        value: params.uZspeed,
      },
      uNoiseSpeed: {
        value: params.uNoiseSpeed,
      },
      uOpacity: {
        value: params.uOpacity,
      },
    },
    transparent: true,
  });

  const renderFn = (clock: THREE.Clock, controls: any) => {
    let elapsedtime = clock.getElapsedTime();
    shaderMater.uniforms.uTime.value = elapsedtime;
    controls.update();
  };
  useEffect(() => {
    const { scene, camera, renderer, controls } = threeInit(
      shaderRef.current,
      renderFn
    );

    // gui ------------------------------------------------------------------------------------------- start
    // gui -------------------------------------------------------------------------------------------
    // gui -------------------------------------------------------------------------------------------
    gui
      .add(params, "wWaresFrequency")
      .min(1)
      .max(100)
      .step(0.1)
      .onChange((value: number) => {
        shaderMater.uniforms.wWaresFrequency.value = value;
      });
    gui
      .add(params, "uScale")
      .min(0.01)
      .max(1)
      .step(0.001)
      .onChange((value: number) => {
        shaderMater.uniforms.uScale.value = value;
      });
    gui
      .add(params, "uXzScale")
      .min(0)
      .max(5)
      .step(0.1)
      .onChange((value: number) => {
        shaderMater.uniforms.uXzScale.value = value;
      });
    gui
      .add(params, "uNoiseFrequency")
      .min(1)
      .max(100)
      .step(1)
      .onChange((value: number) => {
        shaderMater.uniforms.uNoiseFrequency.value = value;
      });
    gui
      .add(params, "uNoiseScale")
      .min(0.1)
      .max(1)
      .step(0.001)
      .onChange((value: number) => {
        shaderMater.uniforms.uNoiseScale.value = value;
      });
    gui.addColor(params, "uLowColor").onFinishChange((value) => {
      shaderMater.uniforms.uLowColor.value = new THREE.Color(value);
    });
    gui.addColor(params, "uHighColor").onFinishChange((value) => {
      shaderMater.uniforms.uHighColor.value = new THREE.Color(value);
    });
    gui
      .add(params, "uZspeed")
      .min(0)
      .max(5)
      .step(0.1)
      .onChange((value: number) => {
        shaderMater.uniforms.uZspeed.value = value;
      });
    gui
      .add(params, "uXspeed")
      .min(0)
      .max(5)
      .step(0.1)
      .onChange((value: number) => {
        shaderMater.uniforms.uXspeed.value = value;
      });
    gui
      .add(params, "uNoiseSpeed")
      .min(0)
      .max(5)
      .step(0.1)
      .onChange((value: number) => {
        shaderMater.uniforms.uNoiseSpeed.value = value;
      });
    gui
      .add(params, "uOpacity")
      .min(0)
      .max(1)
      .step(0.1)
      .onChange((value: number) => {
        shaderMater.uniforms.uOpacity.value = value;
      });
    // gui -------------------------------------------------------------------------------------------
    // gui -------------------------------------------------------------------------------------------
    // gui ------------------------------------------------------------------------------------------- end

    // 创建面
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 512, 512),
      shaderMater
    );
    plane.rotation.x = -Math.PI / 2;
    scene?.add(plane);
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
}
