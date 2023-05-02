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

// 导入threejs water原生水
// @ts-ignore
import { Water } from "three/examples/jsm/objects/Water2";

export default function ThreeWater() {
  const shaderRef = useRef<any>();
  const gui = new dat.GUI();

  const renderFn = (clock: THREE.Clock, controls: any) => {
    controls.update();
  };
  useEffect(() => {
    const { scene, camera, renderer, controls } = threeInit(
      shaderRef.current,
      renderFn
    );

    // 加载场景背景
    const rgbeLoader = new RGBELoader();
    rgbeLoader.loadAsync("/hdr/050.hdr").then((texture: THREE.Texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      if (scene) {
        // scene.background = texture;
        scene.environment = texture;
      }
    });

    // 加载浴缸
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/mode/yugang.glb",
      (gltf: { scene: THREE.Object3D<THREE.Event> }) => {
        console.log(gltf.scene.position.set(0, -200, 0));
        const yugang = gltf.scene.children[0];
        // @ts-ignore
        yugang.material.side = THREE.DoubleSide;
        const waterGeometry = gltf.scene.children[1].geometry;
        const water = new Water(waterGeometry, {
          color: "#ffffff",
          scale: 1,
          flowDirection: new THREE.Vector2(1, 1),
          textureHeight: 1024,
          textureWidth: 1024,
        });
        scene?.add(water);
        scene?.add(yugang);
      }
    );

    const light = new THREE.AmbientLight(0xffffff);
    light.intensity = 10;
    scene?.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene?.add(directionalLight);
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
}
