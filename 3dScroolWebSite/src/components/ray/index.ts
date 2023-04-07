// 投射光线
import * as THREE from "three";
export const Ray = (
  scene: THREE.Scene,
  camera: THREE.Camera
): {
  cubeGroup: THREE.Group;
} => {
  // 创建球几何体
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
  });
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  //   立方体
  const cubeArr: any = [];
  const cubeGroup = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let z = 0; z < 5; z++) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(i * 2 - 5, j * 2 - 5, z * 2 - 5);
        cubeGroup.add(cube);
        cubeArr.push(cube);
      }
    }
  }
  scene.add(cubeGroup);
  //   创建投射光线对象
  const raycaster = new THREE.Raycaster();
  //   设置鼠标位置对象
  const mouse = new THREE.Vector2();
  //   监听鼠标位置
  window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
    raycaster.setFromCamera(mouse, camera);
    const result = raycaster.intersectObjects(cubeArr);
    if (result.length > 0) {
      result[0].object.material = redMaterial;
      console.log(result);
    }
  });

  return {
    cubeGroup,
  };
};
