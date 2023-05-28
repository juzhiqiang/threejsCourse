/**
 * @description: 鼠标监听事件
 * @return {*}
 */
export class MouseLinster {
  isMousedown: boolean;
  constructor(dom: HTMLDivElement, camera: THREE.Camera) {
    this.isMousedown = false;
    dom.addEventListener(
      "mousedown",
      (e) => {
        this.isMousedown = true;
      },
      false
    );
    dom.addEventListener(
      "mouseup",
      (e) => {
        this.isMousedown = false;
      },
      false
    );
    dom.addEventListener(
      "mouseout",
      (e) => {
        this.isMousedown = false;
      },
      false
    );
    dom.addEventListener(
      "mousemove",
      (e) => {
        if (!this.isMousedown) return;
        camera.rotation.x += e.movementY * 0.001;
        camera.rotation.y += e.movementX * 0.001;
        camera.rotation.order = "YXZ";
      },
      false
    );
  }
}
