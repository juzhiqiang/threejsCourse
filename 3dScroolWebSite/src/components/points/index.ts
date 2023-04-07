import * as THREE from "three";
export const Points = (scene: THREE.Scene) => {
  const pointGroup = new THREE.Group();
  // 灯光
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  const smallBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 20, 20),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })
  );
  smallBall.position.set(2, 2, 2);
  //   直线光源
  const pointLight = new THREE.PointLight(0xff0000, 1);
  pointLight.castShadow = true;

  //   阴影
  const SphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial({});
  const sphere = new THREE.Mesh(SphereGeometry, material);
  sphere.castShadow = true;
  pointGroup.add(sphere);

  //   接收阴影的平面
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const palne = new THREE.Mesh(planeGeometry, material);
  palne.position.set(0, -1, 0);
  palne.rotation.x = -Math.PI / 2;
  palne.receiveShadow = true;
  pointGroup.add(palne);
  //   阴影模糊度
  pointLight.shadow.radius = 10;
  //   阴影分辨率
  pointLight.shadow.mapSize.set(300, 300);
  //   设置透视相机属性
  smallBall.add(pointLight);
  pointGroup.add(smallBall);
  pointGroup.position.set(0, -63, 0);
  scene.add(pointGroup);
  return {
    pointGroup,
    smallBall,
    sphere,
    palne,
  };
};
