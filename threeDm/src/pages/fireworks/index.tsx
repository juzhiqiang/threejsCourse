import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import * as THREE from "three";
import { useEffect, useRef } from "react";
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
// 导入水模块
// @ts-ignore
import { Water } from "three/examples/jsm/objects/Water2";
import { gsap } from "gsap";
import Firework from "./firework";

export default function HomePage() {
  const shaderRef = useRef<any>();
  // 管理烟花
  let fireworks: Firework[] = [];
  const renderFn = (clock: THREE.Clock, controls: any) => {
    controls.update();
    // 更新烟花状态
    fireworks.forEach((item, i: number) => {
      const type = item.update();
      if (type === "remove") {
        fireworks.splice(i, 1);
      }
    });
  };
  useEffect(() => {
    const { scene, camera, renderer, controls } = threeInit(
      shaderRef.current,
      renderFn
    );

    // 创建环境纹理
    const rgbeLoader = new RGBELoader();
    rgbeLoader.loadAsync("/hdr/2k.hdr").then((texture: THREE.Texture) => {
      if (scene) {
        // 纹理映射按照圆柱映射
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      }
    });

    // 修改编码
    if (renderer) {
      // @ts-ignore;
      renderer.outputEncoding = THREE.sRGBEncoding;
      // @ts-ignore;
      // 电影级别效果
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      // 设置曝光程度
      // @ts-ignore;
      renderer.toneMappingExposure = 0.2;
    }

    // 载入孔明灯
    const gltfLoader = new GLTFLoader();
    // 灯光
    let LightBox = null;
    gltfLoader.load(
      "./mode/newyears_min.glb",
      (gltf: { scene: THREE.Object3D<THREE.Event> }) => {
        scene?.add(gltf.scene);
        // 创建水面
        const waterGeometry = new THREE.PlaneGeometry(100, 100);
        let water = new Water(waterGeometry, {
          scale: 4,
          textureWidth: 1024,
          textureHeight: 1024,
        });
        // 要比物体高一点不然会争渲染层级 出现闪烁效果
        water.position.y = 1;
        water.rotation.x = -Math.PI / 2;
        scene?.add(water);
      }
    );

    // 创建烟花
    let createFireWord = () => {
      let color: THREE.ColorRepresentation = `hsl(${Math.floor(
        Math.random() * 360
      )},100%,80%)`;
      let position = {
        x: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        y: 7 + Math.random() * 25,
      };
      // 随机生成颜色和烟花位置
      let firework = new Firework(color, position);
      firework.addScene(scene, camera);
      fireworks.push(firework);
    };
    window.addEventListener("click", createFireWord);
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
}
