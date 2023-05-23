import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { useEffect, useRef } from "react";
import { texture } from "three/examples/jsm/nodes/Nodes.js";

export default function HomePage() {
  const shaderRef = useRef<any>();
  const datas = useRef<{
    moon: THREE.Object3D<THREE.Event> | null;
    labelRenderer: any;
  }>({
    labelRenderer: null,
    moon: null,
  });
  // 管理烟花
  const renderFn = (clock: THREE.Clock, controls: any, scene: any, camera: any) => {
    controls.update();
    const elapsed = clock.getElapsedTime();
    // 月亮运动
    datas.current.moon?.position.set(
      Math.sin(elapsed) * 5,
      0,
      Math.cos(elapsed) * 5
    );
    datas.current.labelRenderer?.render(scene, camera);
  };
  useEffect(() => {
    const { scene, camera, renderer, controls } = threeInit(
      shaderRef.current,
      renderFn
    );

    camera?.position.set(0, 5, -10);

    const textureLoader = new THREE.TextureLoader();

    // 灯光
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 0, 1);
    scene?.add(dirLight);
    const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene?.add(light);

    // 加载地球
    const echartGeometry = new THREE.SphereGeometry(1, 16, 16);
    const echartMaterial = new THREE.MeshPhongMaterial({
      specular: 0x333333,
      shininess: 5,
      // 材质图片
      map: textureLoader.load("/textures/htmlAnd3d/earth_atmos_2048.jpg"),
      //
      specularMap: textureLoader.load(
        "/textures/htmlAnd3d/earth_specular_2048.jpg"
      ),
      normalMap: textureLoader.load(
        "/textures/htmlAnd3d/earth_normal_2048.jpg"
      ),
      normalScale: new THREE.Vector2(0.85, 0.85),
    });
    const echart = new THREE.Mesh(echartGeometry, echartMaterial);
    echart.rotation.y = Math.PI;
    scene?.add(echart);

    // 加载月亮
    const moonGeometry = new THREE.SphereGeometry(0.27, 16, 16);
    const moonMaterial = new THREE.MeshPhongMaterial({
      shininess: 5,
      map: textureLoader.load("/textures/htmlAnd3d/moon_1024.jpg"),
    });
    datas.current.moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene?.add(datas.current.moon);

    // 提示标签
    const echartDiv = document.createElement("div");
    echartDiv.className = "label";
    echartDiv.innerHTML = "地球";
    const echartLabel = new CSS2DObject(echartDiv);
    echartLabel.position.set(0, 1, 0);
    echart.add(echartLabel);

    // 实例化css2D渲染器
    datas.current.labelRenderer = new CSS2DRenderer();
    datas.current.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(datas.current.labelRenderer.domElement);
    datas.current.labelRenderer.domElement.style.position = "fixed";
    datas.current.labelRenderer.domElement.style.top = "0px";
    datas.current.labelRenderer.domElement.style.left = "0px";
    datas.current.labelRenderer.domElement.style.zIndex = "10";
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
}
