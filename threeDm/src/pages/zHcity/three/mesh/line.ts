import * as THREE from "three";
// 线框
export default class MeshLine {
  mesh: THREE.LineSegments<THREE.EdgesGeometry<any>, THREE.LineBasicMaterial>;
    geomentry: THREE.EdgesGeometry<any>;
  constructor(geomentry: any) {
    const edegs = new THREE.EdgesGeometry(geomentry);
    const line = new THREE.LineSegments(
      edegs,
      new THREE.LineBasicMaterial({ color: 0xffff00 })
    );
    this.geomentry = edegs;
    this.mesh = line;
  }
}
