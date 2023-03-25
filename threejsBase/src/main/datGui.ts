// 调试库
import * as dat from "dat.gui";

export const DEBUG = (parame) => {
  const gui = new dat.GUI();

  parame.forEach((item) => {
    if (item._type === "number") {
      gui
        .add(item.type, item.name)
        .min(item.min)
        .max(item.max)
        .step(item.step)
        .onChange((value) => item.change?.(value));
    } else if (item._type === "color") {
      gui
        .addColor(item.color, item.name)
        .onChange((value) => item.change?.(value));
    } else {
      gui.add(item.type, item.name);
    }
  });
};
