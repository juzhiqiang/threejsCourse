import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import { useEffect, useRef } from "react";
import * as THREE from "three";
// 顶点着色器
import basicVertexShader from "./shader/vertex.glsl";
import deepVertexShader from "./shader/vertexs.glsl";
// 片元着色器
import basicFragmentShader from "./shader/fragment.glsl";
import deepFragmentShader from "./shader/fragments.glsl";


// 着色器
const Shader = () => {
  const shaderRef = useRef<any>();
  const config: any = {};
  const renderFn = (clock: THREE.Clock) => {
    let deltaTime = clock.getElapsedTime();
    if(config.shaderMater){
      config.shaderMater.uniforms.uTime.value = deltaTime;
    }
  };
  useEffect(() => {
    const { scene, camera } = threeInit(shaderRef.current, renderFn);
    const material = new THREE.MeshBasicMaterial({
      color: "#00ff00",
    });

    // 加载纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/ca.jpeg");
    // 创建着色器材质
    const shaderMater = new THREE.ShaderMaterial({
      // 顶点着色器
      vertexShader: deepVertexShader,
      // 片元着色器
      fragmentShader: deepFragmentShader,
      // wireframe: true,
      side: THREE.DoubleSide,
      // 传入变量启动画
      uniforms: {
        // 时间
        uTime: {
          value: 0,
        },
        // 材质
        uTexture: {
          value: texture,
        },
      },
    });
    // 创建一个面
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 60, 60),
      shaderMater
    );
    config.shaderMater = shaderMater;
    scene?.add(floor);
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
};

export default Shader;
