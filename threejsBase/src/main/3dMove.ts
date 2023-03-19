// 控制3d物体移动
// 修改物体位置
export function editPosition(mesh) {
  // mesh.position.set(5, 0, 0);
  if (mesh.position.x < 5) {
    mesh.position.x += 0.01;
  } else {
    mesh.position.x = 0;
  }
}
