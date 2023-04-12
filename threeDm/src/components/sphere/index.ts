import * as THREE from "three";
import * as CANNON from "cannon-es";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export const Sphere = (scene: THREE.Scene) => {
  // //新建纹理
  // var texture = new THREE.TextureLoader().load("/三角单面.png");
  // texture.encoding = THREE.sRGBEncoding;
  // texture.flipY = false;
  // texture.needsUpdate = true;
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set(1, 1);
  // //新建材质
  // var tmaterial = new THREE.MeshStandardMaterial({
  //   map: texture,
  // });
  // tmaterial.alphaMap = texture;
  // tmaterial.transparent = true;
  // tmaterial.depthWrite = false;
  // const gltfLoader = new GLTFLoader();
  // const gltf = gltfLoader.load("/biaozhi_sanlingxing.gltf", (gltf) => {
  //   console.log(gltf.scenes);
  //   gltf.scene.position.set(0, 0, 0);
  //   gltf.scene.scale.set(50, 50, 50);
  //   scene.add(gltf.scene);
  //   gltf.scenes.forEach((item) => {
  //     item.traverse(function (gltf) {
  //       if (gltf.type === "Mesh") {
  //         console.log(gltf);
  //         gltf.material = tmaterial;
  //       }
  //     });
  //   });
  // });

  const bodyArr: {
    mesh: THREE.Mesh;
    body: CANNON.Body;
  }[] = [];

  const createSphere = () => {
    // 创建小球
    const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
    const sphereMater = new THREE.MeshStandardMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, sphereMater);
    sphere.castShadow = true;
    scene.add(sphere);

    // 创建物理世界小球以及物体
    const sphereShape = new CANNON.Sphere(1);
    const sphereWorldMaterial = new CANNON.Material("sphere");
    const sphereBody = new CANNON.Body({
      shape: sphereShape,
      position: new CANNON.Vec3(0, 0, 0),
      // 小球质量
      mass: 1,
      // 物体的材质，可影响阻力，弹力系数等
      material: sphereWorldMaterial,
    });
    // 物体添加到物理世界中
    World.addBody(sphereBody);

    sphereBody.addEventListener("collide", HitEvent);

    bodyArr.push({
      mesh: sphere,
      body: sphereBody,
    });
  };

  // 创建击打声音
  const hitSound = new Audio("/metalHit.mp3");

  // 监听碰撞事件
  const HitEvent = (e: {
    contact: { getImpactVelocityAlongNormal: () => any };
  }) => {
    // 获取碰撞强度
    const impactStrength = e.contact.getImpactVelocityAlongNormal();
    if (impactStrength > 4) {
      console.log(impactStrength);
      hitSound.currentTime = 0;
      hitSound.volume = impactStrength / 12 > 1 ? 1 : impactStrength / 12;
      hitSound.play();
    }
  };
  // 创建立方体
  const createCube = (
    World: CANNON.World,
    cubeWorldMaterial: CANNON.Material
  ) => {
    // 创建立方体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial();
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    scene.add(cube);

    // 创建物理世界立方体
    const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    const cubeBody = new CANNON.Body({
      shape: cubeShape,
      position: new CANNON.Vec3(0, 0, 0),
      // 小球质量
      mass: 1,
      // 物体的材质，可影响阻力，弹力系数等
      material: cubeWorldMaterial,
    });
    // 物体添加到物理世界中
    cubeBody.applyLocalForce(
      new CANNON.Vec3(300, 0, 0), //添加的力的大小和方向
      new CANNON.Vec3(0, 0, 0) //施加的力所在的位置
    );

    World.addBody(cubeBody);

    cubeBody.addEventListener("collide", HitEvent);

    bodyArr.push({
      mesh: cube,
      body: cubeBody,
    });
  };

  // 平面
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial()
  );
  floor.position.set(0, -5, 0);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // 创建物理事件
  const World = new CANNON.World();

  // 设置向下的作用力
  World.gravity.set(0, -9.8, 0);

  // 在物理世界中创建地面
  const floorShape = new CANNON.Plane();
  const floorBodyMaterial = new CANNON.Material("floor");
  const floorBody = new CANNON.Body({
    // 设置为0时保证地面不动
    mass: 0,
    shape: floorShape,
    // 需要与threejs中地面位置同步
    position: new CANNON.Vec3(0, -5, 0),
    material: floorBodyMaterial,
  });
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  World.addBody(floorBody);

  // // 设置两种材质碰撞参数
  // const contactMaterial = new CANNON.ContactMaterial(
  //   sphereWorldMaterial,
  //   floorBodyMaterial,
  //   {
  //     // 摩擦系数
  //     friction: 0.1,
  //     // 弹性
  //     restitution: 0.7,
  //   }
  // );
  // // 将材质关联设置添加到物理世界
  // World.addContactMaterial(contactMaterial);
  const cubeWorldMaterial = new CANNON.Material("cube");
  // 设置世界碰撞的默认材料，没有设置都走默认
  World.defaultContactMaterial = new CANNON.ContactMaterial(
    cubeWorldMaterial,
    floorBodyMaterial,
    {
      // 摩擦系数
      friction: 0.1,
      // 弹性
      restitution: 0.7,
    }
  );

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  // 平行光
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.castShadow = true;
  scene.add(dirLight);

  window.addEventListener("click", () => {
    [createCube, createSphere][Math.round(Math.random())](
      World,
      cubeWorldMaterial
    );
  });

  return {
    World,
    bodyArr,
  };
};
