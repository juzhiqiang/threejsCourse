import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import { useEffect, useRef } from "react";
import * as THREE from "three";
// 顶点着色器
import basicVertexShader from "./shader/vertex.glsl";
// 片元着色器
import basicFragmentShader from "./shader/fragment.glsl";

// 着色器
const Shader = () => {
  const shaderRef = useRef<any>();
  const config: any = {};
  const renderFn = (clock: THREE.Clock) => {
    let deltaTime = clock.getDelta();
  };
  useEffect(() => {
    const { scene, camera } = threeInit(shaderRef.current, renderFn);
    console.log(basicFragmentShader);
    const material = new THREE.MeshBasicMaterial({
      color: "#00ff00",
    });

    // 创建着色器材质
    const shaderMater = new THREE.ShaderMaterial({
      // 顶点着色器
      vertexShader: basicVertexShader,
      // 片元着色器
      fragmentShader: basicFragmentShader,
    });
    // 创建一个面
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 60, 69),
      shaderMater
    );

    scene?.add(floor);
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
};

export default Shader;
