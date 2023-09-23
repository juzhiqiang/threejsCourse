import { threeInit } from "@/until/threeInit";
import styles from "./index.less";
import { useEffect, useRef } from "react";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
// @ts-ignore
import TWEEN from "tween";
import { history } from "umi";

export default function HomePage() {
  // const { scene, camera } = threeInit();
  // const refs = useRef();
  // useEffect(() => {
  //   var camera;
  //   var renderer: any;
  //   var mesh: any;
  //   var clock = new THREE.Clock();
  //   var mixer = new THREE.AnimationMixer(mesh);
  //   var clipAction;
  //   var animationClip;
  //   var pobj: any;

  //   function init() {
  //     // 创建一个场景，它将包含我们所有的元素，如物体，相机和灯光。
  //     var scene = new THREE.Scene();

  //     var urls = [
  //       "/textures/zhCity/1.jpg",
  //       "/textures/zhCity/2.jpg",
  //       "/textures/zhCity/3.jpg",
  //       "/textures/zhCity/4.jpg",
  //       "/textures/zhCity/5.jpg",
  //       "/textures/zhCity/6.jpg",
  //     ];

  //     var cubeLoader = new THREE.CubeTextureLoader();
  //     scene.background = cubeLoader.load(urls);

  //     // 创建一个渲染器并设置大小，WebGLRenderer将会使用电脑显卡来渲染场景
  //     // initialize basic renderer
  //     renderer = new THREE.WebGLRenderer();
  //     renderer.setSize(window.innerWidth, window.innerHeight);

  //     // 创建一个摄像机，它定义了我们正在看的地方
  //     camera = new THREE.PerspectiveCamera(
  //       50,
  //       window.innerWidth / window.innerHeight,
  //       0.1,
  //       1000
  //     );
  //     // 将摄像机对准场景的中心
  //     camera.position.x = 20;
  //     camera.position.y = 15;
  //     camera.position.z = 35;
  //     camera.lookAt(scene.position);
  //     var orbit = new OrbitControls(camera, renderer.domElement);

  //     // 将平面添加到场景中
  //     var plane = createPlaneGeometryBasicMaterial();
  //     scene.add(plane);

  //     // 在屏幕上显示坐标轴
  //     var axes = new THREE.AxesHelper(100);
  //     scene.add(axes);

  //     // var trackballControls = initTrackballControls(camera, renderer);

  //     // 添加环境光
  //     scene.add(new THREE.AmbientLight(0x666666));
  //     scene.add(new THREE.AmbientLight("#ffffff", 1));
  //     // 将呈现器的输出添加到HTML元素
  //     refs.current.appendChild(renderer.domElement);

  //     var points = initLine();
  //     initModel();
  //     initPeople();

  //     // 启动动画
  //     renderScene();

  //     var i = 0;
  //     function tweenComplete() {
  //       if (i < points.length) {
  //         switch (i) {
  //           case 0:
  //             pobj.rotateY(Math.PI);
  //             break;
  //           case 1:
  //           case 5:
  //           case 8:
  //           case 9:
  //             pobj.rotateY(-0.5 * Math.PI);
  //             break;
  //           case 2:
  //           case 3:
  //           case 4:
  //           case 6:
  //           case 7:
  //             pobj.rotateY(0.5 * Math.PI);
  //             break;
  //           case 10:
  //             mixer.stopAllAction();
  //             break;
  //         }
  //         let tween = new TWEEN.Tween(points[i])
  //           .to(points[i + 1], i == 2 ? 500 : 3000)
  //           .easing(TWEEN.Easing.Linear.None)
  //           .onUpdate(function () {
  //             pobj.position.set(this[0], this[1], this[2]);
  //           })
  //           .onComplete(tweenComplete)
  //           .start();
  //         i++;
  //       }
  //     }

  //     // 添加模型
  //     function initModel() {
  //       const loader = new GLTFLoader();
  //       // loader.load("/mode/city.glb", function (object) {
  //       //   mesh = object.scene;

  //       //   mesh.traverse(
  //       //     (item: {
  //       //       type: string;
  //       //       material: THREE.MeshBasicMaterial;
  //       //       name: string;
  //       //       geometry: THREE.EdgesGeometry;
  //       //       scale: THREE.Vector3;
  //       //     }) => {
  //       //       if (item.type === "Mesh") {
  //       //         // 城市轮廓
  //       //         const cityMaterial = new THREE.MeshBasicMaterial({
  //       //           color: new THREE.Color(0x0c0e6f),
  //       //         });
  //       //         item.material = cityMaterial;
  //       //       }
  //       //     }
  //       //   );
  //       //   mesh.scale.set(3, 3, 3);
  //       //   mesh.position.y = -5;
  //       //   scene.add(mesh);
  //       // });
  //     }

  //     // 添加人物模型
  //     function initPeople() {
  //       const loader = new GLTFLoader();
  //       loader.load("/mode/Cesium_Man.glb", function (result: any) {
  //         result.scene.scale.set(1, 1, 1);
  //         result.scene.translateY(0);
  //         pobj = result.scene;
  //         scene.add(result.scene);

  //         tweenComplete();

  //         mixer = new THREE.AnimationMixer(result.scene);
  //         animationClip = result.animations[0];
  //         clipAction = mixer.clipAction(animationClip).play();
  //         animationClip = clipAction.getClip();
  //       });
  //     }

  //     // 创建一个平面
  //     function createPlaneGeometryBasicMaterial() {
  //       var textureLoader = new THREE.TextureLoader();
  //       var cubeMaterial: any = new THREE.MeshStandardMaterial({
  //         map: textureLoader.load("/textures/water/Water_1_M_Normal.jpg"),
  //       });
  //       cubeMaterial.map.wrapS = THREE.RepeatWrapping;
  //       cubeMaterial.map.wrapT = THREE.RepeatWrapping;
  //       cubeMaterial.map.repeat.set(18, 18);
  //       // 创建地平面并设置大小
  //       var planeGeometry = new THREE.PlaneGeometry(500, 500);
  //       var plane = new THREE.Mesh(planeGeometry, cubeMaterial);

  //       // 设置平面位置并旋转
  //       plane.rotation.x = -0.5 * Math.PI;
  //       plane.position.x = 0;
  //       plane.position.y = -5;
  //       plane.position.z = 0;
  //       return plane;
  //     }

  //     // 初始化线路
  //     function initLine() {
  //       var pArr = [
  //         {
  //           x: 0,
  //           y: 0,
  //           z: 0,
  //         },
  //         {
  //           x: 5 * 3,
  //           y: -3.8,
  //           z: -0.7 * 3,
  //         },
  //         {
  //           x: -0.6 * 3,
  //           y: -3.8,
  //           z: -0.7 * 3,
  //         },
  //         {
  //           x: -0.6 * 3,
  //           y: -3.8,
  //           z: -1.8 * 3,
  //         },
  //         {
  //           x: -4 * 3,
  //           y: -3.8,
  //           z: -1.8 * 3,
  //         },
  //         {
  //           x: -4 * 3,
  //           y: -3.8,
  //           z: 2.8 * 3,
  //         },
  //         {
  //           x: -1.2 * 3,
  //           y: -3.8,
  //           z: 2.8 * 3,
  //         },
  //         {
  //           x: -1.2 * 3,
  //           y: -3.8,
  //           z: 4.3 * 3,
  //         },
  //         {
  //           x: 1.7 * 3,
  //           y: -3.8,
  //           z: 4.3 * 3,
  //         },
  //         {
  //           x: 1.7 * 3,
  //           y: -3.8,
  //           z: -0.4 * 3,
  //         },
  //         {
  //           x: 4.4 * 3,
  //           y: -3.8,
  //           z: -0.4 * 3,
  //         },
  //         {
  //           x: 4.4 * 3,
  //           y: -3.8,
  //           z: 5 * 3,
  //         },
  //       ];
  //       var points = [];
  //       var geometry = new THREE.BufferGeometry();
  //       const vertices: any = new Float32Array(pArr.length);
  //       for (var i = 0; i < pArr.length; i++) {
  //         const current = i * 3;
  //         vertices[current] = pArr[i].x;
  //         vertices[current + 1] = pArr[i].y;
  //         vertices[current + 2] = pArr[i].z;
  //         points.push([pArr[i].x, pArr[i].y, pArr[i].z]);
  //       }
  //       geometry.setAttribute(
  //         "position",
  //         new THREE.BufferAttribute(vertices, 3)
  //       );
  //       var material = new THREE.LineBasicMaterial({
  //         color: 0xff0000,
  //       });
  //       var line = new THREE.Line(geometry, material);
  //       scene.add(line);
  //       return points;
  //     }

  //     // 动画渲染
  //     function renderScene() {
  //       TWEEN.update();
  //       orbit.update();
  //       var delta = clock.getDelta();
  //       mixer.update(delta);
  //       // 使用requestAnimationFrame函数进行渲染
  //       requestAnimationFrame(renderScene);
  //       renderer.render(scene, camera);
  //     }

  //     // 渲染的场景
  //     renderer.render(scene, camera);

  //     document.addEventListener("mousedown", onDocumentMouseDown, false);

  //     function onDocumentMouseDown(event) {
  //       // // 点击屏幕创建一个向量
  //       // var vector = new THREE.Vector3(
  //       //   (event.clientX / window.innerWidth) * 2 - 1,
  //       //   -(event.clientY / window.innerHeight) * 2 + 1,
  //       //   0.5
  //       // );
  //       // vector = vector.unproject(camera); // 将屏幕的坐标转换成三维场景中的坐标
  //       // var raycaster = new THREE.Raycaster(
  //       //   camera.position,
  //       //   vector.sub(camera.position).normalize()
  //       // );
  //       // var intersects = raycaster.intersectObjects(mesh.children, true);
  //       // console.log(intersects);
  //       // if (intersects.length > 0) {
  //       //   // intersects[0].object.material.color.set("#ffffff");
  //       // }
  //     }
  //   }
  //   window.onload = init;

  //   function onResize() {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   }
  //   // 监听调整大小事件
  //   window.addEventListener("resize", onResize, false);
  // }, []);

  return (
    <>
      <button onClick={() => history.push("/zhFactory")}>123</button>
      {/* <div ref={refs} className={styles.content}></div>; */}
    </>
  );
}
