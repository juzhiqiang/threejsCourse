/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-06-07 01:25:12
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-06-07 01:30:11
 * @FilePath: \threejsCourse\threeDm\src\pages\zHcity\three\createMesh.ts
 * @Description:
 */
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { scene } from "../scene";
import CameraModule from "../carame";
import * as THREE from "three";
import gsap from "gsap";
import ControlsModuls from "../control";
/**
 * @description: 创建城市
 * @return {*}
 */
export const CreateCity = () => {
  let mixer: THREE.AnimationMixer;
  let mixer1: THREE.AnimationMixer;
  let hotQiuGltfAnimate: any;
  let action: THREE.AnimationAction;
  // 汽车线路相关
  let curve: THREE.CatmullRomCurve3;
  let redCar: any;
  // 段落计数，gsap用不了直接数字变化通过对象参数方式达到效果
  let carLineCurveProgress: any = {};
  // 模型
  let women: any;

  const loader = new GLTFLoader();
  // 模型压缩过需要解压
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
  // 加载带热气球城市
  loader.load(
    "/mode/city4.glb",
    (gltf: {
      animations: any;
      scene: any;
      cameras: THREE.PerspectiveCamera[];
    }) => {
      scene.add(gltf.scene);
      gltf.scene.traverse((child: any) => {
        if (child.name === "热气球") {
          hotQiuGltfAnimate = gltf.animations;
          // 实例化动画混合器
          mixer = new THREE.AnimationMixer(child);
        }
        if (child.name === "汽车园区轨迹") {
          const line = child;
          line.visible = false;
          // 根据点位创建线路
          const points = [];
          for (
            let i = line.geometry.attributes.position.count - 1;
            i >= 0;
            i--
          ) {
            points.push(
              new THREE.Vector3(
                line.geometry.attributes.position.getX(i),
                line.geometry.attributes.position.getY(i),
                line.geometry.attributes.position.getZ(i)
              )
            );
          }
          // 生成曲线
          curve = new THREE.CatmullRomCurve3(points);
          carLineCurveProgress.curveProgress = 0;
          carAnimation();
        }

        if (child.name === "redcar") {
          redCar = child;
        }
      });

      // 添加相机
      gltf.cameras.forEach((camera) => {
        CameraModule.add(camera.name, camera);
      });
    }
  );

  // 骨骼模型
  loader.load(
    "/mode/women.glb",
    (gltf: {
      animations: any;
      scene: any;
      cameras: THREE.PerspectiveCamera[];
    }) => {
      scene.add(gltf.scene);
      women = gltf.scene;
      gltf.scene.traverse(function (child: {
        name: string;
        material: THREE.MeshStandardMaterial;
        isMesh: any;
      }) {
        if (child.name == "Floor") {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
          });
        }
        if (child.isMesh) {
          child.material.depthWrite = true;
          child.material.normalScale = new THREE.Vector2(1, 1);
          child.material.side = THREE.FrontSide;
          child.material.transparent = false;
          child.material.vertexColors = false;
        }
      });
      mixer1 = new THREE.AnimationMixer(gltf.scene);
      const action = mixer1.clipAction(gltf.animations[0]);
      action.play();
    }
  );

  const update = (time: number) => {
    if (mixer) {
      mixer.update(time);
    }
    mixer1?.update(time);
  };

  // 更新热气球动画类型
  const selectAnimata = (type: "line" | "none" | "all") => {
    if (type === "none") return action?.stop?.();
    action?.reset?.();
    // 获取动作片段
    const clip = hotQiuGltfAnimate[type === "line" ? 0 : 1];
    // 放入动画混合器播放
    action = mixer.clipAction(clip);
    action.play();
  };

  // 更新汽车动画
  const carAnimation = () => {
    gsap.to(carLineCurveProgress, {
      curveProgress: 0.999,
      duration: 10,
      repeat: -1,
      ease: "Linear.easeNone",
      onUpdate: () => {
        // 曲线更新时候获取点位上的值
        const point = curve.getPoint(carLineCurveProgress.curveProgress);
        redCar.position.set(point.x, point.y, point.z);
        if (carLineCurveProgress.curveProgress + 0.001 < 1) {
          const point = curve.getPoint(
            carLineCurveProgress.curveProgress + 0.001
          );
          // 控制车方向
          redCar.lookAt(point);
        }
      },
    });
  };

  // 聚焦单体建筑
  const focusDance = () => {
    const position = women.position.clone();
    gsap.to(ControlsModuls.controls.target, {
      x: position.x,
      y: position.y,
      z: position.z,
      direction: 1,
      onComplete: () => {
        gsap.to(ControlsModuls.controls.target, {
          x: position.x - 2,
          y: position.y - 2,
          z: position.z - 1,
          direction: 2,
        });
      },
    });
  };

  return {
    update,
    selectAnimata,
    focusDance,
  };
};
