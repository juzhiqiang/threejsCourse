import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import * as THREE from "three";
import { useEffect, useRef } from "react";
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
import Firework from "./firework";

export default function HomePage() {
  const shaderRef = useRef<any>();
  // 管理烟花
  let fireworks: Firework[] = [];
  const renderFn = (clock: THREE.Clock, controls: any) => {
    controls.update();
    // 更新烟花状态
    fireworks.forEach((item) => {
      item.update();
    });
  };
  useEffect(() => {
    const { scene, camera, renderer, controls } = threeInit(
      shaderRef.current,
      renderFn
    );
    const material = new THREE.MeshBasicMaterial({
      color: "#00ff00",
    });

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

    // 创建着色器材质
    const shaderMater = new THREE.ShaderMaterial({
      // 顶点着色器
      vertexShader: vertexShader,
      // 片元着色器
      fragmentShader: fragmentShader,
      // wireframe: true,
      side: THREE.DoubleSide,
      // 传入变量启动画
      uniforms: {},
      // transparent: true,
    });

    // 载入孔明灯
    const gltfLoader = new GLTFLoader();
    // 灯光
    let LightBox = null;
    gltfLoader.load(
      "/mode/flyLight.glb",
      (gltf: { scene: THREE.Object3D<THREE.Event> }) => {
        if (scene) {
          scene.add(gltf.scene);
          LightBox = gltf.scene.children[0];
          // @ts-ignore;
          LightBox.material = shaderMater;

          // 对孔明灯克隆
          for (let i = 0; i < 150; i++) {
            let flyLight = gltf.scene.clone();
            let x = (Math.random() - 0.5) * 300;
            let y = Math.random() * 60 + 25;
            let z = (Math.random() - 0.5) * 300;
            flyLight.position.set(x, y, z);
            gsap.to(flyLight.rotation, {
              y: 2 * Math.PI,
              duration: 5 + Math.random() * 20,
              repeat: -1,
            });
            gsap.to(flyLight.position, {
              x: "+=" + Math.random() * 30,
              y: "+=" + Math.random() * 10,
              duration: 5 + Math.random() * 10,
              yoyo: true,
            });
            scene.add(flyLight);
          }
        }
      }
    );

    // 控制器设置
    if (controls) {
      // controls.autoRotate = true;
      // controls.autoRotateSpeed = 1.0;
      // controls.maxPolarAngle = (Math.PI / 4) * 3;
      // controls.minPolarAngle = (Math.PI / 4) * 3;
    }

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
