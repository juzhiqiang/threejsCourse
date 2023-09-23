import * as THREE from "three";
import { scene } from "./scene";
import { CreateCity } from "./mesh/city";
/**
 * @description: 创建物体
 * @return {*}
 */
let city: any;
export const createMesh = () => {
  city = CreateCity();
};

export const updateMesh = (time: number) => {
  city.update(time);
};

export const hotQiuselectAnimata = (type: string) => {
  city.selectAnimata(type);
};
