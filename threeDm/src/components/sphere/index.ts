import * as THREE from "three";
import * as CANNON from "cannon-es";
export const Sphere = (scene: THREE.Scene) => {
  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const sphereMater = new THREE.MeshStandardMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, sphereMater);
  sphere.castShadow = true;
  scene.add(sphere);

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

  // 设置两种材质碰撞参数
  const contactMaterial = new CANNON.ContactMaterial(
    sphereWorldMaterial,
    floorBodyMaterial,
    {
      // 摩擦系数
      friction: 0.1,
      // 弹性
      restitution: 0.7,
    }
  );
  // 将材质关联设置添加到物理世界
  World.addContactMaterial(contactMaterial);

  // 创建击打声音
  const hitSound = new Audio("/metalHit.mp3");

  // 监听碰撞事件
  const HitEvent = (e: {
    contact: { getImpactVelocityAlongNormal: () => any };
  }) => {
    // 获取碰撞强度
    const impactStrength = e.contact.getImpactVelocityAlongNormal();
    hitSound.currentTime = 0;
    hitSound.play();
  };
  sphereBody.addEventListener("collide", HitEvent);

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  // 平行光
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.castShadow = true;
  scene.add(dirLight);

  return {
    World,
    sphere,
    sphereBody,
  };
};
