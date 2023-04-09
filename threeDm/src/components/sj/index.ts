import * as THREE from "three";

export const meshSjxGroup = (scene: THREE.Scene): THREE.Group => {
  //   创建三角形
  let MeshSjxGroup = new THREE.Group();
  for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry();
    const positionArr = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
      positionArr[j] = Math.random() * 10 - 5;
    }
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArr, 3)
    );
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    MeshSjxGroup.add(new THREE.Mesh(geometry, material));
  }
  MeshSjxGroup.position.set(0, -30, 0);
  scene.add(MeshSjxGroup);

  return MeshSjxGroup;
};
