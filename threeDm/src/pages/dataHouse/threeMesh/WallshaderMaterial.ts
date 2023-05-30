/*
 * @Author: juzhiqinag 1020814597@qq.com
 * @Date: 2023-05-30 22:06:38
 * @LastEditors: juzhiqinag 1020814597@qq.com
 * @LastEditTime: 2023-05-31 00:43:48
 * @FilePath: \threejsCourse\threeDm\src\pages\dataHouse\threeMesh\WallshaderMaterial.ts
 * @Description: 墙映射材质
 */
import * as THREE from "three";
export const WallShaderMaterial = (panarama: {
  material?: THREE.ShaderMaterial;
  roomId?: any;
  point?: any;
  panoramaUrl?: any;
}) => {
  let point = panarama.point[0];
  let panaramaTexture = new THREE.TextureLoader().load(
    "/dataHouse/" + point.panoramaUrl
  );
  panaramaTexture.flipY = false;
  panaramaTexture.wrapS = THREE.RepeatWrapping;
  panaramaTexture.wrapT = THREE.RepeatWrapping;
  //   数据中为真实空间下xyz，z代表高度，与three不同需要转换下位置
  let center = new THREE.Vector3(point.x / 100, point.y / 100, point.z / 100);

  return new THREE.ShaderMaterial({
    uniforms: {
      uPanorama: { value: panaramaTexture },
      uCenter: { value: center },
    },
    vertexShader: `
        varying vec2 vUv;
        uniform vec3 uCenter;
        varying vec3 vPosition;
        void main(){
            vUv = uv;
            vec4 modelpos = modelMatrix * vec4(position, 1.0);
            vPosition = modelpos.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uPanorama;
        uniform vec3 uCenter;
        varying vec3 vPosition;
        void main() {
            vec3 nPos = normalize(vPosition - uCenter);
            float theta = acos(nPos.y) / 3.14;
            float phi = (atan(nPos.z, nPos.x)+ 3.14) / 6.28;
            phi += 0.75;
            vec4 pColor = texture2D(uPanorama,vec2(phi, theta));
            gl_FragColor = pColor;
        }
    `,
  });
};
