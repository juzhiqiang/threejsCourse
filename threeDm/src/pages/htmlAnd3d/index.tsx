import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import "./scence.less";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
    chinaLabel: any;
    curve: any;
  }>({
    labelRenderer: null,
    moon: null,
    chinaLabel: null,
    curve: null,
  });

  const renderFn = (
    clock: THREE.Clock,
    controls: any,
    scene: any,
    camera: any
  ) => {
    controls.update();
    const elapsed = clock.getElapsedTime();

    datas.current.labelRenderer?.render(scene, camera);

    if (datas.current.chinaLabel) {
      const chinaPostion: any = datas.current.chinaLabel.position.clone();
      // 计算标签跟摄像机距离
      const labelDistance = chinaPostion.distanceTo(camera?.position);
      chinaPostion.project(camera);
      // 射线的碰撞检测
      raycaster.setFromCamera(chinaPostion, camera);
      const intersects = raycaster.intersectObjects(scene?.children, true);
      // 检测是否碰撞到物体
      if (intersects.length === 0) {
        datas.current.chinaLabel.element.classList.add("visible");
      } else {
        const minDistance = intersects[0].distance;
        if (minDistance < labelDistance) {
          datas.current.chinaLabel.element.classList.remove("visible");
        } else {
          datas.current.chinaLabel.element.classList.add("visible");
        }
      }
    }

    if (datas.current.curve) {
      const time = (elapsed / 10) % 1;
      const point = datas.current.curve.getPoint(time);
      // 月亮运动 围绕地球
      // datas.current.moon?.position.set(
      //   Math.sin(elapsed) * 5,
      //   0,
      //   Math.cos(elapsed) * 5
      // );
      // 围绕特定轨迹
      datas.current.moon?.position.copy(point);
    }
  };

  // 实例化射线
  const raycaster = new THREE.Raycaster();

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
    // echart.rotation.y = Math.PI;
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

    // 月球提示标签
    const moontDiv = document.createElement("div");
    moontDiv.className = "label";
    moontDiv.innerHTML = "月球";
    const moontLabel = new CSS2DObject(moontDiv);
    moontLabel.position.set(0, 0.3, 0);
    datas.current.moon.add(moontLabel);

    // 中国提示标签
    const chinaDiv = document.createElement("div");
    chinaDiv.className = "label1";
    chinaDiv.innerHTML = "中国";
    datas.current.chinaLabel = new CSS2DObject(chinaDiv);
    datas.current.chinaLabel.position.set(-0.3, 0.8, -1);
    echart.add(datas.current.chinaLabel);

    // 实例化csdatas.current.s2D渲染器
    datas.current.labelRenderer = new CSS2DRenderer();
    datas.current.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(datas.current.labelRenderer.domElement);
    datas.current.labelRenderer.domElement.style.position = "fixed";
    datas.current.labelRenderer.domElement.style.top = "0px";
    datas.current.labelRenderer.domElement.style.left = "0px";
    datas.current.labelRenderer.domElement.style.zIndex = "10";

    // 重新设置轨道控制器
    new OrbitControls(camera, datas.current.labelRenderer.domElement);

    // 声明轨迹曲线
    datas.current.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-10, 0, 10),
        new THREE.Vector3(-5, 5, 5),
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(5, -5, 5),
        new THREE.Vector3(-10, 0, 10),
      ],
      true
    );
    // 多少个线段形成曲线
    const points = datas.current.curve.getPoints(500);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const curveObject = new THREE.Line(geometry, material);
    scene?.add(curveObject);
  }, [shaderRef.current]);

  return <div className={styles.main} ref={shaderRef}></div>;
}
