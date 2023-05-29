import * as THREE from "three";
export default class RoomShapeMesh extends THREE.Mesh {
  room: any;
  roomShapePoints: any;
  isTop: boolean;
  constructor(room: any, isTop = false) {
    super();
    this.room = room;
    this.isTop = isTop;
    this.roomShapePoints = room.areas;
    this.init();
  }

  private init() {
    // 生成房间的形状
    let roomShape = new THREE.Shape();
    // three默认单位为米
    for (let i = 0; i < this.roomShapePoints.length; i++) {
      let point = this.roomShapePoints[i];
      if (i === 0) {
        roomShape.moveTo(point.x / 100, point.y / 100);
      } else {
        roomShape.lineTo(point.x / 100, point.y / 100);
      }
    }
    // 生成房间几何体
    let roomShapeGeometry = new THREE.ShapeGeometry(roomShape);
    // 旋转几何体顶点
    roomShapeGeometry.rotateX(Math.PI / 2);
    this.geometry = roomShapeGeometry;
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      side: this.isTop ? THREE.FrontSide : THREE.DoubleSide,
    });
    this.isTop ? (this.position.y = 2.8) : (this.position.y = 0);
  }
}
