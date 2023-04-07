import styles from "./index.less";
import { useEffect, useState } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import * as GeometryUtils from "three/examples/jsm/utils/GeometryUtils.js";
import { MeshLineGeometry, MeshLineMaterial, raycast } from "meshline";
const Earth = () => {
  const [isInitScene, setIsInitScene] = useState<boolean>(false);

  useEffect(() => {
    if (!isInitScene) {
      setIsInitScene(true);
      initScene();
    }
  }, []);

  const initScene = () => {
    let renderer: any, scene: any, camera: any, controls: any;
    let line: any;
    let line1: any;
    let line2: any;
    let matLine: any, matLineBasic: any;
    let stats: any;

    init();
    animate();

    function init() {
      const canvas = document.querySelector(
        "canvas.webgl"
      ) as HTMLCanvasElement;
      renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("canvas.webgl")!,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0.0);
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      console.log("[renderer]", renderer);
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set(-200, 0, 0);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 10;
      controls.maxDistance = 500;

      const positions = [];
      const colors = [];

      const points = GeometryUtils.hilbert3D(
        new THREE.Vector3(0, 0, 0),
        20.0,
        1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      );

      const spline = new THREE.CatmullRomCurve3(points);
      const divisions = Math.round(12 * points.length);
      const point = new THREE.Vector3();
      const color = new THREE.Color();

      for (let i = 0, l = divisions; i < l; i++) {
        const t = i / l;

        spline.getPoint(t, point);
        positions.push(point.x, point.y, point.z);

        color.setHSL(t, 1.0, 0.5);
        colors.push(color.r, color.g, color.b);
      }

      const geometry1 = new MeshLineGeometry();
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("/test.png");

      geometry1.setPoints(positions, (p) => 1 - p);
      const material = new MeshLineMaterial({
        useMap: 1,
        map: texture,
        lineWidth: 10,
        resolution: new THREE.Vector2(1, 1),
      });
      const mesh = new THREE.Mesh(geometry1, material);
      mesh.raycast = raycast;
      scene.add(mesh);

      const geometry = new LineGeometry();
      geometry.setPositions(positions);
      geometry.setColors(colors);

      matLine = new LineMaterial({
        color: 0xffffff,
        linewidth: 6,
        vertexColors: true,
        dashed: false,
        gapSize: 10,
        alphaToCoverage: false,
      });

      line = new Line2(geometry, matLine);
      line.computeLineDistances();
      line.scale.set(1, 1, 1);
      line.position.setZ(-50);
      // scene.add(line);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      matLineBasic = new THREE.LineBasicMaterial({ vertexColors: true });

      line1 = new THREE.Line(geo, matLineBasic);
      line1.computeLineDistances();
      line1.position.setZ(0);
      scene.add(line1);

      const geo2 = new THREE.BufferGeometry();
      geo2.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geo2.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      matLineBasic = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 10,
      });

      line2 = new THREE.Line(geo2, matLineBasic);
      line2.computeLineDistances();
      line2.position.setZ(50);
      // scene.add(line2);

      stats = new Stats();
      document.body.appendChild(stats.dom);
    }

    function animate() {
      requestAnimationFrame(animate);
      stats.update();
      // Renderer最终会设置这个
      matLine.resolution.set(window.innerWidth, window.innerHeight); // 视图的分辨率
      renderer.render(scene, camera);
    }
  };

  return (
    <div className={styles.container}>
      <canvas
        className="webgl"
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};

export default Earth;
